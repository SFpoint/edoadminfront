<template>
	<v-row>
		<v-col cols="12" class="pt-0 pb-1" :class="{'py-0': showFilter }">
			<div class="text-right filter-chips">
				<v-chip
					v-for="(chip, i) in filterChipsComputed"
					:key="i"
					v-if="chip.visible"
					class="filter-chip mb-1 ml-1"
					outlined
					text-color="lightGrey"
					close
					small
					:title="chip.name"
					@click:close="resetFilter(chip.prop)"
				>
					{{ chip.value }}
				</v-chip>
			</div>
		</v-col>
	</v-row>
</template>

<script>
export default {
	name: "LogFilterChips",

	props: {
		search: Object,
    showFilter: Boolean,
    processesList: Array
	},

  data: () => ({
    filterChips: [
      { prop: 'processId', name: 'Название процесса', visible: false },
      { prop: 'logDateFrom', name: 'С даты/времени получения', visible: false },
      { prop: 'logDateTo', name: 'По дате/времени получения', visible: false }
    ]
	}),

	computed: {
		filterChipsComputed() {
			return this.filterChips.map(chip => {
				let value = null

				switch (chip.prop) {
					case 'processId':
						value = (this.processesList.find(e => e.processId === this.search[chip.prop]))?.processName
						break
					default:
						value = this.search[chip.prop]
				}

				return this.search[chip.prop] == null ? chip : { ...chip, value, visible: true }
			})
		}
	},

	methods: {
		resetFilter(prop) {
			this.$emit('resetFilter', { ...this.search, [prop]: null })
		}
	}
}
</script>

<style scoped>
.filter-chips >>> .v-chip .v-chip__close.v-icon {
	font-size: 16px !important;
}

.filter-chip {
	cursor: help;
}
</style>
