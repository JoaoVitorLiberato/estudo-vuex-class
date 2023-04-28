<template>
  <v-container>
    <v-row
      no-gutters
    >
      <v-col
        cols="12"
      >
        <v-row>
          <v-col
            cols="12"
            class="d-flex justify-center mt-10"
          >
            <v-responsive
              max-width="600"
            >
              <v-text-field
                v-model="novaTarefa.tarefa"
                label="Escreva sua tarefa"
                class="mt-3"
                outlined
                rounded
                append-icon="mdi-plus"
                @click:append="handleAdicionarTarefa"
                @keydown.enter="handleAdicionarTarefa"
              />
            </v-responsive>
          </v-col>
          <!-- <v-col
            cols="12"
            v-for="{ id, tarefa, concluido } in TodasTarefas"
            :key="`tarefa-${id}`"
          >
            <card-product 
              :tarefa="tarefa"
              :concluido="concluido"
              @deletarTarefa="handleDeletarTarefa(id)"
            />
          </v-col> -->
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mixins } from "vue-class-component"
  import { Component } from "vue-property-decorator"
  import { post } from "@/plugins/helpers/useBd"
  // import { listarTodasTarefas } from "@/plugins/middleware/listasDeTarefas"
  import { namespace } from "vuex-class"

  const tarefasStore = namespace("tarefaStore")

  @Component({
    components: {
      CardProduct: () => ({
        component: import(
          /* webpackChunkName: "tarefas-component" */
          /* webpackMode: "eager" */
          "@/components/cards/cards-tarefa/CardsTarefa.vue"
        )
      })
    }
  })

  export default class Home extends mixins() {
    @tarefasStore.Getter("verTodasTarefas") verTodasTarefas


    novaTarefa = {
      tarefa: '',
      concluido: false
    }

    // async listarTarefas() {
    //   const response = await listarTodasTarefas()
      
    //   this.TodasTarefas = [
    //     ...response
    //   ]

    //   return response
    // }

    mounted() {
      console.log(this.verTodasTarefas);
    }
    
    async handleAdicionarTarefa() {
      try {
        await post("tarefas", this.novaTarefa)
        return "Tarefa adicionada com sucesso!"
      } catch {
        console.log("Error ao adiocionar a tarefa!")
      }
    }

    handleDeletarTarefa(id) {
      console.log("deletado", id);
    }
  }
</script>
