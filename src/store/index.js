import Vue from 'vue'
import Vuex from 'vuex'

import system from '@/store/system'
import user from '@/store/user'

Vue.use(Vuex)

export default new Vuex.Store({
	strict: true,

	modules: {
    system,
		user
	}
})