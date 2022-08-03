<template>
	<v-row justify="center">
		<v-dialog :value="dialog" max-width="500" @input="closeConfirmModal">
			<v-card>
				<v-card-title class="headline accent--text pb-4">Подтверждение удаления</v-card-title>
				<v-card-text outlined tile class="border-top">
					<v-container>
						<v-row>
							<v-col cols="12" class="pa-0 pt-3">
                <p class="accent--text" v-html="message"></p>
              </v-col>
            </v-row>
					</v-container>
				</v-card-text>

        <v-card-actions class="px-6">
          <v-spacer></v-spacer>
          <v-btn text color="lightGrey" @click="closeConfirmModal">Отмена</v-btn>
          <v-btn
            color="error"
            text
            @click="confirm"
          >
            Удалить
          </v-btn>
        </v-card-actions>
      </v-card>
		</v-dialog>
	</v-row>
</template>

<script>
export default {
	props: {
		dialog: Boolean,
    message: String
	},

	methods: {
    confirm() {
      this.$emit('confirm')
    },

    closeConfirmModal() {
			this.$emit('closeConfirmModal')
		}
	}
}
</script>

<style scoped>
.border-top {
  border: 0 !important;
  border-top: 1px solid rgba(0, 0, 0, 0.12) !important;
}

.theme--light.v-btn.v-btn--disabled {
  color: #dadada !important
}
</style>