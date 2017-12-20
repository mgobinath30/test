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
                    <span style="font-size: 16px"><b>{{ item && item.title ? item.title : '' }}</b></span>
                </v-flex> 
                <v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>Created: </b>{{ item ? item.created : '' }}</span>
                    </div>
                </v-flex>
                <v-flex md6 xs12 class="mb-3">
                <div>
                  <span><b> Link: </b><a :href="item ? item.fedbizopps_link : ''" style="text-decoration: none" target="new">Click here</a></span>
                </div>
               </v-flex>
               <v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>Agency: </b>{{ item ? item.agency : '' }}</span>
                    </div>
                </v-flex>
                <v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>Type : </b>{{ item ? item.contract_type : '' }}</span>
                    </div>
                </v-flex>
               <v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>Organization : </b>{{ item ? item.organization : '' }}</span>
                    </div>
                </v-flex>
                 <v-flex md12 xs12 class="mb-3">
                    <div>
                        <span><b>New Requirement : </b>{{ item ? item.new_requirement : '' }}</span>
                    </div>
                </v-flex>
                <v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>Incumbent Name : </b>{{ item ? item.incumbent_name : '' }}</span>
                    </div>
                </v-flex>
                  <v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>Contract type	 : </b>{{ item ? item.contract_type	 : '' }}</span>
                    </div>
                </v-flex>
                  <v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>Award status		 : </b>{{ item ? item.award_status		 : '' }}</span>
                    </div>
                </v-flex>
                  <v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>naicscode	 : </b>{{ item ? item.naicscode	 : '' }}</span>
                    </div>
                </v-flex>
                <v-flex md12 xs12 class="mb-3">
                    <div>
                        <span><b>Dollar value min : </b>{{ item ? item.dollar_value_min : '' }}</span>
                    </div>
                </v-flex>
                 <v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>Dollar value max	 : </b>{{ item ? item.dollar_value_max	 : '' }}</span>
                    </div>
                </v-flex>
                 <v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>Point of contact name : </b>{{ item ? item.point_of_contact_name		 : '' }}</span>
                    </div>
                </v-flex>
                <v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>Estimated fiscal year : </b>{{ item ? item.estimated_fiscal_year			 : '' }}</span>
                    </div>
                </v-flex>
                <v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>Point of contact email	: </b>{{ item ? item.point_of_contact_email			 : '' }}</span>
                    </div>
                </v-flex>
                <v-flex md12 xs12 class="mb-3">
                    <div>
                        <span><b>Estimated fiscal year quarter	: </b>{{ item ? item.estimated_fiscal_year_quarter			 : '' }}</span>
                    </div>
                </v-flex>
                 <v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>Funding Source : </b>{{ item ? item.funding_source : '' }}</span>
                    </div>
                </v-flex>
                <v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>Contract Type: </b>{{ item ? item.contract_type : '' }}</span>
                    </div>
                </v-flex>
              <v-flex md6 xs12 class="mb-3">
                <div>
                  <span><b>Estimated Fiscal year: </b>{{ item && item.estimated_fiscal_year ? item.estimated_fiscal_year : ''  }}</span>
                </div>
              </v-flex>
              <v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>Funding source: </b>{{ item ? item.funding_source : '' }}</span>
                    </div>
                </v-flex>
                  <v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>Place of performance city	: </b>{{ item ? item.place_of_performance_city	 : '' }}</span>
                    </div>
                </v-flex>
                  <v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>Advisor name	: </b>{{ item ? item.advisor_name	 : '' }}</span>
                    </div>
                </v-flex>
                  <v-flex md6 xs12 class="mb-3">
                    <div>
                        <span><b>place of performance state	: </b>{{ item ? item.place_of_performance_state	 : '' }}</span>
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
              <v-flex md6 xs12 class="mb-3">
                <span><b>id: </b>{{ item && item.id	  ? item.id	 : '' }}</span>
                </v-flex>
              <v-flex md12 xs12 class="mb-3">
                <div>
                  <span><b>Description: </b>{{ item && item.description  ? item.description : '' }}</span>
                </div>
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
      console.log('*******')
      console.log(this.item)
      return Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    }
  }
}
</script>
