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
                      <td class="text-xs-left">{{ props.item.originalpostingdate }}</td>
                      <td class="text-xs-left">{{ props.item.title }}</td>
                      <td class="text-xs-left">{{ props.item.agency }}</td>
                      <td class="text-xs-left">{{ props.item.office }}</td>
                      <td class="text-xs-left">{{ props.item.type }}</td>
                      <td class="text-xs-left">{{ props.item.setaside }}</td>
                      <td class="text-xs-left">{{ props.item.naicscode }}</td>
                      <td class="text-xs-left">{{ props.item.contactinformation }}</td>

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
    <recover-opportunities-modal :dialog="dialog" :item="selectedItem"/>
  </v-container>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import SideboxChat from '@/components/chat/sideboxChat.vue'
  import FullViewChat from '@/components/chat/fullviewChat.vue'
  import RecoverOpportunitiesModal from '../components/modal/info/recoverOpportunitiesViewModal.vue'

  export default {
    components: {
      RecoverOpportunitiesModal,
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
          { text: 'Date Created', width: '300px', value: 'originalpostingdate', align: 'left', sortable: false, class: 'postdate-width textLeft' },
          { text: 'Title', value: 'title', align: 'left', sortable: false, class: 'textLeft' },
          { text: 'Agency', value: 'agency', align: 'left', sortable: false, class: 'textLeft' },
          { text: 'Office', value: 'office', align: 'left', sortable: false, class: 'textLeft' },
          { text: 'Notice Type', width: '100px', value: 'type', align: 'left', sortable: false, class: 'textLeft' },
          { text: 'Set Aside', value: 'setaside', sortable: false, align: 'left', class: 'textLeft' },
          { text: 'NAICS Code', value: 'naicscode', sortable: false, align: 'left', class: 'textLeft' },
          { text: 'Point of contact', value: 'contactinformation', sortable: false, align: 'left', class: 'textLeft' }

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
        this.loading = true
        if (val.page > 1) {
          skip = this.count * val.page
        }
        this.$store.dispatch('getRecoveryOpportunities', { type: 'active', skip, limit: val.rowsPerPage }).then(res => {
          this.totalItems = res.data.total
          this.count = res.data.data.length
          this.loading = false
          return res
        })
      },
      filters: {
        handler (val) {
          this.loading = true
          this.$store.dispatch('getRecoveryOpportunities', val.values).then(res => {
            this.loading = false
          })
        },
        deep: true
      }
    },
    methods: {
      ...mapActions([
        'getRecoveryOpportunities'
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
      this.getreOpportunities({ type: 'active' }).then((res) => {
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
        'getRecoveryOpportunitiesState'
      ]),
      items () {
        const data = this.getRecoveryOpportunitiesState.data
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
