<template>
  <v-app id="app" toolbar fill-height :style="[baseStyles]">
      <main-navigation :drawer="drawer" v-if="path!='/'"></main-navigation>
      <user-toolbar :drawer="drawer" :title="h1" v-if="path!='/'"></user-toolbar>

      <v-progress-linear v-bind:indeterminate="true" style="z-index:4;position:fixed;top:0;left:0;margin-top: -1px;" v-if="this.$store.getters.getInitializing" class="datatable__progress" height="3"></v-progress-linear>
      <main>
        <v-content fill-height id="content_area">
          <router-view  v-if="!this.$store.getters.getInitializing"></router-view>
        </v-content>
      </main>
      <v-snackbar
        bottom
        multi-line
        v-model="this.$store.getters.getSnackbar.active"
      >
        {{ this.$store.getters.getSnackbar.text }}
        <v-btn flat class="pink--text" @click.native="closeSnackbar()">Close</v-btn>
      </v-snackbar>

      <ui-dialog :persistent="true"></ui-dialog>
      <create-group-modal />
      <!-- <sidebox-chat :show="false" /> -->
  </v-app>
</template>

<script>
  import MainNavigation from './components/main-menu/MainMenuComponent.vue'
  import UserToolbar from './components/Toolbar.vue'
  import CreateGroupModal from './components/modal/createGroup.vue'
  import UiDialog from './components/ui/Dialog.vue'
  export default {
    components: {
      MainNavigation,
      UserToolbar,
      CreateGroupModal,
      UiDialog
    },
    data () {
      return {
        drawer: true,
        dialog: true
      }
    },
    computed: {
      h1 () {
        return this.$store.getters.getRouteDetails.current.meta.h1
      },
      path () {
        return this.$store.getters.getRouteDetails.current.path
      },
      bg () {
        return this.$store.getters.getSettings.styles.general.background_color
      },
      baseStyles () {
        return {
          backgroundColor: this.$store.getters.getSettings.styles.general.background_color.toString() || '#fff',
          color: this.$store.getters.getSettings.styles.general.font_color,
          fontFamily: this.$store.getters.getSettings.styles.general.font_types,
          fontSize: this.$store.getters.getSettings.styles.general.font_size
        }
      },
      user () {
        return this.$store.getters.getUserDetails
      }
    },
    methods: {
      closeSnackbar () {
        this.$store.dispatch('triggerSnackbar', {active: false, text: ''})
      },
      routeRedirect () {
        console.log('asd')
      }
    },
    watch: {
      'baseStyles': function () {
        console.log('changes made')
      }
    }
  }
</script>


<style lang="stylus">
  @import './stylus/main'

  body
    font-family: 'Montserrat', sans-serif

  .container
    overflow-y:hidden;

  a:hover
    text-decoration: none;
  #app {
    width: 100%;
  }
  #fluid {
    position: absolute !important;
    height: 100% !important;
  }

   #body_view {
    margin-top: 40px;
  }
  thead {
    text-indent: 9px;
  }
</style>
