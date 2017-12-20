<template>
  <v-container style="padding-top: 100px">
    <v-layout row class="mx-3 mt-3">
      <v-flex>
        <v-card flat class="new-green px-3 pt-3 pb-2">
          <v-layout row>
            <v-flex md4>
              <p class="text-white" style="font-size: 13px;">
                {{ pages.directory.sub_text }}
              </p>
            </v-flex>
            <v-flex md3>
              Hello
            </v-flex>
            <v-flex md3>
              Hello
            </v-flex>
            <v-flex md3>
              Hello
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row class="mx-3 mt-3">
      <v-flex>
        <div class="bg-white px-2 pt-2 pb-2">
        <v-layout row wrap class="mb-2">
              <v-flex md12 class="pl-1">
                <b>Filters</b>
              </v-flex>
              <v-flex md3 class="pl-1 pb-0">
                <v-text-field class="pt-0 mb-0 mt-0" v-model="filters.values.search" hide-details single-line placeholder="Search"></v-text-field>
              </v-flex>
              <!-- <v-flex md3 class="pl-1">
                <v-select
                  :items="subcontractplan"
                  class="pt-0 mt-0"
                  color="green"
                  v-model="filters.values.subcontractplan"
                  single-line
                  placeholder="Subcontract plan"
                >
                </v-select>
              </v-flex> -->
        </v-layout>
        <v-card>
          <v-toolbar class="grey darken-2" dark card dense>
            <v-toolbar-side-icon></v-toolbar-side-icon>
          </v-toolbar>
          <v-layout row wrap>
            <v-flex md6>
              <div id="map" style="height:100% border:0; width: 100%">
              </div>
            </v-flex>
            <v-flex md6>
              <v-data-table
                v-bind:headers="headers"
                :items="items"
                :rows-per-page-items="[15, 25, 50, 100]"
                :total-items="totalItems"
                :pagination.sync="tablePagination"
                :loading="loading"
              >
                <template slot="items" scope="props">
                  <tr style="cursor: pointer">
                    <td class="text-xs-left">{{ props.item.companylegalname }}</td>
                    <td class="text-xs-left">{{ props.item.streetaddress }}</td>
                    <td class="text-xs-left">{{ props.item.companycertifications.length ? props.item.companycertifications : 'N/A' }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-card>
      </div>
      </v-flex>
    </v-layout>
    <full-view-chat />
  </v-container>
</template> 
<script>
  import FullViewChat from '@/components/chat/fullviewChat.vue'
  import 'font-awesome/css/font-awesome.min.css'
  const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyBCkHJdW4ChFLJ8cqJghc-LlhVU_FAl5G0'
  })

  export default {
    components: {
      FullViewChat
    },
    data: () => {
      return {
        tablePagination: {
          rowsPerPage: 25
        },
        search: '',
        totalItems: 0,
        markers: [],
        num: 0,
        count: 0,
        loading: true,
        h1: 'Defense Contractors Directory',
        headers: [
          { text: 'Company Name', value: 'companylegalname', align: 'center' },
          { text: 'Company Address', value: 'streetaddress', align: 'center' },
          { text: 'Company Certifications', value: 'companycertifications', align: 'center' }
        ],
        map: {},
        filters: {
          values: {
            search: ''
          }
        },
        infoWindow: {}
      }
    },
    methods: {
      geocode (address, cb) {
        return googleMapsClient.geocode({
          address
        }, cb)
      },
      removeMarkers () {
        let i
        for (i = 0; i < this.markers.length; i++) {
          this.markers[i].setMap(null)
        }
        this.markers = []
      }
    },
    watch: {
      tablePagination (val) {
        let skip = null
        this.loading = true
        if (val.page > 1) {
          skip = this.count * val.page
        }
        let state = 'VA'
        this.$store.dispatch('getContractors', { skip, limit: val.rowsPerPage }, { state }).then(res => {
          this.totalItems = res.data.total
          this.count = res.data.count
          this.loading = false
        })
      },
      filters: {
        handler (val) {
          console.log('-------------------handle-----------------')
          if (val.values.search.length) {
            const search = val.values.search.toUpperCase()
            this.loading = true
            this.$store.dispatch('getContractors', { search }).then(res => {
              this.totalItems = res.data.total
              this.count = res.data.count
              this.loading = false
            })
          }
        },
        deep: true
      },
      items (val) {
        console.log('-------------------map-----------------')
        // eslint-disable-next-line
        let i
        let marker
        this.map = new window.google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: new window.google.maps.LatLng(val[0].latitude || 33.748995, val[0].longitude || -84.387982),
          mapTypeId: window.google.maps.MapTypeId.ROADMAP
        })
        this.infoWindow = new window.google.maps.InfoWindow()
        this.removeMarkers()
        for (i = 0; i < val.length; i++) {
          const num = i // eslint-disable-line
          this.num = i
          const self = this
          this.geocode(val[i].streetaddress,
            (err, res) => {
              if (err) {
                return err
              }
              const location = res.json.results[0].geometry.location
              marker = new window.google.maps.Marker({
                position: new window.google.maps.LatLng(location.lat, location.lng),
                map: self.map
              })
              this.markers.push(marker)
              return window.google.maps.event.addListener(marker, 'click', ((marker, num, val) => {
                return () => {
                  const desc = [
                    `Company: ${val[num].companylegalname}`,
                    `Address: ${val[num].streetaddress}`
                  ].join('<br/>')
                  self.infoWindow.setContent(desc)
                  self.infoWindow.open(self.map, marker)
                }
              })(marker, num, val))
            })
        }
      }
    },
    computed: {
      pages () {
        console.log('-------------------pages-----------------')
        return this.$store.getters.getPages
      },
      items () {
        console.log('-------------------items-----------------')
        //  this.filters.values.search = this.$store.getters.getCompanyDetails.state
        return this.$store.getters.getContractors.data
      }
    },
    mounted () {
      console.log('-------------------mounted-----------------')
      let state = 'VA'
      this.$store.dispatch('getContractors', { state }).then(res => {
        this.tablePagination.rowsPerPage = 25
        this.totalItems = res.data.total
        this.count = res.data.count
        this.loading = false
        this.state = 'VA'
      })
    }
  }
</script>
<style scoped>
  .text-uppercase .input-group__input input {
    text-transform: uppercase !important;
  }
  .new-green {
    background: #64d085;
  }
  #map {
    height: 100%
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
</style>
 
