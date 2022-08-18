<template>
<div>

        <v-card class="mx-auto"
        max-width="200"
        tile
        >
        <v-list flat>
            <v-subheader>Документы</v-subheader>
            <v-list-item-group
            v-model="FieldsMenu"
            color="primary">
            <template
            v-if="fields"
            >
            <v-list-item
            v-for="(field, i) in sortedFields"
            :key="i"
            @click="$emit('choose-field', field)"
            >
            <v-list-item-title
            v-text="field.keyName">
            </v-list-item-title>
            </v-list-item>
            </template>
            </v-list-item-group>
        </v-list>
        </v-card>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageTitle from '@/components/ui/Title'
import { delay } from '@/scripts'
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
    // await this.sortedFields()
    this.dataLoaded = true
    console.log('menu', this.fields);

  },

  destroyed() {
    this.showHtmlOverflow()
  },


    data () {
        return {
          search: {},
          DocTypes: new DocTypes(),
          tableLoading: false,
          dataLoaded: false,
          FieldsMenu: '',
        }
    },
props: {
fields: {
  type: Object,
  default: null,
}
},

computed: {
    ...mapGetters('user', ['isOperatorRoles']),
    sortedFields(){
    let sortedFields = this.fields.docFields.filter(e => e.keyName !== 'docName');
    sortedFields = sortedFields.sort((a, b) => { return a.number - b.number; });
    return sortedFields;
    //  .sort(number => number % 2 === 0),
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

    },
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

</style>