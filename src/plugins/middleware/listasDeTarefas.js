import { list } from "@/plugins/helpers/useBd"

const listarTodasTarefas = async () => {
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


export {
  listarTodasTarefas
}