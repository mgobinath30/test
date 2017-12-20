<template>
  <v-dialog :max-width="400" v-model="dialog">
      <v-card>
          <v-card-title>
              <h5> Create Group</h5>
          </v-card-title>
          <form @submit.prevent="createGroup">
            <v-card-text style="margin-top: -30px;">
                <v-layout wrap row>
                    <v-flex md12>
                        <v-text-field v-model="group.name" required type="text" label="Group name" />
                    </v-flex>
                    <v-flex md12>
                        <v-select
                        style="margin-top: 0;"
                        label="Select privacy"
                        required
                        return-object
                        v-model="group.privacy"
                        :items="[{ text: 'Public Group', value: 1 }, { text: 'Closed Group', value: 2 }]"
                        />
                    </v-flex>
                    <v-flex md12 style="margin-top: -10px;">
                        <v-text-field v-model="group.description" style="margin-top: 0px;" required multi-line label="Group decription" />
                    </v-flex>
                </v-layout>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type="submit" class="white--text" color="blue darken-1">Create</v-btn>
            </v-card-actions>
          </form>
      </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data () {
      return {
        group: {
          name: '',
          members: {},
          coverPhoto: {
            url: 'https://static.pexels.com/photos/380769/pexels-photo-380769.jpeg',
            backgroundPosition: {
              x: '',
              y: ''
            }
          },
          privacy: '',
          description: '',
          admin: {},
          posts: [],
          notifications: []
        }
      }
    },
    watch: {
      dialog (val) {
        if (!val) {
          this.$store.dispatch('toggleGroupModal', val)
        }
      }
    },
    computed: {
      dialog: {
        set (val) {
          if (!val) {
            return this.$store.dispatch('toggleGroupModal', val)
          }
          return this.$store.getters.openGroupModal
        },
        get () {
          return this.$store.getters.openGroupModal
        }
      },
      user () {
        return this.$store.getters.getUserDetails
      }
    },
    methods: {
      async createGroup () {
        let group = this.group
        group.admin = this.user
        group.members[this.user.uid] = Object.assign({}, this.user, { approvalStatus: 1, admin: true })
        const newGroupKey = this.$firebase.database().ref().child('postgroups').push().key
        await this.$firebase.database().ref(`groups/${newGroupKey}`).set(group)
        this.$router.push(`/groups/${newGroupKey.replace('-', '')}`)
        const snackbar = {
          active: true,
          text: 'Group successfully created.'
        }
        this.group = {
          name: '',
          members: {},
          coverPhoto: {
            url: 'https://static.pexels.com/photos/380769/pexels-photo-380769.jpeg',
            backgroundPosition: {
              x: '',
              y: ''
            }
          },
          privacy: {},
          description: '',
          admin: {},
          posts: [],
          notifications: []
        }
        this.$store.dispatch('toggleGroupModal', false)
        this.$store.dispatch('triggerSnackbar', snackbar)
      }
    }
  }
</script>

<style>

</style>
