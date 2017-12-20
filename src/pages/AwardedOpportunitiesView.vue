<template>
  <v-container style="padding-top: 100px">
    <v-layout row >
      <v-flex>
        <v-card flat class="new-green px-3 pt-3 pb-2">
          <v-layout row wrap>
            <v-flex md3>
              <p class="text-white" style="font-size: 13px;">
                {{ pageData.opportunities.sub_text }}
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
    <v-layout row wrap class="mt-3">
      <v-flex md12>
        <div class="bg-white px-2 pt-2 pb-2">
        <v-layout row wrap class="mb-2">
              <v-flex md12 class="pl-1">
                <b>Filters</b>
              </v-flex>
              <v-flex md2 class="pl-1">
                <v-text-field
                  class="pt-0 mt-0"
                  v-model="filters.values.naics"
                  single-line
                  placeholder="NAICS"
                >
                </v-text-field>
              </v-flex>
              <v-flex md2 class="pl-1">
                <v-text-field
                  class="pt-0 mt-0"
                  light
                  v-model="filters.values.psc"
                  hide-details
                  single-line
                  placeholder="PSC"
                >
                </v-text-field>
              </v-flex>
              <v-flex md2 class="pl-1">
                <v-text-field
                  class="pt-0 mt-0"
                  v-model="filters.values.search"
                  light
                  hide-details
                  single-line
                  placeholder="Search"
                >
                </v-text-field>
              </v-flex>
              <v-flex md2 class="pl-1">
                <v-menu
                  lazy
                  :close-on-content-click="false"
                  v-model="startmenu"
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
                    placeholder="Start Date"
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
              <v-flex md2 class="pl-1">
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
                    placeholder="End Date"
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
                <v-btn class="mt-3" style="margin-top: -8px !important;" @click.prevent="clearFilters">Clear filters</v-btn>
              </v-flex>
        </v-layout>
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
                    <td class="text-xs-left textLeft">{{ props.item.posteddate }}</td>
                    <td class="text-xs-left textLeft">{{ props.item.solicitationname }}</td>
                    <td class="text-xs-left textLeft">{{ props.item.agency }}</td>
                    <td class="text-xs-left textLeft">{{ props.item.noticetype }}</td>
                    <td class="text-xs-left textLeft">{{ props.item.naicscode }}</td>
                    <td class="text-xs-left textLeft">{{ props.item.setaside }}</td>
                    <td class="text-xs-left textLeftx">{{ props.item.primarypointofcontact }}</td>
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
    <opportunities-modal :dialog="dialog" :item="selectedItem"/>
  </v-container>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import SideboxChat from '@/components/chat/sideboxChat.vue'
  import FullViewChat from '@/components/chat/fullviewChat.vue'
  import OpportunitiesModal from '../components/modal/info/opportunitiesViewModal.vue'

  export default {
    components: {
      OpportunitiesModal,
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
          rowsPerPage: 25
        },
        heading: 'Department of Defense Contract History',
        noticetypes: [
          'All Notices',
          'A'
        ],
        headers: [
          { text: 'Date', width: '300px', value: 'posteddate', align: 'center', sortable: false, class: 'postdate-width' },
          { text: 'Title', value: 'solicitationname', align: 'center', sortable: false },
          { text: 'Agency', value: 'agency', align: 'center', sortable: false },
          { text: 'Notice Type', value: 'noticetype', align: 'center', sortable: false },
          { text: 'NAICS CODE', value: 'naicscode', align: 'center', sortable: false },
          { text: 'Set-aside', value: 'setaside', align: 'center', sortable: false },
          { text: 'Point of Contact', value: 'primarypointofcontact', sortable: false, align: 'center' }
        ],
        count: 0,
        filters: {
          values: {
            startdate: null,
            enddate: null,
            psc: '',
            naics: '',
            search: '',
            type: 'award'
          }
        }
      }
    },
    watch: {
      pagination (val) {
        let skip = 0
        this.loading = true
        if (val.page > 1) {
          skip = this.count * val.page
        }
        this.$store.dispatch('getOpportunities', { type: 'award', skip, limit: val.rowsPerPage }).then(res => {
          this.totalItems = res.data.total
          this.count = res.data.data.length
          this.loading = false
          return res
        })
      },
      filters: {
        handler (val) {
          this.loading = true
          this.$store.dispatch('getOpportunities', val.values).then(res => {
            this.loading = false
          })
        },
        deep: true
      }
    },
    methods: {
      ...mapActions([
        'getOpportunities'
      ]),
      saveFilters () {
        this.$firebase.database().ref(`filters/awardedopportunities/${this.$store.getters.getUserDetails.uid}`).set(this.filters)
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
          type: 'award'
        }
      }
    },
    mounted () {
      const self = this
      this.$on('cancel', () => {
        self.dialog = false
      })
      this.getOpportunities({ type: 'award' }).then((res) => {
        this.totalItems = res.data.total
        this.count = res.data.data.length
        this.loading = false
        return res
      })
      // this.$firebase.database().ref(`filters/awardedopportunities/${this.$store.getters.getUserDetails.uid}`).once('value')
      //   .then(snapshot => {
      //     const filter = snapshot.val()
      //     if (filter.values) {
      //       this.filters = filter
      //     }
      //   })
    },
    computed: {
      ...mapGetters([
        'getOpportunitiesState'
      ]),
      items () {
        const data = this.getOpportunitiesState.data
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
  th.column.text-xs-center {
    text-align: left !important;
    padding-left: 0px !important;
    font-size: 12px;
  }
</style>
