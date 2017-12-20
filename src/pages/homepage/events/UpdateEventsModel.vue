<template>

  <v-dialog v-model="dialog1" width="600px" persistent :fullscreen="screenWidth<600" transition="scale-transition" >
    <v-card>
      <v-card-title>
        <span class="headline">Update Events</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout column align-center justify-center>
            <form @submit.prevent="save">
              <v-layout row wrap>
                <v-flex xs12 md6>
                  <v-text-field label="Event Title" required v-model="item.title" prepend-icon="mdi-textbox" :disabled="accesslevel"></v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                  <v-menu lazy :close-on-content-click="false" :disabled="accesslevel" v-model="datepickermenu" transition="scale-transition" offset-y full-width :nudge-left="40" max-width="290px">
                    <v-text-field slot="activator" required label="Event Date" v-model="item.eventdate" readonly prepend-icon="event"></v-text-field>
                    <v-date-picker v-model="item.eventdate" no-title scrollable>
                      <template scope="{ save, cancel }">
                        <v-card-actions>
                          <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                          <v-btn flat primary @click.native="save()">Save</v-btn>
                        </v-card-actions>
                      </template>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>

              <v-layout row wrap>
                <v-flex xs12 md6>
                  <v-menu lazy :close-on-content-click="false" :disabled="accesslevel" v-model="timepickermenu" transition="scale-transition" offset-y full-width :nudge-left="40" max-width="290px">
                    <v-text-field slot="activator" required label="Event Time" v-model="item.eventtime" readonly prepend-icon="event"></v-text-field>
                    <v-time-picker v-model="item.eventtime" scrollable actions>
                      <template scope="{ save, cancel }">
                        <v-card-actions>
                          <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                          <v-btn flat primary @click.native="save()" >Save</v-btn>
                        </v-card-actions>
                      </template>
                    </v-time-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="Event Location" :disabled="accesslevel" required v-model="item.location" prepend-icon="mdi-google-maps"></v-text-field>
                </v-flex>
                <v-flex xs12 md12>
                  <v-text-field label="Event Link" :disabled="accesslevel" v-model="item.link" prepend-icon="link"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-text-field multi-line rows="3" :disabled="accesslevel"  required v-model="item.description" prepend-icon="mdi-file-document" label="Event Description">
                </v-text-field>
              </v-layout>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1"  flat @click.prevent="openModal=false">Close</v-btn>
                <v-btn type="submit" color="blue darken-1" flat :disabled="accesslevel">Update</v-btn>
              </v-card-actions>
            </form>
          </v-layout>

        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>

</template>

<script>
  import 'mdi/css/materialdesignicons.min.css'

  export default {
    data () {
      return {
        openModal: this.$props.dialog1,
        datepickermenu: false,
        timepickermenu: false,
        accesslevel: true,
        event: {
          submitdate: null,
          user: this.$store.getters.getUserDetails,
          title: '',
          eventtime: null,
          eventdate: null,
          location: '',
          description: '',
          link: '',
          attatchment1: '',
          attatchment2: '',
          approvalstatus: 0,
          approvaldate: ''
        }
      }
    },
    props: ['trigger', 'dialog1', 'item'],
    methods: {
      save () {
        this.$firebase.database().ref('events/' + this.item.postKey).update({
          'title': this.item.title
        })
      }
    },
    mounted () {
      //alert(JSON.stringify(this.item.user))
      //if( this.trigger !== false){
      //alert(this.trigger)
      //alert(JSON.stringify(this.item.user))
      //if (this.event.user === this.item.user.uid) {
        //this.accesslevel = true
      //}
      //}
      this.$firebase.database().ref(`events`).on('value', function (snapshot) {
        console.log('gobinath')
        console.log(snapshot.val())
      })
    },
    computed: { 
      dialog () {
        return this.trigger
      },
      user () {
        return this.$store.getters.getUserDetails
      },
      screenWidth () {
        return Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
      }
    }
  }
</script>
