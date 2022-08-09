<template>
  <div class="left-menu-wrapper">
    <v-btn class="left-menu-toggler pl-3" plain :title="mini ? 'Показать меню' : 'Скрыть меню'" @click="mini = !mini" >
      <v-icon class="icon">{{ mini ? 'mdi-chevron-double-right' : 'mdi-chevron-double-left' }}</v-icon>
    </v-btn>
    
    <v-navigation-drawer
      :clipped="false"
      v-model="drawer"
      width="200"
      class="background left-menu"
      :mini-variant.sync="mini"
      absolute
      app
      floating
      mobile-breakpoint="xs"
      permanent
    >
      <MenuLinks :links="links" />
      
    </v-navigation-drawer>
  </div>
</template>

<script>
import MenuLinks from '@/components/ui/MenuLinks'

export default {
  name: 'LeftMenu',

  props: {
    links: Array
  },

  components: {
    MenuLinks
  },

  data: () => ({
    drawer: false,
    mini: false
  }),

  computed: {

  },

  methods: {

  }
}
</script>

<style scoped>
.left-menu {
  margin-top: calc(100px + var(--tech-message-height));
  max-height: calc(100vh - 100px - var(--tech-message-height)) !important;
}

.left-menu-wrapper {
  display: flex;
  flex-direction: column;
}

.left-menu-toggler {
  position: absolute;
  top: calc(64px + var(--tech-message-height));
}

.left-menu-toggler >>> .icon {
  font-size: 20px;
  color: #a6b6be !important;
}
</style>

