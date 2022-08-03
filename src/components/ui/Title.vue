<template>
  <v-row class="my-0">
    <v-col cols="12" class="pt-0 pb-7">
      <h1 class="accent--text">{{ title }}</h1>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Title",

  props: {
    title: {
      type: String,
      default: 'Заголовок страницы'
    }
  }
}
</script>

<style scoped>
h1 {
  font-weight: 500;
  line-height: 0.8 !important;
  font-size: 30px !important;
  text-align: center;
}
</style>