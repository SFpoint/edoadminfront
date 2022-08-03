<template>
	<div>
		<h2 class="accent--text text-center mb-3">{{ title }}</h2>
<!--		<v-divider />-->
	</div>
</template>

<script>
export default {
	name: 'BlockTitle',

	props: {
		title: {
			type: [String, Number],
			required: true
		}
	}
}
</script>

<style scoped>
h2 {
  font-weight: 400;
  font-size: 22px;
}
</style>
