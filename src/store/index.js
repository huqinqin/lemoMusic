import vue from 'vue'
import vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import * as getters from './getters'
import * as actions from './actions.js'

vue.use(vuex);

export default new vuex.Store({
  state,
  mutations,
  getters,
  actions
})
