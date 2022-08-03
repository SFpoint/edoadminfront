<template>
  <v-container :class="{'px-0': $vuetify.breakpoint.smAndDown}">
    <v-row class="my-4 mx-auto" style="max-width: 500px">

      <v-col cols="12">
        <h1 class="text-center accent--text mb-0">Вход</h1>
      </v-col>

      <v-col cols="12">
        <v-card outlined elevation="2" class="card pa-8" @keydown.enter="login">
          <v-row class="mx-0 mt-0">
            <v-col cols="12" class="pa-0 ma-0">
              <v-text-field
                v-model="form.login"
                class="pa-0 pt-2 ma-0"
                label="Телефон или электронная почта"
                placeholder=" "
                :error-messages="loginErrors"
                @input="$v.form.login.$touch()"
                @blur="$v.form.login.$touch()"
              />
            </v-col>

            <v-col cols="12" class="pa-0 ma-0">
              <v-text-field
                v-model="form.password.value"
                class="pt-3 ma-0"
                label="Пароль"
                placeholder=" "
                :type="form.password.type"
                :append-icon="form.password.icon"
                @click:append="form.password.changeVisible()"
                :error-messages="passwordErrors"
                @input="$v.form.password.value.$touch()"
                @blur="$v.form.password.value.$touch()"
              />
            </v-col>
          </v-row>

          <v-row class="mx-0 mb-0">
            <v-col :cols="isMobile ? 12 : 4" class="pa-0 mt-4">
              <v-btn
                depressed
                color="primary"
                class="mr-2"
                :loading="loading"
                :disabled="$v.form.$invalid"
                @click="login"
              >
                <v-icon left>mdi-login-variant</v-icon>
                Войти
              </v-btn>
            </v-col>

            <v-col :cols="isMobile ? 12 : 8" class="pa-0 mt-5 d-flex">
              <v-btn text small color="primary" class="pl-0" to="/forget">
                Забыли пароль?
              </v-btn>
              <v-spacer v-if="!isMobile" />
              <v-btn text small color="primary" class="pr-2" to="/registration">
                Регистрация
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import { formatLogin } from '@/scripts/formatLogin'
import { Login } from '@/models'

export default {
  name: 'Login',

  metaInfo: {
    title: 'Вход в ДПО'
  },

  mounted() {
    this.onResize()
    window.addEventListener("resize", this.onResize)
  },

  destroyed() {
    window.removeEventListener("resize", this.onResize)
  },

  data: () => ({
    form: new Login(),
    loading: false,
    isMobile: false
  }),

  validations: {
    form: {
      login: {
        required,
        maxLength: maxLength(50)
      },
      password: {
        value: {
          required,
          maxLength: maxLength(50)
        },
      }
    },
  },

  computed: {
    ...mapGetters('user', ['isOperatorRoles']),

    loginErrors() {
      const errors = []
      if (!this.$v.form.login.$dirty) return errors
      !this.$v.form.login.maxLength && errors.push('Не больше 50 символов')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.form.password.value.$dirty) return errors
      !this.$v.form.password.value.maxLength && errors.push('Не больше 50 символов')
      return errors
    }
  },

  methods: {
    onResize() {
      this.isMobile = window.innerWidth < 520
    },

    async login() {
      this.loading = true

      const body = {
        username: formatLogin(this.form.login),
        password: this.form.password.value
      }

      try {
        await this.$store.dispatch('user/login', body)
        this.isOperatorRoles
          ? await this.$router.push('/')
          : this.$toastr('error', '', 'Обратитесь к администратору для получения прав доступа')
      } catch (e) {
        e.status === 422 && this.$toastr('error', `<b>Код ошибки: ${e.status}</b>`, 'Неправильная пара логин-пароль')
      } finally {
        this.loading = false
      }
    }
  }
};
</script>

<style scoped>
.theme--light.v-btn.v-btn--disabled {
  color: white !important
}

.theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text) {
  color: white !important
}

.theme--light.v-tabs-items {
  background-color: transparent !important
}

.theme--light.v-btn.v-btn--disabled .v-icon {
  color: white !important
}

.card >>> .theme--light.v-label {
  color: rgba(55, 71, 79, .8) !important
}

.card >>> .v-label.v-label--active.primary--text.theme--light {
  color: #2196f3 !important
}
</style>