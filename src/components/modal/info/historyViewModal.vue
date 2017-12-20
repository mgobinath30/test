<template>
  <v-dialog v-model="openModal" lazy max-width="700px" persistent :fullscreen="screenWidth<600" transition="scale-transition">
    <v-card>
      <v-tabs class="pd-0" :scrollable="false" dark fixed centered v-model="active">
          <v-tabs-bar class="header light-green darken-4">
            <v-tabs-slider class="white"></v-tabs-slider>
            <v-tabs-item
              href="#info-1"
            >
              Basic details
            </v-tabs-item>
            <v-tabs-item
              href="#info-2"
              @click="initialChartLoad"
            >
              Analytics
            </v-tabs-item>
            <v-btn icon @click.native="cancel" style="float:right">
                <v-icon dark>cancel</v-icon>
            </v-btn>
          </v-tabs-bar>
        <v-card-text class="px-0 pt-0">
          <v-tabs-content id="info-1" style="padding:16px">
            <v-layout row wrap>
                <v-flex md12 xs12 class="mb-3">
                    <span style="font-size: 16px">{{ item.vendorname }}</span>
                </v-flex>
                <!--<v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>Vendor Address:<br/> </b>{{ item.majagencycat }}</span>
                    </div>
                </v-flex>-->
                 <v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>Vendor Address:<br/> </b>{{ item.vendoraddress }}</span>
                    </div>
                </v-flex>
                 <v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>Phone Number:<br/> </b>{{ item.phonenumber }}</span>
                    </div>
                </v-flex>
                <v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>Agency Category:<br/> </b>{{ item.majagencycat }}</span>
                    </div>
                </v-flex>
                <v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>Contracting office agency id:<br/> </b>{{ item.contractingofficeagencyid }}</span>
                    </div>
                </v-flex>
                <v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>Subcontract Plan:<br/> </b>{{ item.subcontractplan === '' ? 'Not assigned' : item.subcontractplan }}</span>
                    </div>
                </v-flex>
                <v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>Signed Date:<br/> </b>{{ item.signeddate === '' ? 'Not assigned' : item.signeddate }}</span>
                    </div>
                </v-flex>
                 <v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>Solicitation Procedures:<br/> </b>{{ item.naicscode }}: {{ item.naicsdescription }}</span>
                    </div>
                </v-flex>
                 <v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>Current completion date:<br/> </b>{{ item.currentcompletiondate }}</span>
                    </div>
                </v-flex>
                <v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>Contractaction type:<br/> </b>{{ item.contractactiontype }}</span>
                    </div>
                </v-flex>
                 <v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>Set Aside:<br/> </b>{{ item.typeofsetaside === '' ? 'Not Assigned' : item.typeofsetaside }}</span>
                    </div>
                </v-flex>
               <v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>Type of contract pricing:<br/> </b>{{ item.typeofcontractpricing }}</span>
                    </div>
                </v-flex>
                <v-flex md6 xs12 class="mb-3"> 
                    <div>
                        <span><b>Fiscal Year:<br/> </b>{{ item.fiscalyear === '' ? 'Not assigned' : item.fiscalyear }}</span>
                    </div>
                </v-flex>
                <v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>NAICS:<br/> </b>{{ item.naicscode }}: {{ item.naicsdescription }}</span>
                    </div>
                </v-flex>
          
                <v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>PSC:<br/> </b>{{ item.psccode === '' ? 'Not assigned' : item.psccode }}</span>
                    </div>
                </v-flex>
                <v-flex md6 xs12 class="mb-3">
                   <div>
                        <span><b>Place of performance:<br/> </b>{{ item.popstatecode === '' ? 'Not assigned' : item.popstatecode }}</span>
                    </div>
                </v-flex>
                 <v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>PSC Description:<br/> </b>{{ item.pscdescription }}</span>
                    </div>
                </v-flex>
                <v-flex md12 xs12 class="mb-3">
                    <div>
                        <span><b>Description:<br/> </b><p>{{ item.descriptionofcontractrequirement === '' ? 'Not assigned' : item.descriptionofcontractrequirement }}</p></span>
                    </div>
                </v-flex>
            </v-layout>
          </v-tabs-content>
          <v-tabs-content
            id="info-2"
            style="padding-top:16px; max-height: 450px; overflow-x: hidden"
          >
            <v-layout justify-center row wrap>
                <v-flex md4 class="">
                    <v-select
                      return-object
                      v-model="filter"
                      class="pt-0 mt-0"
                      :items="[
                        { text: 'Display data by NAICS', value: 'naics' },
                        { text: 'Display data by PSC', value: 'psc' }
                      ]"
                    />
                </v-flex>
            </v-layout>
            <v-layout class="blue-grey lighten-4" style="padding:16px" row wrap>
                <v-flex md4>
                    <b>2017 AWARDS DATA<br/> BY NAICS {{ item.naicscode }}</b>
                </v-flex>
                <v-flex md4>
                    <span style="text-align:center">
                        <span style="font-size: 12px">AVG. AWARD AMOUNT</span><br/>
                        <b style="font-size: 14px">${{ averageAwardAmount }}</b>
                    </span>
                </v-flex>
                <v-flex md4>
                    <span style="text-align:center">
                        <span>NUMBER OF AWARDS</span><br/>
                        <b>{{ totalNumberOfAwards }}</b>
                    </span>
                </v-flex>
            </v-layout>
            <v-layout style="padding:16px" row wrap>
                <v-flex md6>
                    <vue-highcharts :options="columnChart1" ref="columnChartRef1"/>
                </v-flex>
                <v-flex md6>
                    <vue-highcharts style="float: right" :options="columnChart2" ref="columnChartRef2"/>
                </v-flex>
            </v-layout>
            <v-layout style="padding:16px" row wrap>
                <v-flex md6>
                    <vue-highcharts :options="pieChart1" ref="pieChartRef1"/>
                </v-flex>
                <v-flex md6>
                    <vue-highcharts style="float: right" :options="pieChart2" ref="pieChartRef2"/>
                </v-flex>
            </v-layout>
          </v-tabs-content>
        </v-card-text>
      </v-tabs>
      <v-card-actions class="grey lighten-2">
        <v-layout justify-space-around >
            <span class="group">
                <!-- <v-btn flat><v-icon medium>mdi-heart</v-icon></v-btn> -->
                <v-tooltip top>
                    <v-btn flat slot="activator"><v-icon medium>share</v-icon></v-btn>
                    <span>Share</span>
                </v-tooltip>
                <v-tooltip top>
                    <v-btn flat slot="activator"><v-icon medium>search</v-icon></v-btn>
                    <span>Find Contractor</span>
                </v-tooltip>
            </span>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style>
    .group {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        -ms-flex-pack: distribute;
        justify-content: space-around;
    }
    .tabs__wrapper {
      overflow: hidden;
    }
</style>


<script>
import VueHighcharts from 'vue2-highcharts'
import 'mdi/css/materialdesignicons.min.css'

// VueHighcharts.methods.prototype.setTitle = function (val) {
//   console.log(val, 'tried setting title')
// }

export default {
  components: {
    VueHighcharts
  },
  props: ['dialog', 'item'],
  data () {
    return {
      openModal: this.$props.dialog,
      active: '',
      totalNumberOfAwards: 0,
      averageAwardAmount: 0,
      columnChart1: {
        chart: {
          type: 'column',
          width: 300,
          height: 250
        },
        lang: {
          noData: 'No data to display'
        },
        legend: {
          enabled: false
        },
        xAxis: {
          visible: false,
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
          visible: false
        },
        plotOptions: {
          series: {
            borderRadius: 7
          }
        },
        title: {
          text: ''
        },
        series: []
      },
      columnChart2: {
        chart: {
          type: 'column',
          width: 300,
          height: 250
        },
        legend: {
          enabled: false
        },
        xAxis: {
          visible: false,
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
          visible: false
        },
        plotOptions: {
          series: {
            borderRadius: 7
          }
        },
        title: {
          text: ''
        },
        series: []
      },
      pieChart1: {
        chart: {
          type: 'pie',
          width: 300,
          height: 250
        },
        plotOptions: {
          pie: {
            dataLabels: {
              enabled: false
            },
            innerSize: 90
          }
        },
        title: {
          text: ''
        },
        series: [{
          data: [
            ['Firefox', 44.2],
            ['IE7', 26.6],
            ['IE6', 20],
            ['Chrome', 3.1],
            ['Other', 5.4]
          ]
        }]
      },
      pieChart2: {
        chart: {
          type: 'pie',
          width: 300,
          height: 250
        },
        plotOptions: {
          pie: {
            dataLabels: {
              enabled: false
            },
            innerSize: 90
          }
        },
        title: {
          text: ''
        },
        series: [{
          data: [
            ['Firefox', 44.2],
            ['IE7', 26.6],
            ['IE6', 20],
            ['Chrome', 3.1],
            ['Other', 5.4]
          ]
        }]
      },
      filter: { text: 'Display data by NAICS', value: 'naics' },
      selectedFilter: {},
      items: [
        {
          id: 1,
          text: 'Basic details'
        },
        {
          id: 2,
          text: 'Analytics'
        }]
    }
  },
  watch: {
    dialog () {
      this.openModal = this.dialog
      this.active = 'info-1'
    },
    filter (val) {
      const { columnChartRef1, columnChartRef2, pieChartRef1, pieChartRef2 } = this.$refs
      columnChartRef1.delegateMethod('showLoading', 'Loading...')
      columnChartRef2.delegateMethod('showLoading', 'Loading...')
      pieChartRef1.delegateMethod('showLoading', 'Loading...')
      pieChartRef2.delegateMethod('showLoading', 'Loading...')
      if (val.value === 'naics') {
        this.selectedFilter = {
          text: 'NAICS',
          value: this.item.naicscode
        }
        this.$store.dispatch('getContractHistoryAnalytics', { naics: this.item.naicscode })
          .then(res => {
            columnChartRef1.hideLoading()
            columnChartRef2.hideLoading()
            pieChartRef1.hideLoading()
            pieChartRef2.hideLoading()
            this.renderCharts()
          })
      }
      if (val.value === 'psc') {
        this.selectedFilter = {
          text: 'PSC',
          value: this.item.psccode
        }
        this.$store.dispatch('getContractHistoryAnalytics', { psc: this.item.psccode })
          .then(res => {
            columnChartRef1.hideLoading()
            columnChartRef2.hideLoading()
            pieChartRef1.hideLoading()
            pieChartRef2.hideLoading()
            this.renderCharts()
          })
      }
    }
  },
  mounted () {
    this.$store.dispatch('getContractHistoryAnalytics')
  },
  methods: {
    calculateNumberOfAwards () {
      const fiscalYear = new Date().getFullYear()
      const fiscalYearIndex = this.historyAnalytics.count.month_wise.labels.findIndex(val => {
        if (val.indexOf(fiscalYear) === 0) {
          return true
        }
        return false
      })
      const total = this.historyAnalytics.count.month_wise.data.splice(fiscalYearIndex).reduce((acc, val) => {
        return Number(acc) + Number(val)
      })
      this.totalNumberOfAwards = total
    },
    calculateAverageAwardAmount () {
      const fiscalYear = new Date().getFullYear()
      const fiscalYearIndex = this.historyAnalytics.amount.month_wise.labels.findIndex(val => {
        if (val.indexOf(fiscalYear) === 0) {
          return true
        }
        return false
      })
      const average = this.historyAnalytics.amount.month_wise.data.splice(fiscalYearIndex).reduce((acc, val) => {
        return Number(acc) + Number(val)
      })
      this.averageAwardAmount = average
    },
    renderCharts () {
      this.columnCharts()
      this.pieCharts()
      this.calculateNumberOfAwards()
      this.calculateAverageAwardAmount()
    },
    initialChartLoad () {
      const { columnChartRef1, columnChartRef2, pieChartRef1, pieChartRef2 } = this.$refs
      columnChartRef1.delegateMethod('showLoading', 'Loading...')
      columnChartRef2.delegateMethod('showLoading', 'Loading...')
      pieChartRef1.delegateMethod('showLoading', 'Loading...')
      pieChartRef2.delegateMethod('showLoading', 'Loading...')
      this.selectedFilter = {
        text: 'NAICS',
        value: this.item.naicscode
      }
      this.$store.dispatch('getContractHistoryAnalytics', { naics: this.item.naicscode })
        .then(res => {
          columnChartRef1.hideLoading()
          columnChartRef2.hideLoading()
          pieChartRef1.hideLoading()
          pieChartRef2.hideLoading()
          this.renderCharts()
        })
    },
    columnCharts () {
      const { columnChartRef1, columnChartRef2 } = this.$refs
      columnChartRef1.delegateMethod('setTitle', { text: `${this.selectedFilter.text} ${this.selectedFilter.value}: Award Amount History` })
      columnChartRef2.delegateMethod('setTitle', { text: `${this.selectedFilter.text} ${this.selectedFilter.value}: Number of Awards` })
      columnChartRef1.removeSeries()
      columnChartRef2.removeSeries()
      const fiscalYear = new Date().getFullYear()
      const fiscalYearIndex = this.historyAnalytics.amount.month_wise.labels.findIndex(val => {
        if (val.indexOf(fiscalYear) === 0) {
          return true
        }
        return false
      })
      columnChartRef1.getChart().xAxis[0].setCategories(this.historyAnalytics.amount.month_wise.labels.slice(fiscalYearIndex))
      columnChartRef2.getChart().xAxis[0].setCategories(this.historyAnalytics.count.month_wise.labels.slice(fiscalYearIndex))
      columnChartRef1.addSeries({
        data: this.historyAnalytics.amount.month_wise.data.slice(fiscalYearIndex)
      })
      columnChartRef2.addSeries({
        data: this.historyAnalytics.count.month_wise.data.slice(fiscalYearIndex)
      })
    },
    pieCharts () {
      const { pieChartRef1, pieChartRef2 } = this.$refs
      pieChartRef1.delegateMethod('setTitle', { text: `${this.selectedFilter.text} ${this.selectedFilter.value}: Award Amount History by Agency` })
      pieChartRef2.delegateMethod('setTitle', { text: `${this.selectedFilter.text} ${this.selectedFilter.value}: Number of Awards by Agency` })
      pieChartRef1.removeSeries()
      pieChartRef2.removeSeries()
      pieChartRef1.addSeries({
        data: this.historyAnalytics.amount.agency_dsitribution
      })
      pieChartRef2.addSeries({
        data: this.historyAnalytics.count.agency_dsitribution
      })
    },
    cancel () {
      this.openModal = false
      this.$parent.$emit('cancel')
    }
  },
  computed: {
    screenWidth () {
      return Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    },
    historyAnalytics () {
      return this.$store.getters.tableAnalytics.history
    }
  }
}
</script>
