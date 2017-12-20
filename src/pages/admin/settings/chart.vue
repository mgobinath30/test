<template>
  <v-card>
    <v-toolbar class="white elevation-0">
        <v-layout row wrap class="mt-4">
        <v-flex xs12 sm12>
        Chart Section
        <v-btn
          v-for="(item, i) in menuItems"
          v-bind:key="i"
          round
          @click.stop="changeMetrics(item.value)"
          :color="currentMetric === item.value ? 'primary' : 'secondary'"
          class="white--text"
          dark
        >{{ item.title }}
        </v-btn>
        </v-flex>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        </v-layout>
    </v-toolbar>
    <v-container v-if="loading" fill-height>
        <v-layout row wrap align-center>
          <v-flex class="text-xs-center">
            <v-progress-circular indeterminate v-bind:size="50" color="primary"></v-progress-circular>
          </v-flex>
        </v-layout>
      </v-container>
    <v-layout v-if="!loading" row wrap align-center>
      <v-flex xs8 sm5 class="ml-4 mt-3">
          <v-menu
            lazy
            :close-on-content-click="false"
            v-model="menuStart"
            transition="scale-transition"
            offset-y
            :nudge-right="40"
            max-width="290px"
            min-width="290px"
            >
            <v-text-field
              slot="activator"
              label="Start Date"
              v-model="startDate"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="startDate" no-title scrollable autosave>
            </v-date-picker>
          </v-menu>
          <v-menu
            lazy
            :close-on-content-click="false"
            v-model="menuEnd"
            transition="scale-transition"
            offset-y
            :nudge-right="40"
            max-width="290px"
            min-width="290px"
            >
            <v-text-field
              slot="activator"
              label="End Date"
              v-model="endDate"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="endDate" no-title scrollable autosave>
            </v-date-picker>
          </v-menu>
        </v-flex>
      <v-flex xs12 class="mt-3">
        <v-card flat>
            <vue-highcharts :options="chart" ref="area"/>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>
<script>
  import VueHighcharts from 'vue2-highcharts'
  import axios from 'axios'
  import moment from 'moment'

  export default {
    components: {
      VueHighcharts
    },
    computed: {
      chart () {
        const self = this
        return {
          chart: {
            type: 'area'
          },
          title: {
            text: self[self.currentMetric].title
          },
          subtitle: {
            text: ''
          },
          xAxis: {
            allowDecimals: false,
            categories: this.categories,
            labels: {
              formatter: function () {
                return this.value // clean, unformatted number for year
              }
            }
          },
          yAxis: {
            title: {
              text: self[self.currentMetric].yAxis.title
            },
            labels: {
              formatter: function () {
                return this.value
              }
            }
          },
          tooltip: {
            pointFormat: self[self.currentMetric].tooltipText
          },
          plotOptions: {
            area: {
              pointStart: 0,
              marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                  hover: {
                    enabled: true
                  }
                }
              }
            }
          },
          series: [{
            name: self[self.currentMetric].seriesName,
            data: this.visits,
            color: '#205c43'
          }]
        }
      }
    },
    watch: {
      'endDate': function () {
        this.loadChartData()
      },
      'startDate': function () {
        this.loadChartData()
      }
    },
    mounted () {
      this.loadChartData()
    },
    data: () => ({
      menuItems: [
        {
          title: 'Traffic',
          value: 'traffic'
        },
        {
          title: 'New Users',
          value: 'newUsers'
        },
        {
          title: 'Time on Site',
          value: 'timeOnPage'
        },
        {
          title: 'Engagement',
          value: 'engagement'
        }
      ],
      currentMetric: 'traffic',
      traffic: {
        title: 'Exchange Traffic Analytics',
        subtitle: '',
        yAxis: {
          title: 'Numbers of page visits'
        },
        tooltipText: 'Website has <b>{point.y:,.0f}</b><br/>page visits',
        seriesName: 'Page Visit Analytics',
        metrics: 'ga:visits'
      },
      timeOnPage: {
        title: 'Exchange Time-on-site Analytics',
        subtitle: '',
        yAxis: {
          title: 'Time (in seconds)'
        },
        tooltipText: '<b>{point.y:,.0f}</b> seconds',
        seriesName: 'Time (in seconds) users spent on a particular page',
        metrics: 'ga:timeOnPage'
      },
      newUsers: {
        title: 'Exchange New Users Analytics',
        subtitle: '',
        yAxis: {
          title: 'Number of New Users'
        },
        tooltipText: '<b>{point.y:,.0f}</b> users',
        seriesName: 'Number of New Users Visit',
        metrics: 'ga:newUsers'
      },
      startDate: moment(new Date()).add(-1, 'days').subtract(30, 'days').format('YYYY-MM-DD'),
      endDate: moment(new Date()).add(-1, 'days').format('YYYY-MM-DD'),
      menuStart: false,
      menuEnd: false,
      loading: false,
      itemsz: [
        {
          name: 'Events',
          tabId: 'events'
        }
      ],
      categories: [],
      visits: [],
      text: '',
      trafficChart: ''
    }),
    methods: {
      loadChartData () {
        this.loading = true
        var self = this
        let metrics = self[self.currentMetric].metrics
        let dimensions = 'ga:date'
        let sort = '-ga:date'
        let maxResults = 30
        const yesterday = moment(new Date()).add(-1, 'days')
        let startDate = self.startDate
        let endDate = self.endDate
        if (this.optionType === 'week') {
          startDate = yesterday.format('YYYY-MM-DD')
          endDate = yesterday.subtract(30, 'days').format('YYYY-MM-DD')
        }
        const params = {
          metrics,
          dimensions,
          sort,
          maxResults,
          startDate,
          endDate
        }
        axios.get('https://us-central1-defense-exchange.cloudfunctions.net/getReports', {
          params
        })
        .then((response) => {
          let categories = []
          let visits = []
          if (response.data.rows.length !== 0) {
            response.data.rows.forEach((dateValue) => {
              categories.push(moment(dateValue[0]).format('MM/DD'))
              visits.push(parseInt(dateValue[1], 0))
            })
          }
          self.categories = categories.reverse()
          self.visits = visits.reverse()
          this.loading = false
        })
      },
      changeMetrics (value) {
        this.currentMetric = value
        this.loadChartData()
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
