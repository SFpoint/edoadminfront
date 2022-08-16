<template>
  <v-app :style="[cssVars, { background: $vuetify.theme.themes['light'].background }]">
    <LeftMenu
      v-if="!isSmAndDown && computedLinks.length"
      :links="computedLinks"
    />

    <Navbar
      :links="computedLinks"
      :isSmAndDown="isSmAndDown"
      :isXs="isXs"
      @openInstructionsDialog="instructionsDialog = true"
      @openHelpDialog="helpDialog = true"
    />

    <v-main class="background main" :class="{'mobile': isSmAndDown}">
      <HelpDialog
        :dialog="helpDialog"
        @closeHelpDialog="helpDialog = false"
      />
      <router-view :isSmAndDown="isSmAndDown" />
    </v-main>

    <v-footer padless class="background footer">
      <v-col class="caption accent--text px-4" cols="12">
        © {{ new Date().getFullYear() }}, Сервис учета информации о научных работах
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '@/components/ui/Navbar'
import LeftMenu from '@/components/ui/LeftMenu'
import HelpDialog from '@/components/dialogs/Help'

export default {
  name: 'App',

  components: {
    Navbar,
    LeftMenu,
    HelpDialog
  },

  data: () => ({
    isSmAndDown: false,
    isXs: false,
    helpDialog: false,

    links: [
      {
        id: 1,
        icon: 'mdi-book-edit-outline',
        text: "Документы",
        route: "/Documents",
        allowRoles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE']
      },
    ]
  }),

  created() {
    // this.checkUserMessageFlag()
  },

  mounted() {
    this.onResize()
    window.addEventListener("resize", this.onResize)
  },

  destroyed() {
    window.removeEventListener("resize", this.onResize)
  },

  computed: {
    ...mapGetters('system', ['techMessageHeight']),
    ...mapGetters('user', ['userId', 'allUserRoles']),

    computedLinks() {
      if (!this.userId) return []

      return this.links.filter(link => link.allowRoles.some(role => this.allUserRoles.includes(role)))
    },

    cssVars() {
      return {
        '--tech-message-height': this.techMessageHeight + 'px'
      }
    }
  },

  methods: {
    onResize() {
      this.isSmAndDown = window.innerWidth < 960
      this.isXs = window.innerWidth < 620
    }
  }
}
</script>

<style>
html {
  overflow-y: auto !important;
}

body {
  color: #37474f;
  background-color: rgb(232, 234, 246);
}

.custom-tabs-arrows .v-slide-group__prev {
  min-width: 28px !important;
  justify-content: left !important;
  flex: 0 1 32px !important;
}

.custom-tabs-arrows .v-slide-group__next {
  min-width: 28px !important;
  justify-content: left !important;
  flex: 0 1 32px !important;
}

.custom-tabs-arrows .v-slide-group__next i {
  margin-left: 6px;
}

.main {
  margin-top: calc(100px + var(--tech-message-height))
}

.footer {
  z-index: 1;
}

.toast.toast-warning {
  background-color: #FF6F00 !important;
}
.toast.toast-warning .toast-title {
  color: #FF6F00 !important;
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 7px;
  height: 7px;
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #B0B0B0;
  -webkit-box-shadow: 0 0 1px rgba(255,255,255,.5);
}

</style>