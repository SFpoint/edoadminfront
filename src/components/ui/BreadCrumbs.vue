<template>
  <div class="breadcrumbs">
    <v-breadcrumbs
      :items="items"
      large
      class="pa-0"
    >
    </v-breadcrumbs>
  </div>
</template>

<script>
export default {
  name: "Breadcrumbs",

  props: {
    items: Array
  }
}
</script>

<style scoped>
.breadcrumbs >>> .v-breadcrumbs__divider {
  padding: 0 8px
}

.breadcrumbs >>> .v-breadcrumbs__item {
  color: #90a4ae;
  border-bottom: 1px solid #90a4ae;
}

.breadcrumbs >>> .v-breadcrumbs__item:hover, .breadcrumbs >>> .v-breadcrumbs__item--disabled {
  border-bottom-color: transparent;
}
</style>

