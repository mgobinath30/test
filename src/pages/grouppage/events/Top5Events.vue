<template>
    <span>
      <v-container class="pt-0">
      <v-card>
        <v-card-title style="background-color: #424242;color:#fff" dark>
          <v-layout>
            <v-flex md7 style="font-size: 13px;padding-top: 5px;">
              UPCOMING EVENTS
            </v-flex>
          </v-layout>
          
        </v-card-title>

        <v-list two-line subheader>
          <v-list-tile avatar v-for="event in events" v-bind:key="event.title">
            <v-list-tile-avatar>
              <v-icon class="grey lighten-1 white--text">mdi-calendar-check</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title style="font-size: 13px;">{{ event.title.toString().toUpperCase()}}</v-list-tile-title>
              <v-list-tile-sub-title style="font-size: 13px;">{{ event.eventdate }} {{ event.eventtime }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-container>
    <calendar-modal :dialog="openCalendarModal" />
    <new-event-modal :close="close" :groupId="groupId" :trigger="openEventModal" />
    </span>
</template>

<script>
  import 'mdi/css/materialdesignicons.min.css'
  import NewEventModal from './NewEventsModal.vue'
  import CalendarModal from '@/components/modal/calendarModal.vue'

  export default {
    props: ['groupId'],
    components: {
      NewEventModal,
      CalendarModal
    },
    data () {
      return {
        openCalendarModal: false,
        openEventModal: false,
        items: [],
        events: [],
        count: 0
      }
    },
    methods: {
      close () {
        this.$emit('togglemodal', false)
      },
      openNewModal () {
        this.openEventModal = true
      },
      openCalendar () {
        this.openCalendarModal = true
      }
    },
    computed: {
      user () {
        return this.$store.getters.getUserDetails
      }
    },
    mounted () {
      const self = this
      this.$on('togglemodal', (val) => {
        this.dialog = val
      })
      this.$on('cancel', () => {
        self.openEventModal = false
        self.openCalendarModal = false
      })
      this.$firebase.database().ref(`groupevents/${this.groupId}`).orderByChild('submitdate').limitToFirst(5).on('value', (snap) => {
        self.items = []
        self.events = []
        snap.forEach((childSnapshot) => {
          const childKey = childSnapshot.key
          let childData = childSnapshot.val()
          if (childData.approvalstatus === 1) {
            self.items.push(childData)
            self.items[self.count]['postKey'] = childKey
          }
        })
        self.events = self.items
      })
    }
  }
</script>
