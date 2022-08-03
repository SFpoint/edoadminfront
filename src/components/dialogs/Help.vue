<template>
	<v-row justify="center" class="ma-0">
		<v-dialog :value="dialog" max-width="600" @input="closeDialog">
			<v-card>
				<v-card-title class="headline accent--text pb-4">Помощь</v-card-title>

				<v-card-text outlined tile class="border-top text">
					<v-container>
						<v-row>
							<v-col cols="12" class="pa-0 pt-5">
                <p>Добавление новых пользователей/изменение данных
                  в сервисе по заявке на почту <strong>Help_NIR@szgmu.ru</strong>.</p>
                <p>В заявке необходимо указать:</p>

                <ol>
                  <li>Адрес электронной почты</li>
                  <li>Фамилия, имя, отчество</li>
                  <li>Кафедра/подразделение</li>
                  <li>Должность</li>
                  <li>Ученая степень</li>
                  <li>Вид исполнения (основной, внут.совместитель, внеш.совместитель, расш.зоны.обсл)</li>
                </ol>
              </v-col>
            </v-row>
					</v-container>
				</v-card-text>

        <v-card-actions class="px-6">
          <v-spacer></v-spacer>
          <v-btn text color="lightGrey" @click="closeDialog">Понятно</v-btn>
        </v-card-actions>
      </v-card>
		</v-dialog>
	</v-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	props: {
		dialog: Boolean
	},

  data: () => ({
    instructions: [
      {
        id: 1,
        name: 'Инструкция по регистрации и добавлению работ',
        link: '/Инструкция по регистрации и добавлению работ.pdf',
        allowRoles: ['*']
      },
      {
        id: 2,
        name: 'Инструкция модератора',
        link: '/Инструкция модератора.pdf',
        allowRoles: ['ROLE_ADMIN', 'ROLE_MODERATOR']
      },
      {
        id: 3,
        name: 'Инструкция сотрудника отдела НИР',
        link: '/Инструкция сотрудника отдела НИР.pdf',
        allowRoles: ['ROLE_VIEW_EFFICIENCY_METRICS']
      },
      {
        id: 4,
        name: 'Инструкция сотрудника отдела диссертационных советов',
        link: '/Инструкция сотрудника отдела диссертационных советов.pdf',
        allowRoles: ['ROLE_VIEW_SCIENTIFIC_WORK']
      },
      {
        id: 5,
        name: 'Инструкция администратора',
        link: '/Инструкция администратора.pdf',
        allowRoles: ['ROLE_ADMIN']
      }
    ]
  }),

  computed: {
    ...mapGetters('user', ['allUserRoles']),

    computedInstructions() {
      return this.instructions.filter(item => {
        return item.allowRoles.some(role => this.allUserRoles.includes(role) || role === '*')
      })
    }
  },

	methods: {
    closeDialog() {
			this.$emit('closeHelpDialog')
		}
	}
}
</script>

<style scoped>
.border-top {
  border: 0 !important;
  border-top: 1px solid rgba(0, 0, 0, 0.12) !important;
}

.text {
  color: #37474f !important;
}


ul.links {
  padding-left: 0;
}

ul.links li {
  list-style-type: none;
  font-size: 16px;
  margin-bottom: 16px;
}

ul.links li:last-child {
  margin-bottom: 0;
}

.link {
  text-decoration: none;
  color: #37474f;
  border-bottom: 1px solid #81939c;
  padding-bottom: 1px;
  transition: border-bottom-color .2s ease
}

.link:hover {
  border-bottom-color: white;
}
</style>