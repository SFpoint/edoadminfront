<template>
<div>
      <div class="text-center" v-if="!dataLoaded">
    <v-progress-circular class="mt-6" :size="50" color="primary" indeterminate />
    </div>
    <div class="mx-4" v-else>
      <PageTitle title="Документы" />
          <v-data-table
            v-if="DocTypes.list.length"
            :loading="tableLoading"
            :headers="tableHeaders"
            :items="DocTypes.list"
            :items-per-page="40"
            loading-text="Загрузка"
            hide-default-footer
            class="table elevation-1"
          >
            <template v-slot:item.actions="{ item }">
              <v-icon color="lightGrey" class="mr-1 edit-btn" size="22" title="Редактировать" @click="edit(item)">
                mdi-pencil-outline
              </v-icon>
            </template>
            <template slot="no-data">
              <div>Таблица пуста</div>
            </template>
          </v-data-table>
      
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageTitle from '@/components/ui/Title'
import { delay } from '@/scripts'
import { docTypeApi } from '@/api'
import {DocTypes} from '@/models'

export default {
name: 'docType',

  metaInfo: {
    title: 'Редактор'
  },

  components: {
    PageTitle
  },
async created() {
    this.hideHtmlOverflow()
    await this.$store.dispatch('user/getCurrent')
    await this.checkOperatorRoles()
    await delay(1000)
    await this.getDocType()
    this.dataLoaded = true
  },

  destroyed() {
    this.showHtmlOverflow()
  },


  data () {
        return {
              search: {},
    tableHeaders: [
      { text: 'Название', value: 'name', sortable: false, align: 'center' },
      { text: 'Name', value: 'nameEng', sortable: false, align: 'center' },
      { text: 'Тип документа', value: 'project.name', sortable: false, align: 'center',},
      { text: 'Действия', value: 'actions', sortable: false, align: 'center', width: '130px' }
    ],
    DocTypes: new DocTypes(),
    tableLoading: false,
    dataLoaded: false,
    selectedItem: null,
    }
  },

  computed: {
    ...mapGetters('user', ['isOperatorRoles']),


    selectedItemName() {
      return this.selectedItem?.Name
    }
  },
  methods:{
    async checkOperatorRoles() {
      if (!this.isOperatorRoles) {
        this.$toastr('error', '', 'Обратитесь к администратору для получения прав доступа')
        await this.$router.push('/login')
      }
    },
    hideHtmlOverflow() {
      document.querySelector('html').style.overflowY = 'hidden'
    },

    showHtmlOverflow() {
      document.querySelector('html').style.overflowY = 'visible'
    },

    async getDocType() {
        const data  = await docTypeApi.getDocType()
      data.forEach(obj => this.DocTypes.addDocType(obj))
    },

  edit(item){
    this.selectedItem = item
    this.$router.push({name: 'documentEdit', params: item})
  }
  }
}


</script>

<style>
.home-tabs li {
  display: list-;
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