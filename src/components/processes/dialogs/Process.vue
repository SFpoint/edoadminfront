<template>
	<v-row justify="center">
		<v-dialog :value="dialog" max-width="600" persistent @input="closeModal">
			<v-card class="card">
				<v-card-title class="headline accent--text pb-4">
          {{ isEdit ? 'Редактирование процесса' : 'Добавление процесса' }}
        </v-card-title>
				<v-card-text outlined tile class="border-top">
          <v-container class="px-0">
            <v-row>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="processData.processName"
                  label="Название"
                  :error-messages="processNameErrors"
                  @input="$v.processData.processName.$touch()"
                  @blur="$v.processData.processName.$touch()"
                />
              </v-col>

              <v-col cols="12" class="py-0">
                <v-textarea
                  v-model="processData.processDescription"
                  label="Описание процесса"
                  rows="1"
                  no-resize
                  auto-grow
                  :error-messages="processDescriptionErrors"
                  @input="$v.processData.processDescription.$touch()"
                  @blur="$v.processData.processDescription.$touch()"
                />
              </v-col>

              <v-col cols="12" class="py-0">
                <v-text-field
                  v-model="processData.processCommand"
                  label="Команда процесса"
                  :error-messages="processCommandErrors"
                  @input="$v.processData.processCommand.$touch()"
                  @blur="$v.processData.processCommand.$touch()"
                />
              </v-col>
            </v-row>
          </v-container>
				</v-card-text>				

        <v-card-actions class="px-6">
          <v-spacer></v-spacer>
          <v-btn text color="lightGrey" @click="closeModal">Отмена</v-btn>
          <v-btn
						:loading="loading"
            :disabled="$v.$invalid"
            color="success"
            text
            @click="saveProcess"
          >
            {{ isEdit ? 'Сохранить' : 'Создать' }}
          </v-btn>
        </v-card-actions>
      </v-card>
		</v-dialog>
	</v-row>
</template>

<script>
import { catalogApi } from '@/api'
import { mapGetters } from 'vuex'
import { required, maxLength } from 'vuelidate/lib/validators'
import { delay } from '@/scripts'
import _cloneDeep from 'lodash/cloneDeep'
import { Process } from '@/models'

export default {
  props: {
    dialog: Boolean,
    selectedItem: Object
  },

  async created() {

  },

  data: () => ({
    famRelationshipsList: [],
    gendersList: [],
    loading: false,

    processData: new Process()
  }),

  validations() {
    return {
      processData: {
        processName: { required, maxLength: maxLength(100) },
        processDescription: { maxLength: maxLength(1000) },
        processCommand: { required, maxLength: maxLength(500) }
      }
    }
  },

  computed: {
    isEdit() {
      return this.selectedItem?.processId
    },

    processNameErrors() {
      const errors = []
      if (!this.$v.processData.processName.$dirty) return errors
      !this.$v.processData.processName.required && errors.push('Обязательное поле')
      !this.$v.processData.processName.maxLength && errors.push('Не больше 100 символов')
      return errors
    },

    processDescriptionErrors() {
      const errors = []
      if (!this.$v.processData.processDescription.$dirty) return errors
      !this.$v.processData.processDescription.maxLength && errors.push('Не больше 1000 символов')
      return errors
    },

    processCommandErrors() {
      const errors = []
      if (!this.$v.processData.processCommand.$dirty) return errors
      !this.$v.processData.processCommand.required && errors.push('Обязательное поле')
      !this.$v.processData.processCommand.maxLength && errors.push('Не больше 500 символов')
      return errors
    }
  },

  methods: {
    async saveProcess() {
      try {
        // ToDo: сохранение и обновление на бэке будут здесь, потом эмитится возвращаемый с бэка объект
        this.loading = true
        await delay(1000)
        this.isEdit
          ? this.$emit('updateProcess', this.processData)
          : this.$emit('createProcess', this.processData)
      } catch (e) {
        if (e.status !== 500) {
          this.$toastr('error', `<b>Код ошибки: ${e.status}</b>`, e.data.message)
        }
      } finally {
        this.loading = false
      }
    },

    resetModal() {
      this.$v.$reset()
      this.processData = new Process()
    },

    closeModal() {
      this.processData = new Process()
      this.$emit('closeModal')
    }
  },

  watch: {
    selectedItem(val) {
      this.processData = val?.processId ? _cloneDeep(val) : new Process()
    },

    dialog(val) {
      !val && this.resetModal()
    }
  }
}
</script>

<style scoped>
.border-top {
	border: 0 !important;
	border-top: 1px solid rgba(0, 0, 0, 0.12) !important;
}

.card >>> .v-label.theme--light {
  font-size: 14px;
  color: rgba(55, 71, 79, .8) !important;
}

.card >>> .v-label.v-label--active.theme--light {
  font-size: 16px;
}

.card >>> .v-label.v-label--active.primary--text.theme--light {
  color: #2196f3 !important
}
</style>