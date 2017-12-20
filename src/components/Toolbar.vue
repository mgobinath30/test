<template>
  <v-toolbar class="toolbar" fixed light flat>

    <v-toolbar-side-icon @click.stop="toggleSidebar" style="color: rgb(170,170,170);">

    </v-toolbar-side-icon>
    <v-toolbar-title>
      {{title}}
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon style="color: rgb(170,170,170);" class="hidden-sm-and-down">help</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon style="color: rgb(170,170,170);"  class="hidden-sm-and-down">settings</v-icon>
    </v-btn>
    <toolbar-menu></toolbar-menu>
  </v-toolbar>

</template>

<script>
  import ToolbarMenu from './toolbar-menu/ToolbarMenuComponent.vue'
  export default {
    components: {
      ToolbarMenu
    },
    props: ['title'],
    data () {
      return {
        drawer: true
      }
    },
    computed: {
      client () {
        return this.$store.getters.getClientDetails
      },
      user () {
        return this.$store.getters.getUserDetails
      }
    },
    methods: {
      toggleSidebar  () {
        this.$store.commit('toggleSidebar', !this.$store.getters.getSidebar.active)
      }
    }
  }
</script>

<style>
  .toolbar  {
    border-style: none;
    border-bottom: thin solid #d1d0cf;
    border-bottom-width: 2px;
  }

  .toolbar-icon {
    color: rgb(170,170,170);
  }
</style>
