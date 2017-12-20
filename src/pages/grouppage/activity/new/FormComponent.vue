<template>
  <v-form class="">
    <v-layout row align-center justify-center>
        <v-flex xs12 row wrap style="display: table-cell;" >
          <v-card class="mb-0 pb-0">

              <v-text-field
                full-width
                multi-line
                single-line
                rows="2"
                label="Add a comment or upload file"
                v-model="content"
                style="padding-bottom: 0px;height:100%"
              >
              </v-text-field>

          </v-card>
          <v-card v-if="activityPhotoFile!=''" class="mt-0 pt-0">
            <div style="width:100%">
              <v-btn icon class="" id='close' @click.prevent="cancelActivityPhoto()">
                <v-icon style="font-size: 15px;" >close</v-icon>
              </v-btn>

            <img :src="activityPhotoFileURL" id="imgActivity" style="">
            </div>
          </v-card>
          <v-card class="light-blue darken-2" >
            <v-card-actions style="height:35px;">
              <v-btn icon dark @click.prevent="activityPhotoUploaded=true">
                <v-icon>add_a_photo</v-icon>
              </v-btn>
              <v-btn flat dark style="float: right" @click.prevent="postActivity()">
                POST
              </v-btn>
              <file-upload :trigger="activityPhotoUploaded" @cancel="activityPhotoUploaded=false;activityPhotoFile=''" :formats="['jpeg','png','jpg']" v-model="activityPhotoFile" @confirm="showActivityPhoto()"></file-upload>

            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    <v-card flat>

    </v-card>

  </v-form>
</template>

<script>
  import FileUpload from '../../../../components/FileUploadComponent.vue'
  export default {
    components: {
      FileUpload
    },
    data () {
      return {
        activityPhotoUploaded: false,
        activityPhotoFile: '',
        activityPhotoFileName: '',
        activityPhotoFileURL: '',
        content: ''
      }
    },
    props: ['firstname', 'groupId'],
    computed: {
      company () {
        return this.$store.getters.getCompanyDetails
      },
      companyVerified () {
        return this.company.verified
      },
      companyAdded () {
        return this.company.otherinfo
      },
      user () {
        return this.$store.getters.getUserDetails
      }
    },
    methods: {
      validateVideoUrl (text) {
        var type = null
        var embedUrl = null
        text.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/) // eslint-disable-line

        if (RegExp.$3.indexOf('youtu') > -1) {
          type = 'youtube'
          embedUrl = `https://www.youtube.com/embed/${RegExp.$6}?autoplay=0`
        } else if (RegExp.$3.indexOf('vimeo') > -1) {
          type = 'vimeo'
          embedUrl = `https://player.vimeo.com/video/${RegExp.$6}?color=ef0000`
        }

        if (!type) {
          return undefined
        }
        return {
          type: type,
          id: RegExp.$6,
          embedUrl
        }
      },
      showActivityPhoto () {
        console.log(this.activityPhotoFile)
        if (FileReader && this.activityPhotoFile && this.activityPhotoFile.length) {
          var fr = new FileReader()
          fr.onload = function () {
            this.activityPhotoFileURL = fr.result
            document.getElementById('imgActivity').src = fr.result
          }
          fr.readAsDataURL(this.activityPhotoFile[0])
        } else {
        }
        console.log(this.activityPhotoFile[0])
        this.activityPhotoFileName = this.activityPhotoFile[0].name
        this.activityPhotoUploaded = false
      },
      cancelActivityPhoto () {
        this.activityPhotoUploaded = false
        this.activityPhotoFile = ''
        this.activityPhotoFileName = ''
        this.activityPhotoFileURL = ''
      },
      async postActivity () {
        if (this.content === '') {
          let snackbar = {
            active: true,
            text: 'Please enter something'
          }
          this.$store.dispatch('triggerSnackbar', snackbar)
          return null
        }
        var newPostKey = this.$firebase.database().ref().child('posts').push().key
        var storageRef = this.$firebase.storage().ref()
        var attachmentRef = storageRef.child(`groupposts/${newPostKey}/attachment.jpg`)
        try {
          if (this.activityPhotoFileName !== '') {
            await attachmentRef.put(this.activityPhotoFile[0])
          }
        } catch (error) {
          let snackbar = {
            active: true,
            text: error.message
          }
          this.$store.dispatch('triggerSnackbar', snackbar)
          return null
        }
        var attachmentUrl = ''
        try {
          if (this.activityPhotoFileName !== '') {
            attachmentUrl = await storageRef.child(`groupposts/${newPostKey}/attachment.jpg`).getDownloadURL()
          }
        } catch (error) {
          let snackbar = {
            active: true,
            text: error.message
          }
          this.$store.dispatch('triggerSnackbar', snackbar)
          return null
        }

        let video = null

        if (this.validateVideoUrl(this.content)) {
          video = this.validateVideoUrl(this.content)
        }
        var post = {
          group: this.groupId,
          posteddate: 1 * (new Date().getTime()),
          jobtitle: this.user.jobtitle,
          companylegalname: this.user.companylegalname,
          dunsnumber: this.company.dunsnumber || '',
          firstname: this.user.firstname,
          avatar: this.user.avatar,
          lastname: this.user.lastname,
          uid: this.user.uid,
          video,
          content: this.content,
          attatchmentUrl: attachmentUrl,
          approvalstatus: 0,
          approvaldate: ''
        }
        try {
          await this.$firebase.database().ref('groupposts/' + newPostKey).setWithPriority(post, -1 * Date.now())
          this.content = ''
          this.cancelActivityPhoto()
          let snackbar = {
            active: true,
            text: 'Post was created successfully, but needs to be approve by the admin'
          }
          this.$store.dispatch('triggerSnackbar', snackbar)
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

<style>
  #imgActivity {
    border-style: dotted;
    border-width: 2px;
    height:100px;
    padding:15px;
    margin:5px;
    border-color: gainsboro;
  }
  #close {
    float:left;
    display:inline-block;
    padding:5px 5px;



  }
</style>
