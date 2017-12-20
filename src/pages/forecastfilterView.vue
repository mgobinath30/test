<template>
  <v-container style="padding-top: 100px">
    <v-layout row >
      <v-flex>

      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-3">
      <v-flex md12>
        <div class="bg-white px-2 pt-2 pb-2">
        <v-card>
          <v-toolbar class="grey darken-2" dark card dense>
            <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-flex md4>
              <v-text-field color="white" v-model="search" dark prepend-icon="search" hide-details single-line placeholder="Search"></v-text-field>
            </v-flex>
          </v-toolbar>
          <v-layout row>
            <v-flex md12>
              <v-data-table
                v-bind:headers="headers"
                :items="items"
                :rows-per-page-items="[15, 25, 50, 100]"
                :total-items="totalItems"
                :pagination.sync="pagination"
                :loading="loading"
                v-bind:search="search"
              >
                <template slot="items" scope="props">
                  <tr style="cursor: pointer" @click.prevent="moreInfo(props.item)">
                    <td class="text-xs-left">{{ props.item.created |formatDateTime}}</td>
                    <td class="text-xs-left">{{ props.item.award_status }}</td>
                    <td class="text-xs-left">{{ props.item.estimated_fiscal_year }}</td>
                    <td class="text-xs-left">{{ props.item.title }}</td>
                    <td class="text-xs-left">{{ props.item.agency }}</td>
                    <td class="text-xs-left">{{ props.item.new_requirement }}</td>
                    <td class="text-xs-left">{{ props.item.setaside }}</td>
                    <td class="text-xs-left">{{ props.item.naicscode }}</td>
                    <td class="text-xs-left">{{ props.item.dollar_value_min }}</td>
                    <td class="text-xs-left">{{ props.item.point_of_contact_name }}</td>

                  </tr>
                </template>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-card>
      </div>
      </v-flex>
    </v-layout>
    <!-- <sidebox-chat /> -->
    <full-view-chat />
    <forecast-opportunities-modal :dialog="dialog" :item="selectedItem"/>
  </v-container>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import SideboxChat from '@/components/chat/sideboxChat.vue'
  import FullViewChat from '@/components/chat/fullviewChat.vue'
  import ForecastOpportunitiesModal from '../components/modal/info/forecastOpportunitiesViewModal.vue'
  import moment from 'moment'
  import Vue from 'vue'

  Vue.filter('formatDateTime', function (value) {
    if (value) {
      return moment(String(value)).format('MM/DD/YYYY')
    }
  })
  export default {
    components: {
      ForecastOpportunitiesModal,
      SideboxChat,
      FullViewChat
    },
    data: () => {
      return {
        search: '',
        dialog: false,
        startmenu: false,
        endmenu: false,
        totalItems: null,
        selectedItem: null,
        loading: true,
        pagination: {
          rowsPerPage: 15
        },
        headers: [
          { text: 'Date Created', width: '300px', value: 'created', align: 'left', sortable: false, class: 'textLeft postdate-width' },
          { text: 'Award Status', value: 'award_status', align: 'left', sortable: false, class: 'textLeft' },
          { text: 'Estimated Fiscal Year', width: '100px', value: 'estimated_fiscal_year', align: 'left', sortable: false, class: 'textLeft' },
          { text: 'Title', value: 'title', width: '300px', align: 'left', sortable: false, class: 'textLeft' },
          { text: 'Agency', value: 'agency', align: 'left', sortable: false, class: 'textLeft' },
          { text: 'Requirement', value: 'new_requirement', align: 'left', sortable: false, class: 'textLeft' },
          { text: 'Set Aside', value: 'awardee_type', sortable: false, align: 'left', class: 'textLeft' },
          { text: 'NAICS', value: 'naics', sortable: false, align: 'left', class: 'textLeft' },
          { text: 'Minimum Dollar Value', value: 'dollar_value_min', sortable: false, align: 'left', class: 'textLeft' },
          { text: 'Point of contact Name', value: 'point_of_contact_name', sortable: false, align: 'left', class: 'textLeft' }

        ],
        count: 0,
        filters: {
          values: {
            startdate: null,
            enddate: null,
            psc: '',
            naics: '',
            search: '',
            type: 'active'
          }
        }
      }
    },
    watch: {
      pagination (val) {
        let skip = 0
        this.loading = false
        if (val.page > 1) {
          skip = this.count * val.page
        }
        this.$store.dispatch('getForecastOpportunities', { type: 'active', skip, limit: val.rowsPerPage }).then(res => {
          this.totalItems = res.data.total
          this.count = res.data.data.length
          this.loading = false
          return res
        })
      },
      filters: {
        handler (val) {
          this.loading = false
          this.$store.dispatch('getForecastOpportunities', val.values).then(res => {
            this.loading = false
          })
        },
        deep: false
      }
    },
    methods: {
      ...mapActions([
        'getForecastOpportunities'
      ]),
      saveFilters () {
      },
      moreInfo (item) {
        this.dialog = true
        this.selectedItem = item
      },
      clearFilters () {
        this.filters.values = {
          startdate: null,
          enddate: null,
          psc: '',
          naics: '',
          search: '',
          type: 'active'
        }
      }
    },
    mounted () {
      const self = this
      this.$on('cancel', () => {
        self.dialog = false
      })
      this.getForecastOpportunities({ type: 'active' }).then((res) => {
        this.totalItems = res.data.total
        this.count = res.data.data.length
        this.loading = false
        return res
      })
      // this.$firebase.database().ref(`filters/activeopportunities/${this.$store.getters.getUserDetails.uid}`).once('value')
      //   .then(snapshot => {
      //     const filter = snapshot.val()
      //     if (filter.values) {
      //       this.filters = filter
      //     }
      //   })
    },
    computed: {
      ...mapGetters([
        'getForecastOpportunitiesState'
      ]),
      items () {
        const data = this.getForecastOpportunitiesState.data
        return data
      },
      pages () {
        return this.pagination.rowsPerPage ? Math.ceil(this.items.length / this.pagination.rowsPerPage) : 0
      },
      pageData () {
        return this.$store.getters.getPages
      }
    }
  }

</script>
<style>
  .postdate-width {
    width: 120px !important
  }
  .text-uppercase {
    text-transform: uppercase !important;
  }
  .new-green {
    background: #64d085 !important;
  }
  .full-width {
    width: 100% !important;
  }
  .text-white {
    color: #fff !important;
  }
  .bg-white {
    background: #fff !important;
  }
  .textLeft{
    padding-left: 10px !important;
  }
</style>

