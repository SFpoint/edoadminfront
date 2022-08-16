<template>
  <div>
    <div class="text-center" v-if="!dataLoaded">
      <v-progress-circular class="mt-6" :size="50" color="primary" indeterminate />
    </div>

    <div class="mx-4" v-else>
      <PageTitle title="Процессы" />

      <v-row class="my-0">
        <v-col cols="12" class="pt-0">
          <v-btn
            small
            color="primary"
            class="white--text px-4"
            @click="dialog = true"
          >
            <v-icon left small>mdi-plus</v-icon>Добавить
          </v-btn>

          <v-data-table
            v-if="processes.list.length"
            class="table elevation-1 mt-2"
            :loading="tableLoading"
            :headers="tableHeaders"
            :items="processes.list"
            loading-text="Загрузка"
            hide-default-footer
          >
            <template v-slot:item.actions="{ item }">
              <v-icon color="lightGrey" class="mr-2 run-btn" size="22" title="Запустить процесс" @click="run(item)">
                mdi-play-circle-outline
              </v-icon>
              <v-icon color="lightGrey" class="mr-1 edit-btn" size="22" title="Редактировать" @click="edit(item)">
                mdi-pencil-outline
              </v-icon>
              <v-icon color="lightGrey" class="remove-btn" size="22" title="Удалить" @click="remove(item)">
                mdi-trash-can-outline
              </v-icon>
            </template>

            <template slot="no-data">
              <div>Таблица пуста</div>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </div>

    <ProcessDialog
      :dialog="dialog"
      :selectedItem="selectedItem"
      @createProcess="createProcess"
      @updateProcess="updateProcess"
      @closeModal="closeDialog"
    />

    <ConfirmDialog
      :dialog="confirmDialog"
      :message="`Логи процесса будут удалены вместе с процессом.<br>Вы уверены, что хотите удалить процесс: <b>${selectedItemName}<b>?`"
      @confirm="removeProcess"
      @closeConfirmModal="closeConfirmDialog"
    />
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import { Processes } from '@/models'
import { delay } from '@/scripts'
import PageTitle from '@/components/ui/Title'
import ProcessDialog from '@/components/processes/dialogs/Process'
import ConfirmDialog from '@/components/dialogs/Confirm'

export default {
  name: 'Processes',

  metaInfo: {
    title: 'Процессы'
  },

  components: {
    PageTitle,
    ProcessDialog,
    ConfirmDialog
  },

  async created() {
    this.hideHtmlOverflow()
    await this.$store.dispatch('user/getCurrent')
    await this.checkOperatorRoles()
    await delay(1000)
    await this.getProcessesList()
    this.dataLoaded = true
  },

  destroyed() {
    this.showHtmlOverflow()
  },

  data: () => ({
    tableHeaders: [
      { text: 'Название', value: 'processName', sortable: false, align: 'center' },
      { text: 'Время предыдущего запуска', value: 'prevTimeActive', sortable: false, align: 'center' },
      { text: 'Действия', value: 'actions', sortable: false, align: 'center', width: '130px' }
    ],
    processes: new Processes(),
    tableLoading: false,
    dataLoaded: false,
    selectedItem: null,
    dialog: false,
    confirmDialog: false
  }),

  computed: {
    ...mapGetters('user', ['isOperatorRoles']),

    selectedItemName() {
      return this.selectedItem?.processName
    }
  },

  methods: {
    async checkOperatorRoles() {
      if (!this.isOperatorRoles) {
        this.$toastr('error', '', 'Обратитесь к администратору для получения прав доступа')
        await this.$router.push('/login')
      }
    },

    async getProcessesList() {
      const { data } = await axios.get('/processes.json')
      data.content.forEach(obj => this.processes.addProcess(obj))
      console.log(data)
    },

    run(item) {

    },

    edit(item) {
      this.selectedItem = item
      this.dialog = true
    },

    remove(item) {
      this.selectedItem = item
      this.confirmDialog = true
    },

    createProcess(obj) {
      this.processes.addProcess(obj)
      this.$toastr('success', '', 'Процесс успешно создан')
      this.closeDialog()
    },

    updateProcess(obj) {
      this.processes.updateProcess(obj)
      this.$toastr('success', '', 'Процесс успешно изменен')
      this.closeDialog()
    },

    async removeProcess() {
      this.closeConfirmDialog()
      this.tableLoading = true
      await delay(1500)
      this.processes.removeProcess(this.selectedItem?.processId)
      this.tableLoading = false
    },

    closeDialog() {
      this.dialog = false
      this.selectedItem = null
    },

    closeConfirmDialog() {
      this.confirmDialog = false
      this.selectedItem = null
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
</style>