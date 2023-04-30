const state = {
  itens: {
    tarefas: []
  },
}

const getters = {
  verTodasTarefas: ({ itens }) => {
    return itens.tarefas
  },
}

const mutations = {
  salvarTodasTarefasBd: ({itens }, payload) => {
    return itens.tarefas =  [...payload]
  }
}

const actions = {
  setTodasTarefas({ commit }, payload) {
    if (payload && payload.length > 0) {
      return commit("salvarTodasTarefasBd", payload)
    }
  }
}


const tarefaStore = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}


export default tarefaStore

