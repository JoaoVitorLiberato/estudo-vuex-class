import Vue from 'vue'
import Vuex from 'vuex'
import tarefaStore from '@/plugins/store/modules/tarefasStore'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: false,
  modules: {
    tarefaStore
  }
})
