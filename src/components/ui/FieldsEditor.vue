<template>
<div>
<v-container>
    <v-container>
<v-row>
    <v-col
    cols="4">
            <v-text-field
    label="Key_name"
    v-model="chosenFieldCopy.keyName"
    disabled
    ></v-text-field>
    <v-text-field 
    label="Label"
    v-model="chosenFieldCopy.label">
    </v-text-field>
    </v-col>
    <v-col
    cols="4">
                <v-text-field 
    label="doc_fields_type"
    v-model="chosenFieldCopy.docFieldsType.name"
    >
    </v-text-field>
        <v-text-field 
    label="number"
    v-model="chosenFieldCopy.number">
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
    v-model="chosenFieldCopy.maxLength"
    ></v-text-field>
    <v-text-field 
    label="stand_valid">
    </v-text-field>
    </v-col>
    <v-col
    cols="4">
                <v-text-field 
    label="min_length"
    v-model="chosenFieldCopy.minLength"
>
    </v-text-field>
        <v-text-field 
    label="regular"
    v-model="chosenFieldCopy.regular"
>
    </v-text-field>
    </v-col>
</v-row>
</v-container>
<v-container
v-if="chosenFieldCopy.docFieldsType.name === 'dictionary'"
class="mt-10">
<v-row>    
    <v-col
    cols="4">
        <v-text-field
    label="divider"
    v-model="chosenFieldCopy.dictionaryField.divider">
    </v-text-field>
</v-col>
<v-col
cols="4">

            <v-text-field
            v-for="(keyName, i) in dictionaryFields"
            :key="i"
    :label="keyName.name"
    v-model="keyName.value"
    >
    </v-text-field>
<v-btn
@click="addDictionaryFields"
>Добавить ключ</v-btn>
</v-col>
</v-row>
</v-container>
</v-container>
<v-btn
@click="saveDictionary"
>Сохранить</v-btn>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageTitle from '@/components/ui/Title'
import { delay } from '@/scripts'
import { SaveApi } from '@/api'
import { field } from '@/models'

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
    console.log('fields', this.fields)
    },

destroyed() {
    this.showHtmlOverflow()
},


    data () {
        return {
    dataLoaded: false,
    chosenFieldCopy: {},
    dictionaryFields: [],
        }
    },
props: {
    fields: {
  type: Object,
  default: null,
},
chosenField: {
   type: Object,
  default: null, 
}
},
computed: {
    ...mapGetters('user', ['isOperatorRoles']),

    selectedItemName() {
    return this.selectedItem?.processNames
    }
},
created () {
    if (this.chosenField) {
    this.chosenFieldCopy = Object.assign(this.chosenField, {});
this.chosenFieldCopy.dictionaryField.keyNames.forEach(e => {
    this.dictionaryFields.push({name: e, value: ''})
})
    }
},
watch: {
chosenField () {
   if (this.chosenField) {
    this.chosenFieldCopy = Object.assign(this.chosenField, {});
     this.dictionaryFields = [];
this.chosenFieldCopy.dictionaryField.keyNames.forEach(e => {
    this.dictionaryFields.push({name: e, value: ''})
})
    }
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
addDictionaryFields () {
this.dictionaryFields.push({name: 'Строка массива', value: ''})
},
async saveDictionary () {
    this.chosenFieldCopy.dictionaryField.keyNames = this.dictionaryFields;
    const data = await SaveApi.SaveChanges(this.chosenFieldCopy)
    this.field = data
    console.log(data);
},
},
}
</script>

<style>

</style>