<template>
  <v-container fluid style="height: 100%">
      <v-layout row style="height: 100%">
          <v-flex xs10 order-md2 order-xs2 id="body_view">
              <v-card style="height: 100%">
                <v-toolbar class="white elevation-0">
                  <v-toolbar-title class="">
                    Manage Requests
                  </v-toolbar-title>
                </v-toolbar>
                 <v-card-text>
                  Welcome, Feel free to change the logo, color and font styles for your platform
                </v-card-text>
                <v-flex xs12 class="mt-3">
                  <v-card flat>
                       <v-tabs dark fixed centered class="mt-2">
                        <v-tabs-bar class="primary">
                          <v-tabs-slider class="white"></v-tabs-slider>
                          <v-tabs-item
                            v-for="(i, index) in itemsz"
                            :key="index"
                            :href="'#tab-' + i.tabId"
                          >
                            {{ i.name }}
                          </v-tabs-item>
                        </v-tabs-bar>
                        <v-tabs-content
                          id="tab-activity"
                        >
                        <activity />
                        </v-tabs-content>
                        <v-tabs-content
                          id="tab-events"
                        >
                        <events />
                        </v-tabs-content>
                        <v-tabs-content
                          id="tab-companies"
                        >
                        <company />
                        </v-tabs-content>
                        <v-tabs-content
                          id="tab-groups"
                        >
                        <groups />
                        </v-tabs-content>
                      </v-tabs>
                  </v-card>
                </v-flex>
              </v-card>

          </v-flex>
          <v-flex xs2 order-md1 order-xs3 class="ml-0">
            <AdminSideBarMenu />
          </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
  import Activity from './Request/activity.vue'
  import Groups from './Request/groups.vue'
  import Events from './Request/events.vue'
  import Company from './Request/company.vue'
  import MainMenu from '../../../components/main-menu/MainMenuComponent.vue'
  import UserToolbar from '../../../components/Toolbar.vue'
  import AdminSideBarMenu from './Components/AdminSideBar.vue'

  export default {
    components: {
      Activity,
      Groups,
      Events,
      Company,
      MainMenu,
      AdminSideBarMenu,
      UserToolbar
    },
    mounted () {
    },
    data: () => ({
      drawer: true,
      itemsz: [
        {
          name: 'Activity Stream',
          tabId: 'activity'
        },
        {
          name: 'Events',
          tabId: 'events'
        },
        {
          name: 'Company Submission',
          tabId: 'companies'
        },
        {
          name: 'Group Pages',
          tabId: 'groups'
        }
      ],
      h1: window.title
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
</style>