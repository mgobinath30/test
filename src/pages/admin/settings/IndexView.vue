<template>
  <v-container fluid style="height: 100%">
      <v-layout row style="height: 100%">
          <v-flex xs11 order-md2 order-xs2>
            <div id="stats">
            <v-layout row wrap>
              <v-flex id="stat" xs2 v-for="i in 4" :key="i">
                <v-card light class="white">
                  <v-card-title>
                    <div class="stat_title">
                      <h4 class="headline">Website Traffics</h4>
                      <v-divider></v-divider>
                    </div>
                  </v-card-title>
                  <v-layout row wrap>
                    <v-flex xs6>
                      <v-card class="pl-1" light flat>
                        <b><span>Month-to-Date</span></b>
                        <p><h5> 10,000 </h5></p>
                        <!-- <v-icon dark left>report_problem</v-icon> -->
                        <p class="px-0 green--text">
                          12%
                        </p>
                      </v-card>
                    </v-flex>
                    <v-flex xs6>
                      <v-card class="pl-1" light flat>
                        <b><span>Month-to-Date</span></b>
                        <p><h5> 10,000 </h5></p>
                        <!-- <v-icon dark left>report_problem</v-icon> -->
                        <p class="px-0 green--text">
                          12%
                        </p>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
            </div>
            <chart-view></chart-view>
               <v-card class="mt-5">
                <v-flex xs12>
                  <v-card flat>
                     <block />
                  </v-card>
                </v-flex>
                 <v-flex xs12>
                  <v-card flat>
                     <block1 />
                  </v-card>
                </v-flex>
              </v-card>
          </v-flex>
          <v-flex xs2 order-md1 order-xs3 class="mr-3 ml-0">
            <AdminSideBarMenu />
          </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
  import VueHighcharts from 'vue2-highcharts'
  import MainMenu from '../../../components/main-menu/MainMenuComponent.vue'
  import Block from './Index/block.vue'
  import Block1 from './Index/block.1.vue'
  import UserToolbar from '../../../components/Toolbar.vue'
  import AdminSideBarMenu from './Components/AdminSideBar.vue'
  import ChartView from './chart'

  export default {
    components: {
      MainMenu,
      Block,
      Block1,
      AdminSideBarMenu,
      UserToolbar,
      VueHighcharts,
      ChartView
    },
    data: () => ({
      drawer: true,
      loading: false,
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
   #stats {
    color: #fff;
    text-align: center;

  }

  #stats #stat {
    margin-bottom: 26px;
    margin-top: 70px;
    margin-right: 20px;
    max-width: 400px !important;
  }
  .stat_title {
    width: 100%;
    text-align: left;
  }
  .stat_title > h4 {
    line-height: 15px !important;
  }
</style>
