<template>
  <v-dialog v-model="openModal" lazy max-width="700px" persistent :fullscreen="screenWidth<600" transition="scale-transition">
    <v-card>
      <v-tabs class="pd-0" dark fixed centered v-model="active">
          <v-tabs-bar class="header light-green darken-4">
            <v-tabs-slider class="white"></v-tabs-slider>
            <v-tabs-item
              v-for="i in items"
              :key="i.id"
              :href="'#info-' + i.id"
            >
              {{ i.text }}
            </v-tabs-item>
            <v-btn icon @click.native="cancel" style="float:right">
                <v-icon dark>cancel</v-icon>
            </v-btn>
          </v-tabs-bar>
        <v-card-text>
          <v-tabs-content id="info-1">
            <v-layout row wrap>
                <v-flex md12 xs12 class="mb-3">
                    <span style="font-size: 16px">{{ item && item.solnum ? item.solnum : '' }}</span>
                </v-flex>
                <v-flex md12 xs12 class="mb-3">
                    <div>
                        <span><b>{{ item ? item.title : '' }}</b></span>
                    </div>
                </v-flex>
                <v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>Agency: </b>{{ item ? item.agency : '' }}</span>
                    </div>
                </v-flex>
               <v-flex md6 xs12 class="mb-3">
                <div>
                  <span><b> Link: </b><a :href="item ? item.link : ''" style="text-decoration: none" target="new">Click here</a></span>
                </div>
              </v-flex>
              <v-flex md6 xs12 class="mb-3">
                <div>
                  <span><b>Office: </b>{{ item && item.office ? item.office : '' }}</span>
                </div>
              </v-flex>
               <v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>Type: </b>{{ item && item.type ? item.type: '' }}</span>
                    </div>
                </v-flex>
                <v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>Location: </b>{{ item ? item.location : '' }}</span>
                    </div>
                </v-flex>
                <v-flex md6 xs12 class="mb-3">
                <div>
                  <span><b>Set Aside: </b>{{ item && item.setaside ? item.setaside: '' }}</span>
                </div>
                </v-flex>
                <v-flex md6 xs12 class="mb-3">
                <div>
                  <span><b>Office Address: </b>{{ item ? item.officeaddress : '' }}</span>
                </div>
                </v-flex>
                <v-flex md6 xs12 class="mb-3">
                <div>
                  <span><b>Classification Code: </b>{{ item && item.classificationcode ? item.classificationcode : '' }}</span>
                </div>
              </v-flex>
                <v-flex md6 xs12 class="mb-3">
                <div>
                  <span><b>Active: </b>{{ item ? item.active : '' }}</span>
                </div>
                </v-flex>
                <v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>NAICS Code: </b>{{ item && item.naicscode  ? item.naicscode : '' }}</span>
                    </div>
                </v-flex>
                <v-flex md12 xs12 class="mb-3">
                <div>
                  <span><b>Posted Date: </b>{{ item && item.originalpostingdate? item.originalpostingdate : '' }}</span>
                </div>
                </v-flex>
                <v-flex md12 xs12 class="mb-3">
                  <div>
                    <span><b>Response Date: </b>{{ item && item.responsedeadline? item.responsedeadline : '' }}</span>
                  </div>
                </v-flex>
                <v-flex md6 xs12 class="mb-3">
                <div>
                  <span><b>Contact Information: </b>{{ item && item.contactinformation ? item.contactinformation: '' }}</span>
                </div>
                </v-flex>
                <v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>Place of performance: </b>{{ item ? item.placeofprformance : '' }}</span>
                    </div>
                </v-flex>
            </v-layout>
          </v-tabs-content>
          <v-tabs-content
            id="info-2"
          >
            <v-layout row wrap>
                <v-flex md12 xs12 class="mb-3">
                    <span style="font-size: 16px"><b>{{ item && item.title ? item.title: '' }}</b></span>
                </v-flex>
                <v-flex md12 xs12 class="mb-3">
                <div>
                  <span><b>Sol #: </b>{{ item && item['Sol #']  ? item['Sol #'] : '' }}</span>
                </div>
              </v-flex>
              <v-flex md12 xs12 class="mb-3">
                <span><b>Description: </b>{{ item && item.description  ? item.description : '' }}</span>
                </v-flex>
            </v-layout>
          </v-tabs-content>
        </v-card-text>
      </v-tabs>
      <v-card-actions class="grey lighten-2">
        <v-layout justify-space-around >
            <span class="group">
                <!-- <v-btn flat><v-icon medium>mdi-heart</v-icon></v-btn>
                <v-tooltip top>
                    <v-btn flat slot="activator"><v-icon medium>share</v-icon></v-btn>
                    <span>Share</span>
                </v-tooltip>
                <v-tooltip top v-if="item && item.primarypointofcontactemail.length > 6">
                    <v-btn :href="'mailto:' + item.primarypointofcontactemail" flat slot="activator"><v-icon medium>email</v-icon></v-btn>
                    <span>Contact Contract Officer</span>
                </v-tooltip>
                <v-tooltip top v-if="item && item.primarypointofcontactemail.length <= 5">
                    <v-btn disabled flat slot="activator"><v-icon medium>email</v-icon></v-btn>
                    <span>Contract Officer email not available</span>
                </v-tooltip>
                <v-tooltip top>
                    <v-btn flat slot="activator"><v-icon medium>search</v-icon></v-btn>
                    <span>Find Contractor</span>
                </v-tooltip>-->
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
</style>


<script>
import 'mdi/css/materialdesignicons.min.css'

export default {
  props: ['dialog', 'item'],
  data () {
    return {
      openModal: this.$props.dialog,
      active: '',
      items: [
        {
          id: 1,
          text: 'Basic details'
        },
        {
          id: 2,
          text: 'Description'
        }]
    }
  },
  watch: {
    dialog () {
      this.openModal = this.dialog
      this.active = 'info-1'
    }
  },
  methods: {
    cancel () {
      this.openModal = false
      this.$parent.$emit('cancel')
    }
  },
  computed: {
    screenWidth () {
      return Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    }
  }
}
</script>
