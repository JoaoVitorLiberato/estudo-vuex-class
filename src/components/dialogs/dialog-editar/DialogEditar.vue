<template>
  <v-dialog
    v-model="dialogEditarTarefas"
    width="500"
  >
    <v-card>
      <v-card-title 
        class="grey lighten-2 p-0"
      >
        <h4
          class="text-uppercase font-weight-bold"
          v-text="'Editar Tarefas'"
        />
        <v-spacer />
        <v-btn
          text
          plain
          @click="$emit('change')"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </v-card-title> 
    
      <v-divider></v-divider>
  
      <v-row
        class="px-2"
      >
        <v-col
          cols="12"
          class="mt-5"
        >
          <v-text-field
            v-model="setValue"
            :value="setValue"
            label="Edite sua tarefa"
            outlined
          />
        </v-col>
      </v-row>
  
      <v-card-actions>
        <v-btn
          color="primary"
          text
          @click="$emit('limparInput')"
        >
          Limpar input
        </v-btn>
        <v-spacer />
        <v-btn
          color="primary"
          text
          @click="$emit('changeUpdate')"
        >
          Editar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mixins } from "vue-class-component"
  import { Component, ModelSync, PropSync } from "vue-property-decorator"

  @Component({})

  export default class DialogEditar extends mixins() {
    @ModelSync('dialogEditarTarefas', 'change', { default: false }) setDialogEditar
    @ModelSync('update', 'changeUpdate', { default: true }) setUpdate
    @ModelSync('valueInput', 'limparInput', { type: String }) setValueInput
    @PropSync("value", { type: String}) setValue
  }

</script>