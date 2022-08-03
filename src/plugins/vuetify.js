import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/lib/util/colors'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.min.css'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },

  theme: {
    themes: {
      light: {
        background: colors.indigo.lighten5,
        primary: colors.blue,
        error: colors.red.accent2,
        success: '#61B329',
        warning: '#FF6F00',
        accent: colors.blueGrey.darken3,
        lightGrey: '#81939c',
        default: colors.blue,
        greylighten1: colors.grey.lighten1,
        menu: colors.blueGrey.darken2,
      }
    }
  }
})