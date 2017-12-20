<template>
  <v-container style="padding-top: 100px">
    <v-layout row class="mx-3 mt-3">
      <v-flex>
        <v-card flat class="new-green px-3 pt-3 pb-2">
          <v-layout row>
            <v-flex md4>
              <p class="text-white" style="font-size: 13px;">
                {{ pageData.history.sub_text }}
              </p>
            </v-flex>
            <v-flex md3>
            </v-flex>
            <v-flex md3>
            </v-flex>
            <v-flex md3>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row class="mx-3 mt-3">
      <v-flex md12>
        <div class="bg-white px-2 pt-2 pb-2">
        <v-layout row wrap class="mb-2">
              <v-flex md12 class="pl-1">
                <b>Filters</b>
              </v-flex>
              <v-flex md2 class="pl-1 pb-0">
                <v-text-field class="pt-0 mb-0 mt-0" v-model="filters.values.search" hide-details single-line placeholder="Search"></v-text-field>
              </v-flex>
              <v-flex md2 class="pl-1">
                <v-select
                  :items="subcontractplan"
                  class="pt-0 mt-0"
                  color="green"
                  v-model="filters.values.subcontractplan"
                  single-line
                  placeholder="Subcontract plan"
                >
                </v-select>
              </v-flex>
              <v-flex md2 class="pl-1">
                <v-select
                  class="pt-0 mt-0"
                  color="green"
                  :items="setaside"
                  v-model="filters.values.setaside"
                  light
                  hide-details
                  single-line
                  placeholder="Set-Aside Type"
                >
                </v-select>
              </v-flex>
              <v-flex md2 class="pl-1">
                <v-text-field
                  class="pt-0 mt-0"
                  color="green"
                  v-model="filters.values.psc"
                  light
                  hide-details
                  single-line
                  placeholder="PSC"
                >
                </v-text-field>
              </v-flex>
              <v-flex md2 class="pl-1">
                <v-select
                  class="mt-0 pt-0"
                  color="green"
                  :items="daterange"
                  v-model="selectedDateRange"
                  light
                  hide-details
                  single-line
                  placeholder="Date Range"
                >
                </v-select>
              </v-flex>
              <v-flex md2 class="pl-1 pt-0" v-if="showDateRange">
                <v-menu
                  lazy
                  :close-on-content-click="false"
                  v-model="startmenu"
                  transition="scale-transition"
                  offset-y
                  class="mt-0 pt-0"
                  full-width
                  :nudge-right="40"
                  max-width="290px"
                  min-width="290px"
                >
                  <v-text-field
                    class="pt-0"
                    slot="activator"
                    placeholder="Starting Date"
                    v-model="filters.values.startdate"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="filters.values.startdate" no-title scrollable actions>
                    <template scope="{ save, cancel }">
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                        <v-btn flat color="primary" @click="save">OK</v-btn>
                      </v-card-actions>
                    </template>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex md2 class="pl-1" v-if="showDateRange">
                <v-menu
                  lazy
                  :close-on-content-click="false"
                  v-model="endmenu"
                  transition="scale-transition"
                  offset-y
                  class="mt-0"
                  full-width
                  :nudge-right="40"
                  max-width="290px"
                  min-width="290px"
                >
                  <v-text-field
                    class="pt-0"
                    slot="activator"
                    placeholder="Ending Date"
                    v-model="filters.values.enddate"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="filters.values.enddate" no-title scrollable actions>
                    <template scope="{ save, cancel }">
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                        <v-btn flat color="primary" @click="save">OK</v-btn>
                      </v-card-actions>
                    </template>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex md2>
                <!-- <v-btn class="mt-3" @click.prevent="saveFilters">Save filters</v-btn> -->
                <v-btn style="margin-top: -8px !important;" class="mt-3" @click.prevent="clearFilters">Clear filters</v-btn>
              </v-flex>
        </v-layout>
        <v-card>
          <v-toolbar class="grey darken-2" dark card dense>
            <v-toolbar-side-icon></v-toolbar-side-icon>
          </v-toolbar>
          <v-layout row>
            <v-flex md12>
              <v-data-table
                v-bind:headers="headers"
                :items="items()"
                :total-items="totalItems"
                :rows-per-page-items="[15, 25, 50, 100]"
                :pagination.sync="tablePagination"
                :loading="loading"
                v-bind:search="search"
              >
                <template slot="items" scope="props">
                  <tr style="cursor: pointer" @click.prevent="moreInfo(props.item)">
                    <td class="textLeft">{{ props.item.majagencycat }}</td>
                    <td class="text-xs-left textLeft">{{ props.item.contractactiontype }}</td>
                    <td class="text-xs-left textLeft">{{ props.item.naicsdescription }}</td>
                    <td class="text-xs-left textLeft">{{ props.item.pscdescription }}</td>
                    <td class="text-xs-left textLeft">{{ props.item.vendorname }}</td>
                    <td class="text-xs-left textLeft">{{ props.item.signeddate }}</td>
                    <td class="text-xs-left textLeft">{{ props.item.currentcompletiondate }}</td>
                    <td class="text-xs-left textLeft">{{ props.item.placeofperformancecity }}</td>
                    <td class="text-xs-left textLeft">{{ props.item.totalcontractvalue }}</td>
                    <td class="text-xs-left textLeft">{{ props.item.typeofsetaside }}</td>
                    <td class="text-xs-left textLeft">{{ props.item.subcontractplan }}</td>
                    <td class="text-xs-left textLeft">{{ props.item.uniquetransactionid }}</td>
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
    <history-view-modal :dialog="dialog" :item="selectedItem"/>
  </v-container>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import SideboxChat from '@/components/chat/sideboxChat.vue'
  import FullViewChat from '@/components/chat/fullviewChat.vue'
  import SignupComponent from '../components/modal/RegistrationComponent.vue'
  import HistoryViewModal from '../components/modal/info/historyViewModal.vue'

  export default {
    components: {
      SignupComponent,
      SideboxChat,
      FullViewChat,
      HistoryViewModal
    },
    data: () => {
      return {
        search: '',
        dialog: false,
        loading: true,
        selectedDateRange: '',
        count: 0,
        selectedItem: {},
        tablePagination: {
          rowsPerPage: 5
        },
        totalItems: null,
        startmenu: false,
        endmenu: false,
        heading: 'Department of Defense Contract History',
        headers: [
          { text: 'Major Funding Agency Cat ID', value: 'majagencycat', sortable: false, align: 'left', class: 'textleft' },
          { text: 'Contract Action Type', value: 'contractactiontype', sortable: false, align: 'left', class: 'textleft' },
          { text: 'NAICS Description', value: 'naicsdescription', sortable: false, align: 'left', class: 'textleft' },
          { text: 'PCS Description', value: 'pscdescription', sortable: false, align: 'left', class: 'textleft' },
          { text: 'Vendor Name', value: 'vendorname', sortable: false, align: 'left', class: 'textleft' },
          { text: 'Signed Date', value: 'signeddate', sortable: false, align: 'left', class: 'textleft' },
          { text: 'Completion Date', value: 'currentcompletiondate', sortable: false, align: 'left', class: 'textleft' },
          { text: 'Place Of Performance', value: 'placeofperformancecity', sortable: false, align: 'left', class: 'textleft' },
          { text: 'Total Contract Value', value: 'totalcontractvalue', sortable: false, align: 'left', class: 'textleft' },
          { text: 'Set-aside Type', value: 'typeofsetaside', sortable: false, align: 'left', class: 'textleft' },
          { text: 'Subcontract Plan', value: 'subcontractplan', sortable: false, align: 'left', class: 'textleft' },
          { text: 'Transaction ID', value: 'uniquetransactionid', sortable: false, align: 'left', class: 'textleft' }
        ],
        subcontractplan: [
          'All',
          'A: PLAN NOT INCLUDED - NO SUBCONTRACTING POSSIBILITIES',
          'B: PLAN NOT REQUIRED',
          'C: PLAN REQUIRED - INCENTIVE NOT INCLUDED',
          'D: PLAN REQUIRED - INCENTIVE INCLUDED',
          'E: PLAN REQUIRED (PRE 2004)',
          'F: INDIVIDUAL SUBCONTRACT PLAN',
          'G: COMMERCIAL SUBCONTRACT PLAN'
        ],
        daterange: [
          'Signed Date',
          'Completion Date',
          'Fiscal Year'
        ],
        setaside: [
          'All',
          'Small Business',
          'Woman Owned',
          'Veteran Owned'
        ],
        filters: {
          values: {
            subcontractplan: '',
            setaside: '',
            search: '',
            psc: '',
            startdate: null,
            daterangetype: '',
            enddate: null
          }
        },
        showDateRange: false,
        items () {
          return this.getContractHistoryState.data
        }
      }
    },
    watch: {
      tablePagination: {
        handler (val) {
          let skip = 0
          this.loading = true
          if (val.page > 1) {
            skip = this.count * val.page
          }
          this.getContractHistory({ skip, limit: val.rowsPerPage }).then(res => {
            this.totalItems = res.data.total
            this.count = res.data.data.length
            this.loading = false
          })
        },
        deep: true
      },
      selectedDateRange (val) {
        if (val) {
          this.showDateRange = true
          this.filters.values.daterangetype = val
        }
        this.getContractHistory()
      },
      filters: {
        handler (val) {
          if (val) {
            this.loading = true
            this.getContractHistory(val.values).then(res => {
              this.loading = false
              this.totalItems = res.data.total
              this.count = res.data.count
            })
          }
        },
        deep: true
      }
    },
    methods: {
      ...mapActions([
        'getContractHistory'
      ]),
      saveFilters () {
        this.$firebase.database().ref(`filters/contracthistory/${this.$store.getters.getUserDetails.uid}`).set(this.filters)
      },
      clearFilters () {
        this.filters.values = {
          subcontractplan: '',
          setaside: '',
          search: '',
          psc: '',
          startdate: null,
          daterangetype: '',
          enddate: null
        }
      },
      todayDate () {
        let today = new Date()
        let dd = today.getDate()
        let mm = today.getMonth() + 1

        const yyyy = today.getFullYear()
        if (dd < 10) {
          dd = '0' + dd
        }
        if (mm < 10) {
          mm = '0' + mm
        }
        today = yyyy + '-' + mm + '-' + dd
        return today
      },
      moreInfo (item) {
        this.dialog = true
        this.selectedItem = item
      }
    },
    mounted () {
      const self = this
      this.$on('cancel', () => {
        self.dialog = false
      })
      this.getContractHistory().then((res) => {
        this.loading = false
        this.tablePagination.rowsPerPage = 5
        this.totalItems = res.data.total
        this.count = res.data.data.length
        this.loading = false
      })
      // this.$firebase.database().ref(`filters/contracthistory/${this.$store.getters.getUserDetails.uid}`).once('value')
      //   .then(snapshot => {
      //     const filter = snapshot.val()
      //     if (filter.values) {
      //       this.filters = filter
      //     }
      //   })
    },
    computed: {
      ...mapGetters([
        'getContractHistoryState'
      ]),
      pageData () {
        return this.$store.getters.getSettings.pages
      }
    }
  }

</script>
<style scoped>
  .text-uppercase {
    text-transform: uppercase;
  }
  .new-green {
    background: #64d085;
  }
  .full-width {
    width: 100%;
  }
  .text-white {
    color: #fff;
  }
  .bg-white {
    background: #fff;
  }
  .textLeft{
    padding-left: 10px !important;
  }
 th.column.text-xs-left {
    padding-left: 0px !important;
    font-size: 12px;
  }
</style>
