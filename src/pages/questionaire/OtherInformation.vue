<template>
  <v-form @submit.prevent="onSave()">
    <v-layout row wrap>
      <v-flex xs12>
        <v-text-field
          label="Specialties:"
          placeholder="Enter Specialties:"
          v-model="OtherInfoForm.specialties"
          required
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field
          label="Capabilities:"
          placeholder="Enter Capabilities:"
          v-model="OtherInfoForm.capabilities"
          required
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <p style="font-size: medium">Upload Capibilities Statement
          <v-btn
            label="Upload"
            @click.prevent = "statementUploaded = true"
            class="ml-5"
          >Upload</v-btn>
          <caption style="width:auto">{{statementFileName}}</caption>


          <file-upload :trigger="statementUploaded" @cancel="statementUploaded=false;statementFile=''"
                       :formats="['docx','doc','pdf']" v-model="statementFile"
                       @confirm="statementFileName=statementFile[0].name;statementUploaded=false"></file-upload>

        </p>


      </v-flex>

      <v-flex xs12>
        <p style="font-size: medium">Upload Company Logo
          <v-btn
            label="Upload"
            @click.prevent = "logoUploaded = true"
            class="ml-5"
          >Upload</v-btn>
          <caption>{{logoFileName}}</caption>

          <file-upload :trigger="logoUploaded" @cancel="logoUploaded=false;logoFile=''" :formats="['jpeg','png','jpg']" v-model="logoFile" @confirm="logoFileName=logoFile[0].name;logoUploaded=false"></file-upload>

        </p>

      </v-flex>
    </v-layout>
    <v-btn success @click.native="onPrevious">Previous</v-btn>
    <v-btn type="submit" primary>Submit</v-btn>
  </v-form>
</template>

<script>
  import FileUpload from '../../components/FileUploadComponent.vue'
  export default {
    components: {
      FileUpload
    },
    data () {
      return {
        logoUploaded: false,
        statementUploaded: false,
        logoFile: '',
        statementFile: '',
        statementFileName: '',
        logoFileName: ''
      }
    },
    computed: {
      OtherInfoForm: {
        get () {
          const companyDetails = this.$store.getters.getCompanyDetails
          return Object.assign({}, companyDetails)
        }
      },
      user () {
        return this.$store.getters.getUserDetails
      }
    },
    methods: {
      onPrevious () {
        this.$emit('previous')
      },
      async onSave () {
        var company = this.user.companylegalname.toLowerCase().replace(/\s/g, '')
        var details = this.OtherInfoForm
        details.otherinfo = true
        if (this.logoFileName === '') {
          let snackbar = {
            active: true,
            text: 'Upload a valid image file for logo'
          }
          this.$store.dispatch('triggerSnackbar', snackbar)
          return
        }
        if (this.statementFileName === '') {
          let snackbar = {
            active: true,
            text: 'Upload a valid file for  statements'
          }
          this.$store.dispatch('triggerSnackbar', snackbar)
          return
        }

        details.companylogo = await this.uploadLogo(company)
        console.log(details.companylogo)
        if (details.companylogo == null) {
          return
        }

        details.capabilitiesstatement = await this.uploadStatement(company)
        console.log(details.companylogo)
        if (details.capabilitiesstatement == null) {
          return
        }

        this.$firebase.database().ref(`companies/${company}`).update(details)
          .then(() => {
            let snackbar = {
              active: true,
              text: 'The company entered by you is successfully submitted'
            }
            this.$store.dispatch('triggerSnackbar', snackbar)
            this.$router.push('/company/' + company)
          })
          .catch(
            error => {
              console.log(error)
            }
          )
      },
      onSubmit () {
      },
      async uploadLogo (company) {
        var storageRef = this.$firebase.storage().ref()
        var logoRef = storageRef.child(`companies/${company}/logo.jpg`)
        try {
          await logoRef.put(this.logoFile[0])
        } catch (error) {
          let snackbar = {
            active: true,
            text: error.message
          }
          this.$store.dispatch('triggerSnackbar', snackbar)
          return null
        }
        try {
          console.log('here')
          var logoUrl = await storageRef.child(`companies/${company}/logo.jpg`).getDownloadURL()
          return logoUrl
        } catch (error) {
          let snackbar = {
            active: true,
            text: error.message
          }
          this.$store.dispatch('triggerSnackbar', snackbar)
          return null
        }
      },
      async uploadStatement (company) {
        var storageRef = this.$firebase.storage().ref()
        var ext = '.pdf'
        var type = this.statementFile[0].type.split('/')[1].toLowerCase()
        if (type === 'msword') {
          ext = '.doc'
        }
        var statementRef = storageRef.child(`companies/${company}/statement${ext}`)
        try {
          await statementRef.put(this.statementFile[0])
        } catch (error) {
          let snackbar = {
            active: true,
            text: error.message
          }
          this.$store.dispatch('triggerSnackbar', snackbar)
          return null
        }
        try {
          var statementUrl = await storageRef.child(`companies/${company}/statement${ext}`).getDownloadURL()
          return statementUrl
        } catch (error) {
          let snackbar = {
            active: true,
            text: error.message
          }
          this.$store.dispatch('triggerSnackbar', snackbar)
          return null
        }
      }
    }
  }
</script>


