import { mixins } from "vue-class-component"
import { Component } from "vue-property-decorator"
import { listarTodasTarefas } from "@/plugins/middleware/listasDeTarefas"
import { namespace } from "vuex-class"

const tarefaStore = namespace("tarefaStore")

@Component({})

export default class salvarNoCacheTarefas extends mixins() {
  @tarefaStore.Action("setTodasTarefas") setTodasTarefas

  mounted() {
    const listarTarefas = async () => {
      try {
        const response = await listarTodasTarefas()
        
        if(response.length === 0) return "Você não possui nenhuma tarefa salva no banco de dados!"
        
        return this.setTodasTarefas(response)
        
      } catch {
        console.log("Error ao tentar buscar as tarefas no banco de dados.")
      }
    }

    listarTarefas()
  }
}