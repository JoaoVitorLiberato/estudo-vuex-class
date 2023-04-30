<template>
  <v-responsive
    max-width="100%"
  >
    <v-card
      :class="$vuetify.breakpoint.xsOnly ? 'my-4 py-4' : 'my-1 py-2'"
      outlined
    >
      <v-row>
        <v-col
          cols="12"
        >
          <v-row
            :wrap="$vuetify.breakpoint.xsOnly"
            justify="center"
            align="center"
            class="pl-3"
          >
            <v-col
              cols="1 pa-0"
              class="pl-4"
              :hidden="$vuetify.breakpoint.xsOnly"
            >
              <v-checkbox
                v-model="concluido"
              />
            </v-col>
            <v-col
              cols="9 pa-0"
            >
              <span 
                v-text="tarefa"
              />
            </v-col>
            <v-col
              cols="2 pa-0"
              class="fix-content-btn d-flex justify-center"
            >
              <v-btn
                text
                @click="$emit('editarTarefa')"
              >
                <v-icon
                  color="primary"
                >
                  mdi-pencil
                </v-icon>
              </v-btn>
              <v-btn
                text
                @click="$emit('deletarTarefa')"
              >
                <v-icon
                  color="red darken-1"
                >
                  mdi-delete
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-responsive>
</template>

<style lang="stylus" scoped>
  .fix-content-btn
    .v-btn
      min-width: 35px
      padding: 0
</style>

<script>
  import { mixins } from "vue-class-component"
  import { Component, Prop, Emit } from "vue-property-decorator"

  @Component({})

  export default class CardsProduct extends mixins() {
    @Emit('deletarTarefa')
    @Emit('editarTarefa')
    @Prop({ default: "" }) tarefa
    @Prop({ default: false }) concluido
  }
</script>