<template>
    <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12 sm12>
           <v-card>
            <v-card-title>
              <v-flex xs2 class="mr-4">
                <v-card flat>
                  <v-select
                    v-bind:items="status_filter"
                    v-model="currentStatus"
                    label="Status"
                    single-line
                    bottom
                  ></v-select>
                </v-card>
              </v-flex>
              <v-flex xs3 class="mr-4">
                <v-card flat>
                  <v-text-field
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                    v-model="search"
                  ></v-text-field>
                </v-card>
              </v-flex>
            </v-card-title>
            <v-data-table
                v-bind:headers="headers"
                v-bind:items="allCompanies"
                v-bind:search="search"
              >
              <template slot="items" scope="props">
                <td class="text-xs-left">
                    <div class="avatar ml-2" style="height: 24px; width: 24px;">
                      <img :src="props.item.companylogo" alt="logo"></div>
                    {{ props.item.companylegalname }}
                  </td>
                <td class="text-xs-left">{{ props.item.companylegalname }}</td>
                <td class="text-xs-left">{{ props.item.firstname }} {{ props.item.lastname }}</td>
                <td class="text-xs-left">{{ props.item.email }}</td>
                <td class="text-xs-left">{{ props.item.companydescription }}</td>
                 <td class="text-xs-left">{{ props.item.verified === true ? 'Verified' : 'Not Verfied' }}</td>
                <td class="text-xs-left">
                   <v-layout row wrap>
                    <v-flex xs4 sm4 v-if="!props.item.verified">
                      <v-tooltip top>
                        <v-btn
                        slot="activator"
                        @click.prevent="changeStatus(true, props.item.id)"
                        icon class="green--text">
                          <v-icon>done</v-icon>
                        </v-btn>
                        <span>Approve</span>
                      </v-tooltip>
                    </v-flex>
                    <v-flex xs4 sm4 v-if="props.item.verified">
                      <v-tooltip top>
                        <v-btn
                        slot="activator"
                        @click.prevent="changeStatus(false, props.item.id)"
                        icon class="red--text">
                          <v-icon>clear</v-icon>
                        </v-btn>
                        <span>Close</span>
                      </v-tooltip>
                    </v-flex>
                    <v-flex xs4 sm4>
                          <v-dialog
                          v-model="props.item.activeDialog"
                          fullscreen
                          transition="dialog-bottom-transition"
                          :overlay=false
                          scrollable
                          lazy absolute width="790px">
                            <v-btn
                            slot="activator"
                            icon
                            class="blue--text">
                            <v-icon>remove_red_eye</v-icon>
                                </v-btn>
                                  <v-card>
                                      <v-layout row>
                                        <v-flex xs12 sm12>
                                          <v-toolbar flat style="flex: 0 0 auto;" dark class="primary">
                                            <v-btn icon @click.native="props.item.activeDialog = false" dark>
                                              <v-icon>close</v-icon>
                                            </v-btn>
                                            <v-toolbar-title>Settings</v-toolbar-title>
                                          </v-toolbar>
                                           <companyInfo :props="props" />
                                        </v-flex>
                                      </v-layout>
                                  </v-card>
                              </v-dialog>
                    </v-flex>
                    <v-flex xs3 sm3>
                      <v-dialog v-model="dialog" lazy absolute>
                        <v-btn
                        slot="activator"
                        icon
                        @click.prevent="assignId(props.item.id)"
                        class="red--text">
                        <v-icon>delete_forever</v-icon>
                      </v-btn>
                        <v-card>
                            <v-card-title>
                                <div class="headline">Really delete?</div>
                            </v-card-title>
                            <v-card-text>Are you sure you want to delete '{{ props.item.name }}'?</v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn class="blue--text darken-1" flat="flat" @click.native="dialog = false">No</v-btn>
                                <v-btn class="blue--text darken-1" flat="flat" @click.native="deleteRow()">Yes</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                    </v-flex>
                  </v-layout>
                </td>
              </template>
              <template slot="pageText" scope="{ pageStart, pageStop }">
                From {{ pageStart }} to {{ pageStop }}
              </template>
            </v-data-table>
          </v-card>
          </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import axios from 'axios'
import companyInfo from './company/company_info.vue'
import contractInfo from './company/contract_info.vue'
import otherInfo from './company/other_info.vue'

export default {
  components: {
    companyInfo,
    contractInfo,
    otherInfo
  },
  computed: {
    companies () {
      return this.$store.getters.fetchCompanies
    },
    process () {
      return this.$store.getters.getProcess
    },
    allCompanies () {
      if (this.currentStatus === true || this.currentStatus === false) {
        return this.companies.filter((company) => company.verified === this.currentStatus)
      }
      return this.companies
    }
  },
  data () {
    return {
      search: '',
      e1: '',
      ex11: true,
      pagination: {},
      dialog: false,
      currentStatus: '',
      currentEventId: '',
      dateRange: 0,
      view_dialog: false,
      info: [
        {
          name: 'Company Info',
          tabId: 'company_info'
        },
        {
          name: 'Contracting Info',
          tabId: 'contracting_info'
        },
        {
          name: 'Other Info',
          tabId: 'other_info'
        }
      ],
      headers: [
        {
          text: 'Company',
          align: 'left',
          sortable: false,
          value: 'companyname'
        },
        {
          text: 'Submitter',
          value: 'user',
          align: 'left',
          sortable: false
        },
        {
          text: 'Submiter email',
          value: 'title',
          align: 'left',
          sortable: false
        },
        {
          text: 'Company Description',
          align: 'left',
          sortable: false,
          value: 'posteddate'
        },
        {
          text: 'Status',
          value: 'status',
          align: 'left',
          sortable: false
        },
        {
          text: 'Actions',
          value: 'Actions',
          align: 'left',
          sortable: false
        }
      ],
      status_filter: [
        {
          text: 'All',
          value: ''
        },
        {
          text: 'Verified',
          value: true
        },
        {
          text: 'Not Verified',
          value: false
        }
      ],
      default_filter: [
        {
          text: 'Last 24hrs'
        },
        {
          text: 'Last 7 days'
        },
        {
          text: 'Last 30 days'
        }
      ],
      items: []
    }
  },
  methods: {
    changeStatus (status, postId) {
      console.log(status, 'status')
      let api = 'https://fed-exchange-api.herokuapp.com/api/v2.0/companydirectory'
      const company = this.companies.filter((company) => company.id === postId)
      const postData = company[0]
      if (!status) {
        return axios.post(api, postData)
        .then((response) => {
          const payload = {
            type: 'companies',
            status,
            postId
          }
          this.$store.dispatch('verifyCompany', payload)
        }).catch((error) => {
          console.log('error', error)
        })
      }
      const payload = {
        type: 'companies',
        status,
        postId
      }
      this.$store.dispatch('verifyCompany', payload)
    },
    filterStatus (status) {
      console.log(status)
      this.currentStatus = status
    },
    deleteRow () {
      const payload = {
        type: 'companies',
        postId: this.currentCompanyId
      }
      this.$store.dispatch('deletePost', payload)
      this.dialog = false
    },
    assignId (postId) {
      this.currentCompanyId = postId
    }
  }
}
</script>
<style>
  #right {
    float: right !important;
  }
  #toggle_status {
    margin-top: 10px;
  }
</style>
