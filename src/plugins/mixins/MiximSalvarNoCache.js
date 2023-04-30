import { Component, Vue } from "vue-property-decorator"
import { namespace } from "vuex-class"
import { list } from "@/middlewares/useBd"

const tarefaStore = namespace("tarefaStore")

@Component({})

export default class MixinsSalvarNoCacheTarefas extends Vue {
  @tarefaStore.Action("setTodasTarefas") setTodasTarefas


  async pegarTodasTarefasBD () {
    try {
      const response = await list("tarefas")
      
      if(!response)  {
        console.log("Você não possui nenhuma tarefa salva no banco de dados!")
        return;
      }

      return response
    } catch {
      console.log("Error ao tentar acessar as tarefas salvas no banco de dados")
    }
  }

  async listaDeTarefas () {
    const payload = await this.pegarTodasTarefasBD()

    if(payload.length === 0) {
      console.log("Não possui tarefas em nosso banco de dados salvos!")
      return;
    }

    console.log("Cache atualizado!")
    return this.setTodasTarefas(payload)
  } 
}