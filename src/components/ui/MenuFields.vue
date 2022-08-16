<template>
<div>

        <v-card class="mx-auto"
        max-width="200"
        tile
        >
        <v-list flat>
            <v-subheader>Документы</v-subheader>
            <v-list-item-group
            v-model="fields"
            color="primary">
            <v-list-item
            v-for="(fields, i) in fields"
            :key="i">
            <v-list-item-title
            v-text="fields.date">
            </v-list-item-title>
            </v-list-item>
            </v-list-item-group>
        </v-list>
        </v-card>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageTitle from '@/components/ui/Title'
import { delay } from '@/scripts'
import { findFieldsApi } from '@/api'
import {DocTypes} from '@/models'


export default {
name: 'MenuFields',

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
    await this.findFields()
    this.dataLoaded = true
  },

  destroyed() {
    this.showHtmlOverflow()
  },


    data () {
        return {
            search: {},
            fields: [],
        DocTypes: new DocTypes(),
        tableLoading: false,
        dataLoaded: false
        }
    },

computed: {
    ...mapGetters('user', ['isOperatorRoles']),

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

      async findFields(body) {
        try{
        const data  = await findFieldsApi.findFields(body)
        this.fields = data
        console.log(body)  
        } 
catch (e){
  console.log(body)
}
    },
  }
}
</script>

<style>
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