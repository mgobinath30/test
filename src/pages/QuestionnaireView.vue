<template>

  <v-container>
    <v-layout row wrap>

      <v-flex xs12>
          <v-layout row wrap>
            <v-flex xs12>
              <h5 v-if="e1===1">Company Information</h5>
              <v-card-title v-if="e1===2"><h5>Contracting Information</h5></v-card-title>
              <v-card-title v-if="e1===3"><h5>Other Information</h5></v-card-title>

              <p  v-if="e1===1">Georgia Directory is limited to Georgia based companies and companies working on DOD
                Contracts executes in Georgia and their subcontractors. Edits are activated weekly following review.
                Use the "Save" button at the bottom if you need to return later to complete.</p>
            </v-flex>
            <v-flex xs12>
              <v-stepper v-model="e1">
                <v-stepper-header>
                  <v-stepper-step step="1" :complete="e1 > 1" >Company Information</v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step step="2" :complete="e1 > 2" >Contracting Information</v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step step="3">Other Information</v-stepper-step>
                </v-stepper-header>
                <v-stepper-content step="1">
                  <company-information :element="e1" :company="companyDetails" class="mx-2 my-2" @next="e1 = 2" :mode="'edit'"></company-information>
                </v-stepper-content>
                <v-stepper-content step="2">
                  <contracting-information :element="e1" :company="companyDetails" class="mx-2 my-2" @previous="e1 = 1" @next="e1 = 3"></contracting-information>

                </v-stepper-content>
                <v-stepper-content step="3">
                  <other-information :element="e1" :company="companyDetails" @previous="e1 = 2" class="mx-2 my-2"></other-information>
                </v-stepper-content>
              </v-stepper>
            </v-flex>


          </v-layout>


      </v-flex>
    </v-layout>
    <!-- <sidebox-chat /> -->
    <full-view-chat />
  </v-container>

</template>


<script>
  import SideboxChat from '@/components/chat/sideboxChat.vue'
  import FullViewChat from '@/components/chat/fullviewChat.vue'
  import CompanyInformation from './questionaire/CompanyInformationForm.vue'
  import ContractingInformation from './questionaire/ContractingInformationForm.vue'
  import OtherInformation from './questionaire/OtherInformation.vue'
  export default {
    components: {
      SideboxChat,
      FullViewChat,
      CompanyInformation,
      OtherInformation,
      ContractingInformation
    },
    computed: {
      company: {
        get: function () {
          return this.$store.getters.getUserDetails.companylegalname
        }
      }
    },
    watch: {
      company: function () {
        this.getCompanyDetails()
      }
    },
    mounted () {
      this.getCompanyDetails()
    },
    methods: {

      getCompanyDetails () {
        var companylegalname = this.$store.getters.getUserDetails.companylegalname.toLowerCase().replace(/\s/g, '')
        this.$firebase.database().ref(`/companies/${companylegalname}`).once('value')
          .then(
            snapshot => {
              var data = snapshot.val()
              if (data !== null && data !== 'undefined') {
                if (data.verified === true) {
                  let snackbar = {
                    active: true,
                    text: 'The company entered by you is verified by the admin.'
                  }
                  this.$store.dipatch('triggerSnackbar', snackbar)
                }

                if (data['companyinfo'] === true && data['contractinginfo'] === true && data['otherinfo'] === true) {
                  let snackbar = {
                    active: true,
                    text: 'You have already entered a company. It is awaiting moderation. '
                  }
                  this.$store.dispatch('triggerSnackbar', snackbar)
                } else if (data['companyinfo'] === true) {
                  if (data['contractinginfo'] === true) {
                    this.companyDetails = data
                    this.e1 = 3
                  } else {
                    this.companyDetails = data
                    this.e1 = 2
                  }
                } else if (!data['companyinfo']) {
                  this.companyDetails = data
                  this.el = 1
                }
              }
            }
          )
          .catch(
            error => {
              this.snackbar.active = true
              this.snackbar.text = error.message
            }
          )
      }
    },
    data () {
      return {
        e1: 1,
        companyDetails: {},
        snackbar: {
          active: false,
          text: ''
        },
        load: this.$store.getters.getInitializing
      }
    }
  }
</script>
