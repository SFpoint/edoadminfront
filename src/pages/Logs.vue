<template>
  <div>
    <div class="text-center" v-if="!dataLoaded">
      <v-progress-circular class="mt-6" :size="50" color="primary" indeterminate />
    </div>

    <div class="mx-4" v-else>
      <PageTitle title="Логи" />

      <v-row class="my-0">
        <v-col cols="12" class="pt-0">
          <div class="d-flex justify-end">
            <v-btn
              text
              color="lightGrey"
              :ripple="false"
              class="show-filter px-0"
              @click="showFilter = !showFilter"
            >
              <v-icon left size="20">mdi-filter</v-icon>
              Фильтры
              <v-icon left size="20" class="ml-1">{{ showFilter ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>

      <LogFilters
        :showFilter="showFilter"
        @setSearch="search = $event"
      />

      <v-row class="my-0">
        <v-col cols="12" class="pt-0">
          <v-data-table
            v-if="logs.length"
            :loading="tableLoading"
            :headers="tableHeaders"
            :items="logs"
            loading-text="Загрузка"
            hide-default-footer
            class="table elevation-1"
            :class="!showFilter && isFilters ? 'mt-3' : 'mt-4'"
          >
            <template v-slot:item.actions="{ item }">
              <v-icon color="lightGrey" class="show-btn" size="22" title="Просмотр лога" @click="show(item)">
                mdi-eye-outline
              </v-icon>
            </template>

            <template slot="no-data">
              <div>Таблица пуста</div>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </div>

    <LogDialog
      :dialog="dialog"
      :selectedLog="selectedLog"
      @closeModal="closeDialog"
    />
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import { delay } from '@/scripts'
import PageTitle from '@/components/ui/Title'
import LogDialog from '@/components/logs/dialogs/Log'
import LogFilters from '@/components/logs/Filters'

export default {
  name: 'Logs',

  metaInfo: {
    title: 'Логи процессов'
  },

  components: {
    PageTitle,
    LogDialog,
    LogFilters
  },

  async created() {
    this.hideHtmlOverflow()
    await this.$store.dispatch('user/getCurrent')
    await this.checkOperatorRoles()
    await delay(1000)
    await this.getLogsList()
    this.dataLoaded = true
  },

  destroyed() {
    this.showHtmlOverflow()
  },

  data: () => ({
    search: {},
    tableHeaders: [
      { text: 'Название', value: 'processName', sortable: false, align: 'center' },
      { text: 'Время записи лога', value: 'logDate', sortable: false, align: 'center' },
      { text: 'Действия', value: 'actions', sortable: false, align: 'center', width: '130px' }
    ],
    logs: [],
    tableLoading: false,
    dataLoaded: false,
    selectedLog: null,
    dialog: false,
    showFilter: false
  }),

  computed: {
    ...mapGetters('user', ['isOperatorRoles']),

    isFilters() {
      return Object.keys(this.search).some(key => !!this.search[key])
    }
  },

  methods: {
    async checkOperatorRoles() {
      if (!this.isOperatorRoles) {
        this.$toastr('error', '', 'Обратитесь к администратору для получения прав доступа')
        await this.$router.push('/login')
      }
    },

    async getLogsList() {
      const { data } = await axios.get('/logs.json')
      this.logs = data.content
      console.log(this.logs)
    },

    show(item) {
      this.selectedLog = item
      this.dialog = true
    },

    closeDialog() {
      this.dialog = false
      this.selectedLog = null
    },

    hideHtmlOverflow() {
      document.querySelector('html').style.overflowY = 'hidden'
    },

    showHtmlOverflow() {
      document.querySelector('html').style.overflowY = 'visible'
    }
  },

  watch: {
    // search: {
    //   deep: true,
    //   handler() {
    //     this.searchOperatorQueue()
    //   }
    // },
    //
    // getInterval(val) {
    //   val === null && this.getOperatorQueueToday()
    // }
  }
}
</script>

<style scoped>
.home-tabs li {
  display: list-item;
  text-align: left;
}

.home-tabs p {
  font-size: 25px;
  margin-bottom: -10px;
}

.tab {
  color: #90a4ae !important;
}

.table {
  overflow-y: auto;
}

.table >>> .v-data-table__wrapper {
  overflow: unset;
}

.table >>> .theme--light.v-progress-linear {
  height: 2px !important;
}

.table >>> th {
  white-space: nowrap;
}

.table >>> .v-data-table-header th {
  color: #37474f !important;
  font-weight: 500 !important
}

.table >>> tbody tr {
  color: #37474f !important;
}

.table >>> tbody tr:hover {
  background-color: #fff !important;
}

.table >>> .edit-btn:hover {
  color: #43A047!important
}

.table >>> .remove-btn:hover {
  color: #ff6666 !important
}

.show-filter::before {
  background-color: transparent !important;
}

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
</style>