<template>
  <v-app>
    <v-app-bar
      app
      flat
      :class="$vuetify.breakpoint.smAndDown ? 'd-flex justify-center' : 'd-flex justify-end'"
    >

      <v-responsive
        max-width="600"
      >
        <v-text-field
          v-model="search"
          dense
          flat
          hide-details
          rounded
          solo-inverted
          :append-icon="search === '' ? 'mdi-magnify' : 'mdi-window-close'"
          @click:append="handleCleanSearch"
        />
      </v-responsive>
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

  export default class App extends mixins() {
    search = ""

    handleCleanSearch() {
      if( this.search !== "" ) {
        this.search = ""
      }
    }
  }
</script>
