<template>
	<div>
		<FilterChips
			v-show="!showFilter"
			:search="search"
			:showFilter="showFilter"
			:processesList="processesList"
			@resetFilter="resetFilter"
		/>

		<div class="filter-content" :class="{'show': showFilter}">
      <v-card class="pa-4 pt-0 mt-2 filter-card" :class="{'show': showFilter}" elevation="3">
        <v-row>
          <v-col cols="4" class="pr-1">
            <v-autocomplete
              v-model="process"
              label="Название процесса"
              placeholder="Поиск от 4-х символов"
              class="pt-5"
              hide-no-data
              hide-details
              no-filter
              return-object
              item-text="processName"
              :loading="findProcessLoading"
              :items="processesList"
              :search-input.sync="searchProcess"
              clearable
              @change="input"
              @click:clear="$nextTick(() => setDefaultFilterParams())"
            />
          </v-col>

          <v-col cols="4" class="pr-1">
            <h4 class="filter-title">С даты/времени получения</h4>
            <div class="d-flex">
              <date-picker
                v-model="dates.logDateFrom"
                class="mr-2"
                format="DD-MM-YYYY"
                type="date"
                placeholder="Дата"
                @input="input"
              />

              <date-picker
                v-model="dates.logTimeFrom"
                popup-class="date-picker-class"
                format="HH:mm"
                value-type="format"
                type="time"
                placeholder="Время"
                @input="input"
              />
            </div>
          </v-col>

          <v-col cols="4">
            <h4 class="filter-title">По дате/времени получения</h4>
            <div class="d-flex">
              <date-picker
                v-model="dates.logDateTo"
                class="mr-2"
                format="DD-MM-YYYY"
                type="date"
                placeholder="Дата"
                @input="input"
              />

              <date-picker
                v-model="dates.logTimeTo"
                popup-class="date-picker-class"
                format="HH:mm"
                value-type="format"
                type="time"
                placeholder="Время"
                @input="input"
              />
            </div>
          </v-col>
        </v-row>
      </v-card>
		</div>
	</div>
</template>

<script>
import { debounce } from '@/scripts/debounce'
import FilterChips from '@/components/logs/FilterChips'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/ru'
import axios from "axios";

export default {
	name: "LogsFilter",

	components: {
    FilterChips,
		DatePicker
	},

	props: {
		showFilter: Boolean
	},

  data: () => ({
    searchProcess: '',
    defaultProcessesList: [],
    processesList: [],
    findProcessLoading: false,

    search: {},
    process: null,
    dates: {
      logDateFrom: null,
      logTimeFrom: null,
      logDateTo: null,
      logTimeTo: null
    }
	}),

	methods: {
    async getFilterParams() {
      const { data } = await axios.get('/processes.json')
      this.defaultProcessesList = data.content
      this.processesList = data.content
    },

    setDefaultFilterParams() {
      this.processesList = this.defaultProcessesList
    },

    async findProcesses() {
      try {
        this.findProcessLoading = true

        this.processesList = await processApi.findProcess(this.searchProcess)
      } catch (e) {
        if (e.status !== 500) {
          this.$toastr('error', `<b>Код ошибки: ${e.status}</b>`, e.data.message)
        }
      } finally {
        this.findProcessLoading = false
      }
    },

		input() {
			this.search = {
        processId: this.process?.processId || null,
        logDateFrom: this.getDateString(this.dates.logDateFrom, this.dates.logTimeFrom) || null,
        logDateTo: this.getDateString(this.dates.logDateTo, this.dates.logTimeTo, true) || null
			}

			this.$emit('setSearch', this.search)
		},

		getDateString(date, time, dayEnd = false) {
			const todayDate = this.formatDate(new Date())
			const defaultTime = dayEnd ? '23:59:59' : '00:00:00'

			if (date && time) return `${this.formatDate(date)} ${time}:00`
			else if (date && !time) return `${this.formatDate(date)} ${defaultTime}`
			else if (!date && time) return `${todayDate} ${time}:00`
		},

		formatDate(val) {
			if (!val) return null

			if (val) {
				const day = val.getDate() < 10 ? `0${val.getDate()}` : val.getDate()
				const month = (val.getMonth() + 1) < 10 ? `0${val.getMonth() + 1}` : val.getMonth() + 1
				const year = val.getFullYear()

				return `${day}-${month}-${year}`
			}
		},

		resetFilter(search) {
      if (!search.logDateFrom) {
        this.dates.logDateFrom = null
        this.dates.logTimeFrom = null
      }

      if (!search.logDateTo) {
        this.dates.logDateTo = null
        this.dates.logTimeTo = null
      }

			this.search = { ...search }
			this.$emit('setSearch', this.search)
		}
	},

	watch: {
		showFilter(val) {
			val && this.getFilterParams()
		},

    searchProcess: debounce(function(val) {
      if (val) {
        val.length >= 4 && val !== this.process?.processName  ? this.findProcesses() : this.setDefaultFilterParams()
      }
    }, 500)
	}
}
</script>

<style scoped>
.filter-content {
	max-height: 0;
}

.filter-content.show {
	max-height: 100vh;
}

.filter-card {
  display: none;
}

.filter-card.show {
  display: block;
}

h4.filter-title {
	text-align: left;
	color: #666;
	font-size: 14px;
	font-weight: 400;
	padding-bottom: 4px;
	margin-bottom: 0;
}

.span-filter-text {
	font-weight: bold;
	color: #666;
	width: 20px;
	font-size: 13px;
	text-align: left;
	padding-top: 7px;
	padding-left: 1px;
}

.mx-time {
	width: 148px;
}
</style>
