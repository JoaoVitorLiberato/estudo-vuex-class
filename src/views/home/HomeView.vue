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
          <v-col
            cols="12"
          >
            <v-row>
              <v-col
                v-if="getTodasTarefas.length > 0"
                cols="12"
              >
                <div
                  v-for="{ id, tarefa, concluido } in getTodasTarefas"
                  :key="`tarefa-${id}`"
                >
                  <card-product
                    :tarefa="tarefa"
                    :concluido="concluido"
                    @deletarTarefa="handleDeletarTarefa(id)"
                  />
                  <dialog-editar
                    :dialogEditar="dialogEditar"
                    :value="tarefa"
                    @editarTarefa="handleAbrirDialogEditar(id)"
                    @limparInput="() => tarefa = ''"
                  />
                </div>
              </v-col>
              <v-col
                v-else
                cols="12"
              >
                <span 
                  v-text="'Sem tarefas'"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mixins } from "vue-class-component"
  import { Component } from "vue-property-decorator"
  import { post, remove } from "@/plugins/helpers/useBd"
  import { namespace } from "vuex-class"
  import MixinsSalvarNoCacheTarefas from "@/plugins/mixins/MiximSalvarNoCache"

  const tarefaStore = namespace("tarefaStore")

  @Component({
    components: {
      CardProduct: () => ({
        component: import(
          /* webpackChunkName: "tarefas-component" */
          /* webpackMode: "eager" */
          "@/components/cards/cards-tarefa/CardsTarefa.vue"
        )
      }),
      DialogEditar: () => ({
        component: import(
           /* webpackChunkName: "dialogEditar-component" */
          /* webpackMode: "eager" */
          "@/components/dialogs/dialog-editar/DialogEditar.vue"
        )
      })
    }
  })

  export default class Home extends mixins(
    MixinsSalvarNoCacheTarefas
  ) {
    
    @tarefaStore.Getter("verTodasTarefas") getTodasTarefas
    @tarefaStore.Getter("verTodosStates") getTodosStates


    novaTarefa = {
      tarefa: '',
      concluido: false
    }
    dialogEditar = false

    mounted() {
      this.listarTarefas()
      console.log("home", this.getTodasTarefas)
      console.log("todos-States", this.getTodosStates.lista)
    }

    async handleAdicionarTarefa() {
      try {
        await post("tarefas", this.novaTarefa)
        this.novaTarefa.tarefa = ""
        this.listarTarefas()
        return "Tarefa adicionada com sucesso!"
      } catch {
        console.log("Error ao adiocionar a tarefa!")
      }
    }

    async handleDeletarTarefa(id) {
      await remove("tarefas", id)
      this.$router.go()
      return "Produto Removido com sucesso!"
    }


    handleAbrirDialogEditar(id) {
      return this.getTodosStates.tarefas.filter(item => {
        if (item.id === id) {
          localStorage.setItem("editar-pelo-id", {
            id: item.id
          })
          this.novaTarefa.tarefa = item.tarefa
          this.dialogEditar = true
        }
      })
    }
  }
</script>
