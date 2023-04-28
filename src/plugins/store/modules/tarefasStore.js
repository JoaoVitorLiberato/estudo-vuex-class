const modulesCache = () => {
  return {
    tarefas: [],
    lista: {
      tarefas: []
    }
  }
}

const state = modulesCache()

const getters = {
  verTodosStates: (state) => {
    return state
  },
  verTodasTarefas: ({ tarefas }) => {
    return tarefas 
  },
}

const mutations = {
  salvarTodasTarefasBd: (state, data) => {
    return state.tarefas = [
      ...data
    ]
  }
}

const actions = {
  setTodasTarefas: ({ commit }, data) => {
    if (data) {
      return commit("salvarTodasTarefasBd", data)
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

