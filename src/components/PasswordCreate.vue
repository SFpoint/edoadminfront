<template>
  <!--eslint-disable-->
  <v-row class="mx-0">
    <v-alert
      dense
      outlined
      type="error"
      width="100%"
      class="mr-2"
      v-if="confirmErrorMessage"
    >
      {{ confirmErrorMessage }}
    </v-alert>

    <v-col cols="12" class="pa-0 pt-3 ma-0">
      <v-text-field
        disabled
        class="pa-0 ma-0"
        v-model="confirmData.username"
        :label="userNameType"
      />
    </v-col>

    <v-col cols="12" class="pa-0 pt-3 ma-0">
      <v-text-field
        class="pa-0 ma-0"
        v-model="confirmData.password.value"
        type="password"
        label="Пароль"
        :type="confirmData.password.type"
        required
        :append-icon="confirmData.password.icon"
        @click:append="confirmData.password.changeVisible()"
        :error-messages="passwordErrors"
        @input="$v.confirmData.password.value.$touch()"
        @blur="$v.confirmData.password.value.$touch()"
      />
    </v-col>

    <v-col cols="12" class="pa-0 pt-3 ma-0">
      <v-text-field
        class="pa-0 ma-0"
        v-model="confirmData.passwordConfirm.value"
        type="password"
        label="Подтверждение пароля"
        :type="confirmData.passwordConfirm.type"
        :append-icon="confirmData.passwordConfirm.icon"
        @click:append="confirmData.passwordConfirm.changeVisible()"
        :error-messages="passwordConfirmErrors"
        @input="$v.confirmData.passwordConfirm.value.$touch()"
        @blur="$v.confirmData.passwordConfirm.value.$touch()"
      />
    </v-col>

    <v-col cols="6" class="pa-0 mt-4">
      <v-btn
        depressed
        color="primary"
        class="mr-2"
        :disabled="$v.$invalid"
        @click="confirm"
      >
        {{ confirmText }}
      </v-btn>
    </v-col>
    <v-col
      :cols="isMobile ? 12 : 6"
      class="pa-0 mt-5"
      :class="isMobile ? 'text-left' : 'text-right'"
    >
      <v-btn text small color="primary" class="px-2" to="/login">
        Страница входа
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { Registration } from "@/models";
import { authApi } from "@/api";
import { sameAs } from "vuelidate/lib/validators";
import { formatLogin } from "@/scripts/formatLogin";

export default {
  name: "PasswordCreate",
  props: {
    isMobile: {
      type: Boolean,
      required: true,
    },
    userNameType: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    type: {
      type: String, //может быть 'forget' или 'registration'
      required: true,
    },
  },

  data() {
    return {
      confirmErrorMessage: null,
      confirmData: new Registration(),
    };
  },

  created() {
    this.confirmData.username = this.username;
    this.confirmData.code = this.code;
  },

  computed: {
    passwordErrors() {
      const errors = [];
      if (!this.$v.confirmData.password.value.$dirty) return errors;
      !this.$v.confirmData.password.value.required &&
        errors.push("Пароль не может быть пустым");
      return errors;
    },
    passwordConfirmErrors() {
      const errors = [];
      if (!this.$v.confirmData.passwordConfirm.value.$dirty) return errors;
      !this.$v.confirmData.passwordConfirm.value.sameAsPassword &&
        errors.push("Пароли не совпадают");
      return errors;
    },
    confirmText() {
      if (this.type === 'registration') return "Зарегистрироваться"
      if (this.type === 'forget') return "Сохранить пароль"
    }
  },

  validations: {
    confirmData: {
      password: {
        value: {
          required: true,
        },
      },

      passwordConfirm: {
        value: {
          sameAsPassword: sameAs(function() {
            return this.confirmData.password.value;
          }),
        },
      },
    },
  },

  methods: {
    async confirm() {
      const body = {
        ...this.confirmData,
        username: formatLogin(this.confirmData.username),
        password: this.confirmData.password.value,
        passwordConfirm: this.confirmData.passwordConfirm.value,
      };
      const loginBody = {
        username: formatLogin(this.confirmData.username),
        password: this.confirmData.password.value,
      };

      try {
        this.confirmErrorMessage = null;
        if (this.type === "registration") await this.confirmRegistration(body);
        else if (this.type ==="forget") await this.confirmReset(body);

        const data = await this.$store.dispatch("login", loginBody);
        if (data.username) {
          await this.$router.push("/");
        }
      } catch (e) {
        if (e.status === 406 || e.status === 409) {
          this.confirmErrorMessage = e.data?.message;
        } else {
          this.$toastr(
          "error",
          `<b>Код ошибки: ${e.status}</b>`,
          e.data?.message || "Возникла ошибка. Проверьте, введен ли пароль"
        )
        }
      }
    },

    async confirmRegistration(body) {
      await authApi.confirmRegistration(body);
    },

    async confirmReset(body) {
      await authApi.confirmReset(body);
    },
  },
};
</script>
