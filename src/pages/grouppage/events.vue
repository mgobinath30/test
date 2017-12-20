<template>
  <v-card>
    <v-card-text>
      <v-layout row wrap>
          <v-flex md12>
            <v-btn @click.prevent="openModal" style="float: right" color="primary">
                Add event
            </v-btn>
          </v-flex>
          <v-flex md12>
            <full-calendar :events="events" />
          </v-flex>
      </v-layout>
    </v-card-text>
    <new-events-modal :groupId="groupId" :close="close" :trigger="dialog" />
  </v-card>
</template>

<script>
  import FullCalendar from 'vue-fullcalendar'
  import NewEventsModal from './events/NewEventsModal.vue'

  export default {
    props: ['groupId'],
    data () {
      return {
        dialog: false,
        events: [],
        items: [],
        count: 0
      }
    },
    components: {
      FullCalendar,
      NewEventsModal
    },
    methods: {
      close () {
        this.dialog = false
        this.$emit('togglemodal', false)
      },
      openModal () {
        this.dialog = true
      }
    },
    mounted () {
      const self = this
      this.$on('togglemodal', (val) => {
        this.dialog = val
      })

      this.$firebase.database().ref(`groupevents/${this.groupId}`).orderByChild('submitdate').limitToFirst(5).on('value', (snap) => {
        self.items = []
        self.events = []
        snap.forEach((childSnapshot) => {
          const childKey = childSnapshot.key
          console.log(childSnapshot.val())
          let childData = childSnapshot.val()
          if (childData.approvalstatus === 1) {
            childData.postKey = childKey
            self.items.push({
              title: childData.title,
              start: childData.eventdate
            })
          }
        })
        self.events = self.items
      })
    }
  }
</script>

<style>
    .comp-full-calendar {
        max-width: none !important;
        padding: 0px !important
    }
</style>
