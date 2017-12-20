<template>
  <v-container fluid style="height: 100%">
      <v-layout row style="height: 100%">
          <v-flex xs10 order-md3 order-xs2 id="body_view">
               <v-tabs dark fixed centered class="mt-2" style="height: 100%">
                  <v-tabs-bar class="primary">
                    <v-tabs-slider class="white"></v-tabs-slider>
                    <v-tabs-item
                      v-for="i in itemsz"
                      :key="i"
                      :href="'#tab-' + i"
                      id="tab-item"
                    >
                      {{ i }}
                    </v-tabs-item>
                  </v-tabs-bar>
                  <v-tabs-content
                    id="tab-General Settings"
                  >
                    <v-card flat style="height: 100%">
                    <GeneralAppearance />
                  </v-card>
                  </v-tabs-content>
                  <v-tabs-content
                    style="height: 100%"
                    id="tab-Landing Page"
                  >
                    <v-card flat style="height: 100%">
                    <LandingAppearance />
                    <Landing :settings="pages.landing_pages" />
                  </v-card>
                  </v-tabs-content>
                   <v-tabs-content
                    style="height: 100%"
                    id="tab-Opportunity Page"
                  >
                    <v-card flat style="height: 100%">
                      <Opportunities :settings="pages.opportunities" />
                  </v-card>
                  </v-tabs-content>
                  <v-tabs-content
                    style="height: 100%"
                    id="tab-Directory Page"
                  >
                    <v-card flat style="height: 100%">
                      <Directory :settings="pages.directory" />
                  </v-card>
                  </v-tabs-content>
                  <v-tabs-content
                    style="height: 100%"
                    id="tab-History Page"
                  >
                    <v-card flat style="height: 100%">
                      <History :settings="pages.history" />
                  </v-card>
                  </v-tabs-content>
                </v-tabs>
                </v-tabs>
                <!-- <v-card flat>
                  <Opportunities :settings="pages.opportunities" />
                </v-card>
                <v-card flat>
                  <Directory :settings="pages.directory" />
                </v-card>
                <v-card flat>
                  <History :settings="pages.history" />
                </v-card> -->
          </v-flex>
          <v-flex xs2 order-md1 order-xs3 class="ml-0">
            <AdminSideBarMenu />
          </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
  import Landing from './Pages/landing.vue'
  import LandingAppearance from './Appearance/landing.vue'
  import GeneralAppearance from './Appearance/general.vue'
  import Opportunities from './Pages/opportunities.vue'
  import Directory from './Pages/directory.vue'
  import History from './Pages/history.vue'
  import NavBar from './Components/NavBar.vue'
  import MainMenu from '../../../components/main-menu/MainMenuComponent.vue'
  import UserToolbar from '../../../components/Toolbar.vue'
  import AdminSideBarMenu from './Components/AdminSideBar.vue'

  export default {
    components: {
      Landing,
      LandingAppearance,
      GeneralAppearance,
      NavBar,
      MainMenu,
      AdminSideBarMenu,
      UserToolbar,
      Opportunities,
      Directory,
      History
    },
    computed: {
      pages () {
        console.log(this.$store.getters.getPages, 'sisjisk')
        return this.$store.getters.getPages
      }
    },
    data: () => ({
      drawer: true,
      h1: window.title,
      itemsz: ['General Settings', 'Landing Page', 'Opportunity Page', 'Directory Page', 'History Page'],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }),
    methods: {
      onDismiss () {
        this.$store.dispatch('setError', null)
        this.$store.dispatch('setProcess', 'null')
      },
      triggerDrawer () {
        this.drawer = !this.drawer
      }
    }
  }
</script>
<style>
  .navigation-drawer {
    position: fixed;
  }
  #tab-item {
  min-width: 18px;
  font-size: 12px;
}
#body_view {
    margin-top: 40px;
  }
</style>
