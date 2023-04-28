import { list } from "../helpers/useBd"

const listarTodasTarefas = async () => {
  try {
    const response = await list("tarefas")
    
    if (!response || response.length === 0) {
      console.log("Não há tarefas")
    }
    
    return response

  } catch {
    console.log("Error ao tentar acessar as tarefas salvas no banco de dados")
  }
}


export {
  listarTodasTarefas
}