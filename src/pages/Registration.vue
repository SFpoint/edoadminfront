<template>
	<v-container :class="{'px-0': $vuetify.breakpoint.smAndDown}">
		<v-row class="my-4 mx-auto" style="max-width: 500px">

			<v-col cols="12">
				<h1 class="text-center accent--text mb-0">Регистрация</h1>
			</v-col>

			<v-col cols="12">
        <v-card outlined elevation="2" class="pt-4 pb-8" :class="isMobile ? 'px-6' : 'px-8'">
					<v-tabs
						v-model="regTab"
						background-color="transparent"
						color="primary"
            class="custom-tabs-arrows"
						grow
            show-arrows
          >
            <v-tab v-for="(option, i) in regOptions" :key="i" class="tab">
              {{ option.name }}
            </v-tab>
          </v-tabs>

					<v-tabs-items v-model="regTab" class="pt-6">
						<v-tab-item v-for="(option, i) in regOptions" :key="i">
							<div v-if="i === 0">
                <!-- первый этап регистрации, отправка почты -->
								<v-row class="mx-0" v-if="regType === 1">
                  <v-col cols="12" class="pa-0 pt-1 ma-0" v-if="!isStartFlag">
                    <v-text-field
                      class="pa-0 ma-0"
                      v-model="email"
                      label="Электронная почта"
                      :error-messages="emailErrors"
                      @input="$v.email.$touch()"
                      @blur="$v.email.$touch()"
                    />
                  </v-col>

                  <v-col
                    :cols="12"
                    class="ma-0 px-0 py-5 d-flex"
                    v-if="!isStartFlag"
                  >
                    <v-checkbox
                      class="mt-0 pt-0 pl-2 mr-2 primary--text"
                      v-model="registrationCheckbox"
                    />
                    <div
                      class="grey-text"
                      :class="{ 'small-text': isMobile }"
                      @click="registrationCheckbox = !registrationCheckbox"
                    >
                      {{ checkboxDescription }}
                    </div>
                  </v-col>

                  <v-col
                    cols="12"
                    class="pa-0 mt-4"
                    v-if="showEmailConfirmationAlert"
                  >
                    <v-alert type="info" outlined class="body-2">
                      На Ваш почтовый ящик отправлено письмо, содержащее ссылку
                      для подтверждения регистрации
                    </v-alert>
                  </v-col>

                  <v-col cols="6" class="pa-0 mt-4" v-if="!isStartFlag">
                    <v-btn
                      depressed
                      color="primary"
                      class="mr-2"
                      :disabled="$v.$invalid || !registrationCheckbox"
                      @click="startRegistration"
                    >
                      Отправить
                    </v-btn>
                  </v-col>
                  <v-col
                    :cols="!isStartFlag ? 6 : 12"
                    class="pa-0 mt-5 text-right"
                  >
                    <v-btn text small color="primary" class="px-2" to="/login">
                      Страница входа
                    </v-btn>
                  </v-col>
                </v-row>

                <!-- второй этап регистрации, ввод и подтверждение пароля -->
                <PasswordCreate
                  v-if="regType === 2"
                  :isMobile="isMobile"
                  :userNameType="userNameType"
                  :username="username"
                  :code="code"
                  type="registration"
                />
              </div>

              <div v-if="i === 1">
                <!-- первый этап регистрации, отправка телефона -->
                <v-row class="mx-0" v-if="regType === 1">
                  <v-col cols="12" class="pa-0 pt-1 ma-0">
                    <v-text-field
                      class="pa-0 ma-0"
                      v-model="phone"
                      :disabled="isStartFlag"
                      label="Телефон"
                      v-mask="'+7 (###) ### ## ##'"
                      @focus="showTooltip"
                      @input="$v.phone.$touch()"
                      @blur="$v.phone.$touch()"
                    />
                  </v-col>

                  <v-col
                    :cols="12"
                    class="ma-0 px-0 py-5 d-flex"
                    v-if="!isStartFlag"
                  >
                    <v-checkbox
                      class="mt-0 pt-0 pl-2 mr-2 primary--text"
                      v-model="registrationCheckbox"
                    />
                    <div
                      class="grey-text"
                      :class="{ 'small-text': isMobile }"
                      @click="registrationCheckbox = !registrationCheckbox"
                    >
                      {{ checkboxDescription }}
                    </div>
                  </v-col>

                  <v-col
                    :cols="isMobile ? 12 : 5"
                    class="pa-0 mt-0"
                    v-if="isStartFlag"
                  >
                    <v-text-field
                      v-mask="'####'"
                      label="Введите код из смс"
                      v-model="confirmationCode"
                      :rules="confirmationCodeRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2" v-if="!isMobile && isStartFlag"></v-col>
                  <v-col
                    :cols="isMobile ? 12 : 5"
                    class="pa-0 mt-4"
                    v-if="isStartFlag"
                    :class="{ 'text-center': isMobile }"
                  >
                    <v-btn
                      depressed
                      color="primary"
                      :disabled="disableConfirmationCodeButton"
                      @click="checkConfirmationCode"
                    >
                      Подтвердить
                    </v-btn>
                  </v-col>

                  <v-col cols="6" class="pa-0 mt-4" v-if="!isStartFlag">
                    <v-btn
                      depressed
                      color="primary"
                      class="mr-2"
                      :disabled="$v.$invalid || !registrationCheckbox"
                      @click="startRegistration"
                    >
                      Отправить
                    </v-btn>
                  </v-col>
                  <v-col :cols="12" text-center v-if="isStartFlag && uncorrectConfirmationCode">
                    <span
                      class="uncorrect-code-alert"
                    >
                      Вы ввели неправильный код подтверждения
                    </span>
                  </v-col>
                  <v-col
                    :cols="12"
                    class="pa-0 mt-5 text-center"
                    v-if="isStartFlag"
                  >
                    <v-btn
                      text
                      small
                      color="primary"
                      class="px-2 code-timer"
                      @click="requestCodeToPhone"
                      :disabled="!!confirmationCodeSecondsLeft"
                    >
                      {{ codeRequestText }}
                    </v-btn>
                  </v-col>
                  <v-col
                    v-if="isStartFlag"
                    :cols="6"
                    class="pa-0 mt-5 text-left"
                  >
                    <v-btn
                      text
                      small
                      color="primary"
                      class="px-2"
                      @click="inputOtherPhone"
                    >
                      Другой телефон
                    </v-btn>
                  </v-col>
                  <v-col :cols="6" class="pa-0 mt-5 text-right">
                    <v-btn text small color="primary" class="px-2" to="/login">
                      Страница входа
                    </v-btn>
                  </v-col>
                </v-row>

                <!-- второй этап регистрации, ввод и подтверждение пароля -->
                <PasswordCreate
                  v-if="regType === 2"
                  :isMobile="isMobile"
                  :userNameType="userNameType"
                  :username="username"
                  :code="code"
                  type="registration"
                />
              </div>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { authApi } from "@/api";
import { requiredIf, email,  helpers } from "vuelidate/lib/validators";
import PasswordCreate from "@/components/PasswordCreate.vue"

export default {
  name: "Registration",

  components: {
    PasswordCreate
  },

  metaInfo: {
    title: "Регистрация",
  },

  created() {
    if (this.$route.name === "registration") {
      this.regType = 1;
    } else if (this.$route.name === "registrationConfirm") {
      this.regType = 2;
      this.username = this.$route.params.username;
      this.code = this.$route.params.code;
    }
  },

  mounted() {
    this.onResize()
    window.addEventListener("resize", this.onResize)
  },

  destroyed() {
    window.removeEventListener("resize", this.onResize);
    clearInterval(this.confirmationCodeTimer);
  },

	data: () => ({
		regType: null,
		regTab: null,
		regOptions: [
			{ id: 1, name: 'Электронная почта'},
			{ id: 2, name: 'Телефон'}
		],
		checkboxDescription: `Нажимая кнопку «Отправить», я подтверждаю свою дееспособность, 
		даю согласие на обработку ФГБОУ ВО СЗГМУ им. И.И. Мечникова моих персональных данных, 
		а именно на их сбор, систематизацию, накопление, хранение, уточнение (обновление, изменение),
		использование, обезличивание, блокирование, передачу, уничтожение.`,
    email: "",
    registrationCheckbox: false,
    phone: "",
    phoneCheckbox: false,
    isStartFlag: false,
    cachedEmail: "",
    cachedPhone: "",
    uncorrectConfirmationCode: false,
    confirmationCodeTimer: null,
    confirmationCode: "",
    confirmationCodeRules: [
      (value) => (value && /\d{4}/.test(value)) || "Введите 4 цифры",
    ],
    confirmationCodeSecondsLeft: 180,
    confirmationType: "",
    username: "",
    code: "",
    isMobile: false,
  }),

  validations: {
    email: {
      required: requiredIf(function() {
        return this.regType === 1 && this.regTab === 0;
      }),
      email,
    },
    phone: {
      required: requiredIf(function() {
        return this.regType === 1 && this.regTab === 1;
      }),
      phone: helpers.regex("phone", /\+7 \(\d{3}\) \d{3} \d{2} \d{2}/),
    },
  },

  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("E-mail не валидный");
      return errors;
    },
    
    phoneErrors() {
      const errors = [];
      if (!this.$v.phone.$dirty) return errors;
      !this.$v.phone.phone && errors.push("Телефон должен содержать 7 цифр");
      return errors;
    },

    phoneToSend() {
      return this.phone ? this.phone.match(/\d/g).join("") : "";
    },

    disableConfirmationCodeButton() {
      return !/\d{4}/.test(this.confirmationCode);
    },

    codeRequestText() {
      if (!this.confirmationCodeSecondsLeft) {
        return `Запросить код повторно`;
      }
      return this.isMobile
        ? `Запросить повторно через ${this.confirmationCodeSecondsLeft} сек`
        : `Вы можете запросить код повторно через ${this.confirmationCodeSecondsLeft} сек`;
    },

    showEmailConfirmationAlert() {
      return this.confirmationType === "email";
    },

    userNameType() {
      if (!this.confirmationType || this.confirmationType === "email") {
        return "Электронная почта";
      } else {
        return "Телефон";
      }
    },
  },

  methods: {
    onResize() {
      this.isMobile = window.innerWidth < 520
    },

    async startRegistration() {
      let data;
      if (this.regTab === 0) {
        data = this.email;
      }
      if (this.regTab === 1) {
        data = this.phoneToSend;
      }
      try {
        await authApi.startRegistration(data);
        this.isStartFlag = true;
        if (this.regTab === 1) {
          this.startConfirmationCodeTimer();
          this.confirmationType = "phone";
        }
        if (this.regTab === 0) {
          this.confirmationType = "email";
        }
      } catch (e) {
        this.$toastr(
          "error",
          `<b>Код ошибки: ${e.status}</b>`,
          e.data?.message || "Возникла ошибка"
        );
      }
    },

    showTooltip() {
      if (!this.phone) {
        this.phone = "+7 ";
      }
    },

    startConfirmationCodeTimer() {
      this.confirmationCodeTimer = setInterval(() => {
        this.confirmationCodeSecondsLeft--;
        if (!this.confirmationCodeSecondsLeft) {
          clearInterval(this.confirmationCodeTimer);
        }
      }, 1000);
    },

    inputOtherPhone() {
      clearInterval(this.confirmationCodeTimer);
      this.confirmationCodeSecondsLeft = 180;
      this.confirmationType = "";
      this.regTab = 1;
      this.isStartFlag = false;
    },

    async checkConfirmationCode() {
      this.uncorrectConfirmationCode = false;
      const body = {
        username: this.phoneToSend,
        code: +this.confirmationCode,
      };
      try {
        await authApi.checkCode(body);
        this.regType = 2;
        this.username = this.phone;
        this.code = this.confirmationCode;
      } catch (e) {
        if (e.status === 406) {
          this.uncorrectConfirmationCode = true;
        } else {
          this.$toastr(
            "error",
            `<b>Код ошибки: ${e.status}</b>`,
            e.data?.message || "возникла ошибка"
          );
        }
      }
    },

    async requestCodeToPhone() {
      try {
        await authApi.startRegistration(this.phoneToSend);
        clearInterval(this.confirmationCodeTimer);
        this.confirmationCodeSecondsLeft = 180;
        this.startConfirmationCodeTimer();
      } catch (e) {
        this.$toastr(
          "error",
          `<b>Код ошибки: ${e.status}</b>`,
          e.data?.message || "Возникла ошибка"
        );
      }
    },
  },

  watch: {
    regTab(value) {
      if (value === 0) {
        this.cachedPhone = this.phone;
        this.phone = "";
        this.email = this.cachedEmail;
      }
      if (value === 1) {
        this.cachedEmail = this.email;
        this.email = "";
        this.phone = this.cachedPhone;
      }
    },
  },
};
</script>

<style lang="sass" scoped>
  .grey-text
    color: rgba(0, 0, 0, .6)
    line-height: 20px
    cursor: pointer

  .small-text
    font-size: 14px

  .theme--light.v-btn.v-btn--disabled
    color: white !important

.theme--light.v-btn.code-timer.v-btn--disabled
  color: rgba(0,0,0,.25) !important

.theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text)
  background-color: #cfd8dc !important

  .tab
    color: #90a4ae !important

@media (max-width: 540px)
  h1
    font-size: 28px
.uncorrect-code-alert
  color: red
</style>
