<template>
  <div>
    <div class="full-header borderBottom">
      <div v-if="technicalWorkMessage" class="tech-message text-center body-2 py-3 px-4" ref="techMessage">
        {{ technicalWorkMessage }}
      </div>

      <div class="header background">
        <!-- logo -->
        <router-link to="/" class="d-flex td-none">
          <v-img class="logo" :src="require('@/assets/logo.png')"/>

          <v-toolbar-title class="toolbar-text accent--text">
            Сервис учета информации<br>о научных работах
          </v-toolbar-title>
        </router-link>
        <v-spacer></v-spacer>

        <div class="d-flex align-center" v-if="!isSmAndDown">
          <div class="my-2">
            <v-btn
              class="lightGrey--text px-3"
              :class="{'mr-1': !username}"
              text
              @click.stop="$emit('openHelpDialog')"
            >
              Помощь
            </v-btn>
          </div>

          <div class="pr-1" v-if="username">
            <v-menu offset-y v-model="loginMenu">
              <template #activator="{ on }">
                <v-btn text v-on="on" color="grey" class="pr-3 pl-3 show-login-menu" :title="username">
                  <v-icon left class="lightGrey--text mr-0" size="24">mdi-account-outline</v-icon>
                  <v-icon right class="lightGrey--text ml-0">
                    {{ loginMenu ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                  </v-icon>
                </v-btn>
              </template>

              <v-list class="py-0">
                <v-list-item dense>
                  <v-list-item-title class="lightGrey--text body-2 v-list-username">
                    {{ username }}
                  </v-list-item-title>
                </v-list-item>

                <v-divider />

                <v-list-item dense @click="logout">
                  <v-list-item-title class="accent--text body-1 pointer">
                    Выйти
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </div>

        <div class="hamburger" :class="{'active': activeMenu}" @click="hamburgerClick" v-else>
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>
    </div>

    <div class="mobile-menu" ref="mobileMenu" :class="{'active': activeMenu}" v-if="isSmAndDown">

      <div class="mt-2">
        <MenuLinks :links="links" :isMobile="true" v-if="username" />

        <div class="my-2">
          <v-btn class="lightGrey--text px-3" text @click.stop="$emit('openHelpDialog')">
            Помощь
          </v-btn>
        </div>

        <v-menu offset-y v-if="username">
          <template #activator="{ on }">
            <v-btn text v-on="on" color="grey" class="px-3">
              <span class="lightGrey--text">{{ username }}</span>
              <v-icon color="lightGrey" right>mdi-chevron-down</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item dense @click="logout">
              <v-list-item-title class="accent--text body-1 pointer">
                Выйти
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import { cutLongText } from '@/scripts'
import MenuLinks from '@/components/ui/MenuLinks'

export default {
  props: {
    links: Array,
    isSmAndDown: Boolean,
    isXs: Boolean
  },

  components: {
    MenuLinks
  },

  mounted() {
    this.onResize()
    this.setTechnicalWorkMessage()
    setInterval(() => this.setTechnicalWorkMessage(), 300000)

    window.addEventListener("resize", this.onResize)
  },

  destroyed() {
    window.removeEventListener("resize", this.onResize)
  },

  data: () => ({
    technicalWorkMessage: null,
    maxLoginLength: null,
    activeMenu: false,
    loginMenu: false
  }),

  computed: {
    ...mapGetters('user', ['username']),
  },

  filters: {
    cutLongText
  },

  methods: {
    async logout() {
      try {
        await this.$store.dispatch('user/logout')
        await this.$router.push('/login')
        this.activeMenu = false
      } catch (e) {
        console.log(e.status)
      }
    },

    onResize() {
      this.calcLoginLength()
      this.calcActiveMenuTop()
    },

    setTechnicalWorkMessage() {
      axios.get(`/message.json?${Math.random()}`).then(response => {
        if (this.technicalWorkMessage !== response.data.message) {
          this.technicalWorkMessage = response.data.message
          setTimeout(() => {
            this.setTechMessageHeight()
            this.calcActiveMenuTop()
          }, 200)
        }
      })
    },

    calcLoginLength() {
      this.maxLoginLength =  Math.ceil((window.innerWidth - 800) / 10)
    },

    calcActiveMenuTop() {
      const techMessage = this.$refs.techMessage
      const mobileMenu = this.$refs.mobileMenu

      if (techMessage) {
        mobileMenu && (mobileMenu.style.top = techMessage.offsetHeight + 'px')
      } else {
        mobileMenu && (mobileMenu.style.top = 0)
      }
    },

    setTechMessageHeight() {
      const techMessage = this.$refs.techMessage
      this.$store.dispatch('system/setTechMessageHeight', techMessage?.offsetHeight || 0)
    },

    hamburgerClick() {
      this.activeMenu = !this.activeMenu
    }
  },

  watch: {
    $route(to, from) {
      this.activeMenu = false
    }
  }
}
</script>

<style lang="sass" scoped>
.show-login-menu::before
  background-color: transparent !important
a.td-none
  text-decoration: none
.pointer
  cursor: pointer
  font-weight: 400 !important
.full-header
  position: fixed
  width: 100%
  z-index: 6
  &.borderBottom
    border-bottom: 1px solid #cbc6e2
.tech-message
  width: 100%
  color: white
  background-color: #e65246
.header
  display: flex
  width: 100%
  .lh-normal
    line-height: 1
  .lh-more
    line-height: 1.25
.logo
  max-width: 44px
  max-height: 44px
  margin-left: 16px
  margin-top: 8px
  margin-bottom: 8px
.toolbar-text
  line-height: 1.15
  padding-left: 10px
  padding-top: 9px
  font-size: 18px
.v-list-username
  font-weight: 400 !important

.hamburger
  cursor: pointer
  margin-top: 22px
  margin-right: 16px
  margin-left: 12px
  span
    display: block
    width: 25px
    height: 3px
    margin-bottom: 4px
    border-radius: 20px
    background-color: #37474F
    transition: .2s
    &:last-child
      margin-bottom: 0
  &.active
    span:nth-child(1)
      transform: rotate(-45deg) translate(-5px, 5px)
    span:nth-child(2)
      opacity: 0
    span:nth-child(3)
      transform: rotate(45deg) translate(-5px, -5px)

.mobile-menu
  position: fixed
  top: 0
  left: -100%
  width: 100%
  height: 100%
  background-color: rgba(232, 234, 246, 1)
  padding: 65px 0 0 12px
  z-index: 5
  transition: left .2s ease 0s
  &.active
    left: 0

.timer
  max-height: 30px
  margin-top: 11px
  margin-right: 0
  border-color: #dadada !important

.timer.timer-mt16
  margin-top: 16px

.timer *
  font-size: 12px !important
</style>