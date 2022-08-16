<template>
<div>
<v-container>
    <v-container>
<v-row>
    <v-col
    cols="4">
            <v-text-field
    label="Key_name"
    ></v-text-field>
    <v-text-field 
    label="Label">
    </v-text-field>
    </v-col>
    <v-col
    cols="4">
                <v-text-field 
    label="doc_fields_type">
    </v-text-field>
        <v-text-field 
    label="number">
    </v-text-field>
    </v-col>
</v-row>
</v-container>
<v-container
class="mt-6">Валидация
<v-row>
    <v-col
    cols="4">
            <v-text-field
    label="max_length"
    ></v-text-field>
    <v-text-field 
    label="stand_valid">
    </v-text-field>
    </v-col>
    <v-col
    cols="4">
                <v-text-field 
    label="min_length">
    </v-text-field>
        <v-text-field 
    label="regular">
    </v-text-field>
    </v-col>
</v-row>
</v-container>
<v-container
class="mt-10">
<v-row>
    <v-col
    cols="4">
        <v-text-field
    label="divider">
    </v-text-field>
</v-col>
<v-col
cols="4">
            <v-text-field
    label="строка массива">
    </v-text-field>
            <v-text-field
    label="строка массива">
    </v-text-field>
            <v-text-field
    label="строка массива">
    </v-text-field>
            <v-text-field
    label="строка массива">
    </v-text-field>
            <v-text-field
    label="строка массива">
    </v-text-field>
            <v-text-field
    label="строка массива">
    </v-text-field>

</v-col>
</v-row>
</v-container>
</v-container>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageTitle from '@/components/ui/Title'
import { delay } from '@/scripts'

export default {
name: 'FieldsEditor',

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
    this.dataLoaded = true
    },

destroyed() {
    this.showHtmlOverflow()
},


    data () {
        return {
    dataLoaded: false
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


}
}
</script>

<style>

</style>