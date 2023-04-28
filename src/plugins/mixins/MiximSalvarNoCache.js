import { Component, Vue } from "vue-property-decorator"
import { listarTodasTarefas } from "@/plugins/middleware/listasDeTarefas"
import { namespace } from "vuex-class"

const TAREFA_STORE = namespace("tarefaStore")

@Component({})

export default class MixinsSalvarNoCacheTarefas extends Vue {
  @TAREFA_STORE.Action("setTodasTarefas") TodasTarefas

  async listarTarefas () {
    const response = await listarTodasTarefas()
    if (response.length > 0) {
      console.log("Cache atualizado!")
      this.TodasTarefas(response)
    }
    return response
  }

}