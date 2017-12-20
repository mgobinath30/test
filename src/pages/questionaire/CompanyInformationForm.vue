<template>
  <form @submit.prevent="onSave()">
    <v-layout row wrap>
      <v-flex x12 sm6 md4>
        <v-text-field
          label="Company Name:"
          :placeholder="user.companylegalname"
          readonly
          auto-grow
          class="pr-2"
          required
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <v-text-field
          label="Address Line 1:"
          placeholder="Address1"
          v-model="CompanyInfoForm.address1"
          auto-grow
          class="pr-2"
          required
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <v-text-field
          label="Address Line 2:"
          placeholder="Address2"
          v-model="CompanyInfoForm.address2"
          auto-grow
          class="pr-2"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <v-text-field
          label="City:"
          placeholder="city"
          v-model="CompanyInfoForm.city"
          auto-grow
          class="pr-2"
          required
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <v-text-field
          label="County:"
          placeholder="country"
          v-model="CompanyInfoForm.country"
          auto-grow
          class="pr-2"
          required
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <v-text-field
          label="Zip:"
          placeholder="zip"
          v-model="CompanyInfoForm.zip"
          auto-grow
          class="pr-2"
          required
        ></v-text-field>
      </v-flex>
       <v-flex xs12 sm6 md4>
        <v-text-field
          label="State:"
          placeholder="state"
          v-model="CompanyInfoForm.state"
          auto-grow
          class="pr-2"
          required
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md4 >
        <v-text-field
          :placeholder="user.businesswebsite"
          label="Company Website:"
          readonly
          auto-grow
          required
          class="pr-2"
        ></v-text-field>
      </v-flex>
      <v-flex x12 sm6 md4>
        <v-text-field
          label="Public Contact Name:"
          :placeholder="`${user.firstname} ${user.lastname}`"
          class="pr-2"
          readonly
          required
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <v-text-field
          label="Public Contact Phone Number:"
          placeholder="Phone Number"
          v-model="CompanyInfoForm.phonenumber"
          class="pr-2"
          required
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <v-text-field
          label="Public contact Email Address:"
          :placeholder="user.email"
          class="pr-2"
          readonly
          required
        ></v-text-field>
      </v-flex>

      <v-flex xs12>
        <v-text-field
          label="Description:"
          placeholder="Description"
          v-model="CompanyInfoForm.companydescription"
          class="pr-2"
          required
        ></v-text-field>
      </v-flex>

    </v-layout>
    <v-btn primary @click="onNext()" v-if="saved && mode==='edit'">Next</v-btn>
    <v-btn type="submit" v-if="mode==='edit'">Save</v-btn>
  </form>
</template>

<script>
  export default {
    props: ['mode', 'element', 'company'],
    data () {
      return {}
    },
    computed: {
      saved () {
        const companyDetails = this.$store.getters.getCompanyDetails
        return companyDetails.contractinginfo
      },
      user () {
        return this.$store.getters.getUserDetails
      },
      CompanyInfoForm () {
        const companyDetails = this.$store.getters.getCompanyDetails

        if (companyDetails && companyDetails.companyinfo) {
          return companyDetails
        }
        return {
          companylegalname: this.user.companylegalname,
          address1: '',
          address2: '',
          city: '',
          country: '',
          zip: '',
          state: '',
          streetaddress: this.CompanyInfoForm.address1 + ',' + this.CompanyInfoForm.address2 + ',' + this.CompanyInfoForm.city + ',' + this.CompanyInfoForm.country + ',' + this.CompanyInfoForm.zip + ',' + this.CompanyInfoForm.state,
          businesswebsite: this.user.businesswebsite,
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          phonenumber: '',
          email: this.user.email,
          companydescription: ''
        }
      }
    },
    methods: {
      onNext () {
        this.$emit('next')
      },
      onSave () {
        var company = this.user.companylegalname.toLowerCase().replace(/\s/g, '')
        console.log(company.trim())

        var details = this.CompanyInfoForm
        console.log(details)
        details.verified = false
        details.companyinfo = true
        var updates = {}
        updates[`companies/${company}`] = details
        this.$firebase.database().ref().update(updates)
          .then(() => {
            this.saved = true
          })
          .catch(
            error => {
              console.log(error)
            }
          )
      }
    }
  }
</script>
