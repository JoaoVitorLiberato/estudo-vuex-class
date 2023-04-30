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
                    @editarTarefa="handleAbrirDialogEditar(id)"
                    @deletarTarefa="handleDeletarTarefa(id)"
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
        <dialog-editar
          :value="novaTarefa.tarefa"
          :dialogEditarTarefas="dialogEditar"
          @change="() => dialogEditar = false"
          @limparInput="() => this.novaTarefa.tarefa = ''"
          @changeUpdate="handleEditarTarefas(tarefaID)"
        />
    </v-row>
  </v-container>
</template>

<script>
  import { mixins } from "vue-class-component"
  import { Component, Vue } from "vue-property-decorator"
  import { post, remove, update } from "@/middlewares/useBd"
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


    novaTarefa = {
      tarefa: '',
      concluido: false
    }

    dialogEditar = false
    tarefaID = 0

    mounted() {
      this.listaDeTarefas()
    }

    async handleAdicionarTarefa() {
      try {
        const PAYLOAD = require("@/data/tarefa/tarefa.json")

        Vue.set(PAYLOAD, "tarefa", this.novaTarefa.tarefa)
        Vue.set(PAYLOAD, "concluido", this.novaTarefa.concluido)

        await post("tarefas", PAYLOAD)
        this.novaTarefa.tarefa = ""
        this.listaDeTarefas()
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

    async handleAbrirDialogEditar(id) {
      const response = await this.pegarTodasTarefasBD()
      response.filter(item => {
        if(item.id === id) {
          this.tarefaID = item.id
          this.novaTarefa.tarefa = item.tarefa
          return this.dialogEditar = true
        }
      })
    }

    async handleEditarTarefas(id) {
      const PAYLOAD = require("@/data/tarefa/tarefa.json")

      Vue.set(PAYLOAD, "tarefa", this.novaTarefa.tarefa)
      await update("tarefas", this.novaTarefa, id)
      console.log("Tarefa Editada com sucesso!")

      this.listaDeTarefas()
      
      return this.dialogEditar = false
    }
  }
</script>
