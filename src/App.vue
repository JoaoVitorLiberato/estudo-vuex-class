<template>
  <v-app>
    <v-app-bar
      app
      flat
      :class="$vuetify.breakpoint.smAndDown ? 'd-flex justify-center' : 'd-flex justify-start'"
    >
      <h2
        class="text-uppercase"
        v-text="'Lista de Tarefas'"
      />
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>


<script>
  import { mixins } from "vue-class-component"
  import { Component } from "vue-property-decorator"

  @Component({})

  export default class App extends mixins() {}
</script>
