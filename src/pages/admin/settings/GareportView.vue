<template>
  <v-container fluid style="height: 100%">
      <v-layout row style="height: 100%">
          <v-flex xs11 order-md2 order-mt6 order-xs2>
            
            <chart-view></chart-view>
               
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
  import ChartView from './gchart'

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
  .float-leftx{
  float:left;
  width:100%;
  
  }
  #tab2,#tab3,#tab4,#tab5,#tab6, #tab7, #tab8,#tab9{
  display:none;
  text-align:center;
  }
  .hidden-table{
  display:none;
  }
  .btn-analytics{
  height: 60px;
    width: 30%;
  }
  .menu.left-float{
  float:right;
  }
  .error {
    background-color: #d50000 !important;
    border-color: #d50000 !important;
}
#hidden-table1 h4{
text-align:center;
}
.highcharts-color-0{
fill: #31572c !important;
}
.highcharts-color-0 .highcharts-point{
fill: #31572c !important;
}
  .tabsx{
  background: #424242;
    padding: 10px;
    width: 38% !important;
    border-radius: 5px;
    margin-left: 10px !important;
    margin-right: 10px !important;
    text-align: center;
  }
  .primary {
    background-color: #31572c !important;
    border-color: #31572c !important;
}
  th,td{
  text-align:left;
  }
 .order-mt6{
 margin-top:64px;
 }
 
 #tab4 table td,th{ 
 border:1px solid #ccc;
 }
 #tab4 table{
 width: 50%;
 margin: 0 auto
 }
 #tab3 table td,th{ 
 border:1px solid #ccc;
 }
 #tab3 table{
 width: 50%;
 margin: 0 auto
 }
  #tab5 table td,th{ 
 border:1px solid #ccc;
 }
 #tab5 table{
 width: 50%;
 margin: 0 auto
 }
 #tab6 table td,th{ 
 border:1px solid #ccc;
 }
 #tab6 table{
 width: 50%;
 margin: 0 auto
 }
 #tab7 table td,th{ 
 border:1px solid #ccc;
 }
 #tab7 table{
 width: 50%;
 margin: 0 auto
 }
 #tab8 table td,th{ 
 border:1px solid #ccc;
 }
 #tab8 table{
 width: 50%;
 margin: 0 auto
 }
 #tab9 table td,th{ 
 border:1px solid #ccc;
 }
 #tab9 table{
 width: 50%;
 margin: 0 auto
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
  
  
 .pie-top
  {
  padding-bottom: 1195px;
  height: auto;
  }
  

  
  
</style>
