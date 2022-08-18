<template>
<div>
    <div class="text-center" v-if="!dataLoaded">
    <v-progress-circular class="mt-6" :size="50" color="primary" indeterminate />
    </div>
    <div class="mx-4" v-else>
        <PageTitle title="Редактор" />
        <v-container>
            <v-row>
                <v-col
                cols="2">
                    <MenuFields
                    :fields="fields"
                    @choose-field="chooseField"
                    />
                </v-col>
                <v-col
                cols="10">
                    <FieldsEditor
                    :fields="fields"
                    :chosen-field="chosenField"
                    />
                </v-col>
            </v-row>
        </v-container>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageTitle from '@/components/ui/Title'
import { delay } from '@/scripts'
import MenuFields from '@/components/ui/MenuFields';
import FieldsEditor from '@/components/ui/FieldsEditor'
import { findFieldsApi } from '@/api'


export default {
name: 'Edit',

components: {
    MenuFields,
    FieldsEditor,
    PageTitle
},

    metaInfo: {
    title: 'Редактор'
    },
async created() {
    this.hideHtmlOverflow()
    await this.$store.dispatch('user/getCurrent')
    await this.checkOperatorRoles()
    await delay(1000)
    this.dataLoaded = true
    await this.findFields(this.$route.params)
    },

destroyed() {
    this.showHtmlOverflow()
},


    data () {
        return {
    dataLoaded: false,
    fields: null,
    chosenField: null,
        }
    },

computed: {
    ...mapGetters('user', ['isOperatorRoles']),

    selectedItemName() {
    return this.selectedItem?.processName
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

 async findFields(editDoc) {
        const data  = await findFieldsApi.findFields(editDoc)
        this.fields = data
        },
chooseField(field) {
this.chosenField = field;
}
}
}
</script>

<style>

</style>