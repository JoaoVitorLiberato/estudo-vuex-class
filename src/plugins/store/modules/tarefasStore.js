const modulesCache = () => {
  return {
    tarefas: []
  }
}

const state = modulesCache

const getters = {
  verTodasTarefas: (state) => {
    return state.tarefas 
  },
}

const mutations = {
  salvarTodasTarefasBd: (state, data) => {
    return state.tarefas = data
  }
}

const actions = {
  setTodasTarefas: ({ commit }, data) => {
    if (data) {
      commit("salvarTodasTarefasBd", {...data })
    }
  }
}


const tarefasStore = {
  nameSpaced: true,
  state,
  actions,
  getters,
  mutations
}


export default tarefasStore

