<template>
  <v-container style="padding-top: 100px">
    <v-layout row wrap>
      <v-flex xs12 md3 hidden-xs-only hidden-sm-only>
        <user-info ></user-info>
      </v-flex>
      <v-flex xs12 md6>
        <new-activity :firstname="user.firstname"></new-activity>
        <v-divider></v-divider>
        <timeline :likes="likes" :item="item" :itemKey="key" v-for="(item, key) in feed" :key="item.postKey"></timeline>
      </v-flex>

      <v-flex xs12 md3 hidden-xs-only>
        <top5></top5>
        <TopEvents />
      </v-flex>
    </v-layout>
    <full-view-chat />
    <!-- <sidebox-chat /> -->
  </v-container>
</template>

<script>
  import NewActivity from './homepage/activity/new/FormComponent.vue'
  import Top5 from './homepage/top5/Top5.vue'
  import Timeline from './homepage/activity/Timeline.vue'
  import TopEvents from './homepage/events/Top5Events.vue'
  import SideboxChat from '@/components/chat/sideboxChat.vue'
  import FullViewChat from '@/components/chat/fullviewChat.vue'
  import UserInfo from './homepage/UserInfo.vue'
  export default {
    data () {
      return {
        dialog: true,
        count: 0,
        items: [],
        likes: {},
        feed: []
      }
    },
    components: {
      NewActivity,
      Top5,
      SideboxChat,
      Timeline,
      FullViewChat,
      TopEvents,
      UserInfo
    },
    computed: {
      user () {
        return this.$store.getters.getUserDetails
      }
    },
    mounted () {
      var self = this
      this.$firebase.database().ref().child('posts').once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          const comments = []
          let i
          let j
          const likes = []
          var childKey = childSnapshot.key
          var childData = childSnapshot.val()
          if (Number(childData.approvalstatus) === 1) {
            self.getPhotoUrl(childData.uid, self.count)
            for (j in childData.likes) {
              likes.push(j)
            }
            for (i in childData.comments) {
              comments.push(childData.comments[i])
            }
            childData.likes = likes
            self.likes[childKey] = likes
            childData.comments = comments
            self.items.push(childData)
            self.items[self.count]['postKey'] = childKey
            self.count += 1
          }
        })
        self.feed = self.items
      })
    },
    methods: {
      async getPhotoUrl (uid, index) {
        try {
          let user = await this.$firebase.database().ref('users/' + uid).once('value')
          user = user.val()
          this.items[index]['avatar'] = user.avatar
        } catch (error) {
          this.items[index]['avatar'] = 'https://randomuser.me/api/portraits/men/88.jpg'
        }
      }
    }
  }
</script>
