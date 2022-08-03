<template>
  <v-list class="py-0" :class="{'isMobile': isMobile}">
    <div v-for="(link, i) in links" :key="i">
      <v-list-item
        :to="link.route"
        class="pr-2 pl-2"
        :class="{'pl-1': isMobile}"
        active-class="activeLink"
      >
        <v-list-item-icon class="mr-3 my-3 ml-2">
          <v-icon class="menu--text" :title="link.text">{{ link.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="menu--text">{{ link.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </div>
  </v-list>
</template>

<script>
export default {
  name: 'MenuLinks',

  props: {
    links: Array,
    isMobile: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.activeLink {
  color: #2196f3 !important
}

.isMobile .v-list-item {
  background-color: #e8eaf6;
}
</style>