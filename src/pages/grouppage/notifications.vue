<template>
  <v-container>
    <v-layout wrap row>
      <v-flex md9 offset-md2 mb-2>
          <v-card>
            <!-- <v-card-text> -->
                <v-layout wrap row>
                    <!-- <img :src="props.item.avatar" :alt="props.item.firstname + ' ' + props.item.lastname"> -->
                    <v-flex md12>
                        <v-list two-line subheader>
                            <v-subheader inset>Join requests</v-subheader>
                            <v-list-tile avatar v-for="item in notifications" v-bind:key="item.uid">
                                <v-list-tile-avatar>
                                    <img :src="item.avatar" />
                                    <!-- <v-icon>close</v-icon> -->
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                <v-list-tile-title>{{ item.firstname + ' ' + item.lastname }}</v-list-tile-title>
                                <v-list-tile-sub-title>{{ item.jobtitle + ' at ' + item.companylegalname }}</v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-layout>
                                        <v-flex md6>
                                            <v-btn @click="accept(item)" color="green" ripple flat>
                                                ACCEPT
                                            </v-btn>
                                        </v-flex>
                                        <v-flex md6>
                                            <v-btn @click="deny(item)" color="red" ripple flat>
                                                DENY
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list>
                    </v-flex>
                </v-layout>
          </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        notifications: []
      }
    },
    props: ['groupId'],
    methods: {
      accept (user) {
        user.approvalStatus = 1
        this.$firebase.database().ref(`groups/-${this.groupId}/members/${user.uid}`).set(user)
      },
      deny (user) {
        this.$firebase.database().ref(`groups/-${this.groupId}/members/${user.uid}`).set({})
      }
    },
    mounted () {
      const self = this
      this.$firebase.database().ref(`groups/-${this.groupId}/members`).on('value', snap => {
        self.notifications = []
        snap.forEach(childSnap => {
          const member = childSnap.val()
          if (member && member.approvalStatus === 0) {
            self.notifications.push(member)
          }
        })
      })
    }
  }
</script>

<style>

</style>
