<template>
  <div>
    <v-card class="my-3">
      <v-list two-line dense class="">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img :alt="item && item.avatar ? item.avatar : 'default-avatar.gif'" :src="item && item.avatar ? item.avatar : require('@/assets/images/default-avatar.gif')">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.firstname + ' ' + item.lastname}}</v-list-tile-title>
            <v-list-tile-sub-title>{{ item.jobtitle }} <span v-if="item.jobtitle">|</span> {{ item.companylegalname }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action v-bind:class="{ 'icon-red': likes[item.postKey] && likes[item.postKey].includes(getUserDetails.uid) }">
              <v-icon style="cursor: pointer" @click.prevent="likePost(item, itemKey)">mdi-thumb-up</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-layout class="px-3 mb-3">
        {{item.content}}
      </v-layout>
      <v-layout row wrap>
        <v-flex v-if="item.video" :class="{ 'xs12': true, 'md6': item.video && item.attatchmentUrl, 'md12': item.video && !item.attatchmentUrl}">
          <iframe allowfullscreen style="width: 100%; height: 260px;border:0px" :src="item.video.embedUrl"></iframe>
        </v-flex>
        <v-flex v-if="item.attatchmentUrl" :class="{ 'xs12': true, 'md6': item.attatchmentUrl && item.video, 'md12': item.attatchmentUrl && !item.video  }" class="background-image" :style="{ 'backgroundImage': `url(${item.attatchmentUrl})` }">
        </v-flex>
      </v-layout>
      <v-layout>
      </v-layout>
      <v-layout row>
        <v-flex md12>
          <v-subheader class="pl-0"><span class="pl-3" style="font-weight: 400;color:#6d6767;font-size: 13px;"><a style="cursor: pointer" @click.prevent="toggleComments">Comments ({{ item.comments.length || 0 }})</a> <span>·</span> Likes ({{ item.likes.length }})</span></v-subheader>
          <v-divider class="mt-0 px-2"></v-divider>
        </v-flex>
      </v-layout>
      <!-- <v-layout>
        <v-flex md12 class="pt-2 pr-2">
          
        </v-flex>
      </v-layout> -->
      <v-list three-line dense style="margin-top:-18px;" :class="{ 'hidden': !showComments }" v-if="item.comments.length > 0">
        <v-list-tile avatar v-for="comment in  item.comments" v-bind:key="comment.comment">
          <v-list-tile-avatar>
            <img :alt="comment && comment.user.avatar ? comment.user.avatar : 'default-avatar.gif'" :src="comment && comment.user.avatar ? comment.user.avatar : require('@/assets/images/default-avatar.gif')">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ comment.user.firstname + ' ' + comment.user.lastname}}</v-list-tile-title>
            <v-list-tile-sub-title>{{ comment.comment }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
             <span>{{ comment.date | fromNow }}</span>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-divider :class="{ 'hidden': !showComments }" v-if="item.comments.length > 0"></v-divider>
      <v-layout row wrap>
        <v-flex md9 xs12 sm12>
          <v-text-field class="mt-0" full-width single-line label="Leave a comment" v-model="comment" style="padding-bottom: 0px;height:100%">
          </v-text-field>
        </v-flex>
        <v-flex md3 xs12 sm12>
          <div class="text-xs-center pt-2" style="float: right">
            <v-btn @click.prevent="postComment(item.postKey)" round color="primary" dark>Comment</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import 'mdi/css/materialdesignicons.min.css'

  export default {
    props: ['item', 'itemKey', 'likes'],
    data () {
      return {
        comment: '',
        showComments: false,
        count: 0,
        items: [],
        feed: [],
        user: this.getUserDetails
      }
    },
    computed: {
      ...mapGetters([
        'getUserDetails'
      ])
    },
    methods: {
      likePost (item, key) {
        const self = this

        this.$firebase.database().ref(`posts/${item.postKey}/likes/${this.getUserDetails.uid}`).set(this.getUserDetails.uid).then((snap) => {
          self.likes[item.postKey].push(this.getUserDetails.uid)
          console.log(item.postKey, self.likes, 'check')
        })
      },
      async postComment (postKey) {
        if (this.comment === '') {
          let snackbar = {
            active: true,
            text: 'Please enter something'
          }
          this.$store.dispatch('triggerSnackbar', snackbar)
          return null
        }
        const comment = {
          user: this.getUserDetails,
          comment: this.comment,
          date: Date.now()
        }
        await this.$firebase.database().ref(`posts/${postKey}/comments`).push().set(comment).then((snapshot) => {
          this.comment = ''
        })
      },
      toggleComments () {
        if (this.showComments) {
          this.showComments = false
          return false
        }
        this.showComments = true
        return true
      },
      async getPhotoUrl (uid, index) {
        try {
          let user = await this.$firebase.database().ref('users/' + uid).once('value')
          user = user.val()
          this.items[index]['avatar'] = user.avatar
        } catch (error) {
          console.log(error)
          this.items[index]['avatar'] = 'https://randomuser.me/api/portraits/men/88.jpg'
        }
      }
    }
  }

</script>
<style>
  .background-image {
    background-position-y: center;
    background-size: cover;
    background-repeat: no-repeat;
    top: 0;
    left: 0;
    right: 0;
    height: 260px;
    bottom: 0;
  }

  .icon-red i {
    color: #ff1b00 !important;
  }

  .icon-blue i {
    color: #0388d1 !important;
  }

  .com-like {
    background: rgb(66, 66, 66);
    color: #fff;
    padding-top: 6px;
    border-radius: 0px 20px 20px 0px;
    padding-right: 17px;
    padding-bottom: 6px;
  }
  .hidden {
    display: none;
  }
</style>

