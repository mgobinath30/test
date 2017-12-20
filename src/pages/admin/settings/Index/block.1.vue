<template>
    <v-container fluid>
        <v-layout row wrap>
          <v-flex xs6 sm6>
                <v-expansion-panel>
                    <v-expansion-panel-content>
                    <div slot="header">New Users</div>
                    <v-card>
                        <v-card-text class="grey lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
                    </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
          </v-flex>
          <v-flex xs6 sm6>
                <v-expansion-panel>
                    <v-expansion-panel-content>
                    <div slot="header">New Companies</div>
                    <v-card>
                        <v-card-text class="grey lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
                    </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
          </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
  export default {
    computed: {
      events () {
        return this.$store.getters.fetchEvents
      },
      loading () {
        return this.$store.getters.getLoading
      },
      error () {
        return this.$store.getters.getError
      },
      updateProcess () {
        return this.$store.getters.getProcess === 'Settings Saved'
      },
      process () {
        return this.$store.getters.getProcess
      },
      allEvents () {
        if (this.currentStatus || this.currentStatus === 0 || this.currentDate) {
          return this.events.filter((event) => event.approvalstatus === this.currentStatus || event.date < this.currentDate)
        }
        return this.events
      }
    },
    data () {
      return {
        search: '',
        e1: '',
        pagination: {},
        dialog: false,
        currentStatus: '',
        currentEventId: '',
        currentDate: '',
        view_dialog: false,
        headers: [
          {
            text: 'Submit Date',
            align: 'left',
            sortable: false,
            value: 'eventdate'
          },
          {
            text: 'Company',
            value: 'user',
            align: 'center',
            sortable: false
          },
          {
            text: 'Event Title',
            value: 'title',
            align: 'center',
            sortable: false
          },
          {
            text: 'Event Date',
            align: 'center',
            sortable: false,
            value: 'posteddate'
          },
          {
            text: 'Status',
            value: 'status',
            align: 'center',
            sortable: false
          },
          {
            text: 'Actions',
            value: 'action',
            align: 'center',
            sortable: false
          }
        ],
        status_filter: [
          {
            text: 'All',
            value: ''
          },
          {
            text: 'Approved',
            value: 1
          },
          {
            text: 'Pending',
            value: 0
          },
          {
            text: 'Rejected',
            value: 2
          }
        ],
        default_filter: [
          {
            text: 'Option 1'
          },
          {
            text: 'Option 2'
          },
          {
            text: 'Option 3'
          }
        ],
        items: []
      }
    },
    methods: {
      changeStatus (status, postId) {
        const payload = {
          type: 'events',
          status,
          postId
        }
        this.$store.dispatch('changeStatus', payload)
      },
      filterStatus (status) {
        this.currentStatus = status
      },
      deleteRow () {
        const payload = {
          type: 'events',
          postId: this.currentEventId
        }
        this.$store.dispatch('deletePost', payload)
      },
      assignId (postId) {
        this.currentEventId = postId
      }
    }
  }
</script>
<style>
  #right {
    float: right !important;
  }
</style>