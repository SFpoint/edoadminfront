<template>
	<v-row justify="center">
		<v-dialog :value="dialog" max-width="800" @input="closeModal">
			<v-card class="card">
				<v-card-title class="headline accent--text pb-4">
          Просмотр лога
        </v-card-title>

				<v-card-text outlined tile class="border-top">
					<v-container>
						<v-row>
							<v-col cols="12" class="pb-0 px-0">
                <span class="log-text">{{ log }}</span>
              </v-col>
            </v-row>
					</v-container>
				</v-card-text>				

        <v-card-actions class="px-6">
          <v-spacer></v-spacer>
          <v-btn text color="lightGrey" @click="closeModal">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
		</v-dialog>
	</v-row>
</template>

<script>
import format from 'xml-formatter'
import _isEqual from "lodash/isEqual";
import _cloneDeep from "lodash/cloneDeep";

export default {
	props: {
		dialog: Boolean,
    selectedLog: Object
	},

  data: () => ({
    log: null
  }),

	methods: {
    closeModal() {
      this.log = null
			this.$emit('closeModal')
		}
	},

  watch: {
    selectedLog(val) {
      if (val?.logDescription) {
        this.log = val?.logDescription
      }
    },
  }
}
</script>

<style scoped>
.theme--light.v-btn.v-btn--disabled {
	color: #dadada !important
}

.log-text {
  color: #37474f !important
}

.card .v-card__title {
  position: sticky;
  background-color: white;
  top: 0;
  border: 0 !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12) !important
}

.card .v-card__actions {
  position: sticky;
  background-color: white;
  bottom: 0;
}
</style>


