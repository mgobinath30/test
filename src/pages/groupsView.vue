<template>
  <v-container style="padding-top: 100px">
    <v-card>
      <v-tabs :scrollable="false" fixed>
    <v-toolbar color="cyan">
      <v-text-field
        solo
        label="Search"
        append-icon="keyboard_voice"
        prepend-icon="search"
      ></v-text-field>
      <v-tabs-bar class="transparent mb-1" slot="extension" light>
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tabs-item
          href="#tab-1"
        >
          Joined Groups
        </v-tabs-item>
        <v-tabs-item
          href="#tab-2"
        >
          Created Groups
        </v-tabs-item>
      </v-tabs-bar>
    </v-toolbar>
    <v-tabs-items>
      <v-tabs-content
        id="tab-1"
      >
        <v-card flat>
          <v-card-text>
            <v-layout row wrap>
              <v-flex class="mr-2" md2 v-for="(group, key) in joinedgroups" :key="key">
                <!-- <router-link :to="`groups/${group.groupId}`"> -->
                  <v-card>
                    <v-card-media :src="group.coverPhoto.url" height="100px"/>
                    <v-card-actions>
                      <v-btn @click="openGroup(group)" flat>
                        OPEN GROUP
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                <!-- </router-link> -->
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-tabs-content>
    </v-tabs-items>
    <v-tabs-items>
      <v-tabs-content
        id="tab-2"
      >
        <v-card flat>
          <v-card-text>
            <v-layout row wrap>
              <v-flex md2 v-for="(group, key) in createdgroups" :key="key">
                <router-link :to="`groups/${group.groupId}`">
                  <v-card>
                    <v-card-media :src="group.coverPhoto.url" height="100px"/>
                    <v-card-text primary-title>
                      {{ group.name }}
                    </v-card-text>
                  </v-card>
                </router-link>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-tabs-content>
    </v-tabs-items>
  </v-tabs>

    </v-card>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        joinedgroups: [],
        createdgroups: []
      }
    },
    mounted () {
      const self = this
      this.$firebase.database().ref('groups/').on('child_added', snap => {
        const group = snap.val()
        const groupId = snap.key.replace('-', '')
        let member = null
        if (group && group.members) {
          for (member in group.members) {
            if (member === self.user.uid) {
              self.joinedgroups.push(Object.assign({}, group, { groupId }))
            }
          }
        }
        if (group.admin.uid === self.user.uid) {
          self.createdgroups.push(Object.assign({}, group, { groupId }))
        }
      })
    },
    methods: {
      openGroup (group) {
        this.$router.push(`groups/${group.groupId}`)
      }
    },
    computed: {
      user () {
        return this.$store.getters.getUserDetails
      }
    }
  }
</script>

<style>

</style>
