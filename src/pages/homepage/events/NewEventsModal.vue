<template>
  <v-dialog v-model="dialog" width="600px" persistent :fullscreen="screenWidth<600" transition="scale-transition" >
    <v-card>
      <v-alert
        color="success"
        icon="check_circle"
        :value="alert"
        transition="scale-transition">
        Event has been saved and submitted for Review
      </v-alert>
      <v-card-title>
        <span class="headline">Add new Event</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout column align-center justify-center>
            <form @submit.prevent="save">
              <v-layout row wrap>
                <v-flex xs12 md6>
                  <v-text-field label="Event Title" required v-model="event.title" prepend-icon="mdi-textbox"></v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                  <v-menu lazy :close-on-content-click="false" v-model="datepickermenu" transition="scale-transition" offset-y full-width :nudge-left="40" max-width="290px">
                    <v-text-field slot="activator" required label="Event Date" v-model="event.eventdate" readonly prepend-icon="event"></v-text-field>
                    <v-date-picker v-model="event.eventdate" no-title scrollable>
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
                  <v-menu lazy :close-on-content-click="false" v-model="timepickermenu" transition="scale-transition" offset-y full-width :nudge-left="40" max-width="290px">
                    <v-text-field slot="activator" required label="Start Time" v-model="event.starteventtime" readonly prepend-icon="event"></v-text-field>
                    <v-time-picker v-model="event.starteventtime" scrollable actions>
                      <template scope="{ save, cancel }">
                        <v-card-actions>
                          <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                          <v-btn flat primary @click.native="save()">Save</v-btn>
                        </v-card-actions>
                      </template>
                    </v-time-picker>
                  </v-menu>
                </v-flex>
                  <v-flex xs12 md6>
                  <v-menu lazy :close-on-content-click="false" v-model="endtimepickermenu" transition="scale-transition" offset-y full-width :nudge-left="40" max-width="290px">
                    <v-text-field slot="activator" required label="End Time" v-model="event.endeventtime" readonly prepend-icon="event"></v-text-field>
                    <v-time-picker v-model="event.endeventtime" scrollable actions>
                      <template scope="{ save, cancel }">
                        <v-card-actions>
                          <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                          <v-btn flat primary @click.native="save()">Save</v-btn>
                        </v-card-actions>
                      </template>
                    </v-time-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="Event Location" required v-model="event.location" prepend-icon="mdi-google-maps"></v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="Event Link" v-model="event.link" prepend-icon="link"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-text-field multi-line rows="3" required v-model="event.description" prepend-icon="mdi-file-document" label="Event Description">
                </v-text-field>
              </v-layout>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1"  flat @click.prevent="dialog=false">Close</v-btn>
                <v-btn type="submit" color="blue darken-1" flat>Save</v-btn>
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
        alert: false,
        datepickermenu: false,
        timepickermenu: false,
        endtimepickermenu: false,
        event: {
          submitdate: null,
          user: this.$store.getters.getUserDetails,
          title: '',
          starteventtime: null,
          endeventtime: null,
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
    props: ['trigger'],
    methods: {
      save (data) {
        let event = this.event
        const self = this
        event.submitdate = Date.now() 
        this.$firebase.database().ref('events').push().set(event).then((snap) => {
          self.dialog = false
          this.alert = true
          this.event.title = ''
        })
      }
    },
    computed: {
      dialog () {
        return this.trigger
      },
      screenWidth () {
        return Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
      }
    }
  }
</script>
