<template>
    <div style="width: 100%">
        <div id="group-cover-photo" :style="{
          'backgroundImage': `url(${tempImgUrl || coverPhoto})`,
          'backgroundSize': 'cover',
          }" style="z-index:1; margin-top: 50px; width: 100%; height: 260px">
            <input class="hidden" type="file" @change="setTemp" ref="imgupload" />
            <div class="change-photo" v-if="!modify.changePhoto.hide && user.uid === groupDetails.admin.uid">
              <div class="btn" v-if="!modify.changePhoto.save" @click.prevent="handleModify('changePhoto')">Change Cover photo</div>
              <div class="btn" v-if="modify.changePhoto.save" @click.prevent="saveCoverPhoto">Save Cover Photo</div>
            </div>
            <div class="group-title" v-if="!modify.groupTitle">
              <h3 class="white--text">{{ this.groupDetails && this.groupDetails.name ? this.groupDetails.name : 'Loading...' }}</h3>
            </div>
            <div class="position-photo" v-if="!modify.reposition.hide && user.uid === groupDetails.admin.uid">
              <div class="btn" v-if="!modify.reposition.save" @click.prevent="handleModify('reposition')">Reposition Cover photo</div>
              <div class="btn" v-if="modify.reposition.save" @click.prevent="savePosition">Save Position</div>
            </div>
        </div>
        <v-tabs style="top: -48px;" fixed centered :scrollable="false">
          <v-tabs-bar class="grey lighten-4" dark>
            <v-tabs-slider class="white--text"></v-tabs-slider>
            <v-tabs-item
              href="#tab-1"
            >
              Home
            </v-tabs-item>
            <v-tabs-item
              href="#tab-2"
            >
              Events
            </v-tabs-item>
            <v-tabs-item
              href="#tab-3"
            >
              Members
            </v-tabs-item>
            <v-tabs-item
              v-if="user.uid === groupDetails.admin.uid"
              href="#tab-4"
            >
              Notifications
            </v-tabs-item>
            <v-tabs-item
              v-if="user.uid === groupDetails.admin.uid"
              href="#tab-5"
            >
              Settings
            </v-tabs-item>
          </v-tabs-bar>
          <v-tabs-items>
            <v-tabs-content
              id="tab-1"
            >
            <v-container style="padding-top: 20px">
                <v-layout row wrap>
                <v-flex xs12 md3 hidden-xs-only hidden-sm-only>
                    <v-card class="mr-3">
                      <v-card-text>
                        <span style="text-transform: uppercase">ABOUT {{ this.groupDetails && this.groupDetails.name ? this.groupDetails.name : 'Loading...' }}</span>
                        <p>{{ this.groupDetails && this.groupDetails.description ? this.groupDetails.description : 'Loading...' }}</p>
                      </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex xs12 md6>
                    <new-activity :groupId="groupId" :firstname="user.firstname"></new-activity>
                    <v-divider></v-divider>
                    <timeline :likes="likes" :item="item" :itemKey="key" v-for="(item, key) in feed" :key="item.postKey" :groupId="groupId"></timeline>
                    <div v-if="!feed.length" style="text-align: center; padding-top: 40px">
                      <h5 class="black--text">No Group Activity yet</h5>
                    </div>
                </v-flex>
                <v-flex xs12 md3 hidden-xs-only>
                    <invite-user :group="groupDetails" :groupId="groupId" />
                    <TopEvents :groupId="groupId" />
                </v-flex>
                </v-layout>
            </v-container>
            </v-tabs-content>
          </v-tabs-items>
          <v-tabs-items>
            <v-tabs-content id="tab-2">
              <v-container>
                <v-layout row wrap>
                  <v-flex md12>
                    <events-tab :groupId="groupId" />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-tabs-content>
          </v-tabs-items>
          <v-tabs-items>
            <v-tabs-content id="tab-3">
              <v-container>
                <v-layout>
                  <members :group="groupDetails" :groupId="groupId" />
                </v-layout>
              </v-container>
            </v-tabs-content>
          </v-tabs-items>
          <v-tabs-items>
            <v-tabs-content id="tab-4">
              <notifications :groupId="groupId" />
            </v-tabs-content>
          </v-tabs-items>
          <v-tabs-items>
            <v-tabs-content
              id="tab-5"
            >
              <settings :group="groupDetails" :groupId="groupId" />
            </v-tabs-content>
          </v-tabs-items>
        </v-tabs>
        <full-view-chat />
    </div>
</template>

<script>
  import NewActivity from './grouppage/activity/new/FormComponent.vue'
  import EventsTab from './grouppage/events.vue'
  import Notifications from './grouppage/notifications.vue'
  import Top5 from './grouppage/top5/Top5.vue'
  import Timeline from './grouppage/activity/Timeline.vue'
  import Settings from './grouppage/settings.vue'
  import TopEvents from './grouppage/events/Top5Events.vue'
  import InviteUser from './grouppage/inviteUser.vue'
  import Members from './grouppage/members.vue'
  import SideboxChat from '@/components/chat/sideboxChat.vue'
  import FullViewChat from '@/components/chat/fullviewChat.vue'
  import UserInfo from './grouppage/UserInfo.vue'
  export default {
    components: {
      NewActivity,
      Top5,
      Notifications,
      Settings,
      EventsTab,
      SideboxChat,
      InviteUser,
      Members,
      Timeline,
      FullViewChat,
      TopEvents,
      UserInfo
    },
    data () {
      return {
        groupId: null,
        dialog: true,
        items: [],
        likes: {},
        tempImgUrl: null,
        tempFile: null,
        feed: [],
        groupDetails: {
          coverPhoto: {}
        },
        backgroundPosition: {
          x: '',
          y: ''
        },
        disableCoverPhotoSaveButton: false,
        modify: {
          reposition: {
            hide: false,
            save: false
          },
          changePhoto: {
            hide: false,
            save: false
          },
          groupTitle: false
        }
      }
    },
    methods: {
      pickFile () {
        this.$refs.imgupload.click()
      },
      setTemp () {
        const self = this
        const reader = new window.FileReader()
        const blob = this.$refs.imgupload.files[0]
        this.tempFile = blob
        reader.onload = (e) => {
          self.tempImgUrl = reader.result
        }
        reader.readAsDataURL(blob)
      },
      saveCoverPhoto () {
        const self = this
        const storageRef = this.$firebase.storage().ref(`group/${this.groupId}/coverPhoto.jpg`)
        this.disableCoverPhotoSaveButton = true
        storageRef.put(this.tempFile).then(res => {
          console.log(res, 'res')
          if (res.state === 'success') {
            self.$firebase.database().ref(`groups/-${self.groupId}/coverPhoto/url`).set(res.downloadURL)
            self.disableCoverPhotoSaveButton = false
            self.modify = {
              reposition: {
                hide: false,
                save: false
              },
              changePhoto: {
                hide: false,
                save: false
              },
              groupTitle: false
            }
          }
        })
      },
      savePosition () {
        this.$firebase.database().ref(`groups/-${this.groupId}/coverPhoto/backgroundPosition`).set(this.backgroundPosition)
        window.$('#group-cover-photo').backgroundDraggable('disable')
        this.modify = {
          reposition: {
            hide: false,
            save: false
          },
          changePhoto: {
            hide: false,
            save: false
          },
          groupTitle: false
        }
      },
      async getPhotoUrl (uid, index) {
        try {
          let user = await this.$firebase.database().ref('users/' + uid).once('value')
          user = user.val()
          this.items[index]['avatar'] = user.avatar
        } catch (error) {
          this.items[index]['avatar'] = 'https://randomuser.me/api/portraits/men/88.jpg'
        }
      },
      handleModify (modifier) {
        if (modifier === 'reposition') {
          const self = this
          window.$('#group-cover-photo').backgroundDraggable({
            done () {
              const backgroundPosition = window.$('#group-cover-photo').css('background-position')
              self.backgroundPosition.x = backgroundPosition.split(' ')[0]
              self.backgroundPosition.y = backgroundPosition.split(' ')[1]
            }
          })
          this.modify = {
            reposition: {
              hide: false,
              save: true
            },
            changePhoto: {
              hide: true,
              save: false
            },
            groupTitle: true
          }
        } else if (modifier === 'changePhoto') {
          this.modify = {
            reposition: {
              hide: true,
              save: false
            },
            changePhoto: {
              hide: false,
              save: true
            },
            groupTitle: true
          }
          this.pickFile()
        } else if (modifier === 'groupTitle') {
          this.modify = {
            reposition: {
              hide: true,
              save: false
            },
            changePhoto: {
              hide: false,
              save: false
            },
            groupTitle: false
          }
        }
      }
    },
    beforeMount () {
      const group = this.$route.params.id
      this.groupId = group
      this.$firebase.database().ref(`groups/-${group}`).once('value').then(snap => {
        if (snap.val()) {
          this.groupDetails = snap.val()
          return ''
        }
        this.$router.replace('/groups')
      })
    },
    mounted () {
      let self = this // eslint-disable-line
      setTimeout(() => {
        document.getElementById('group-cover-photo').style.backgroundPosition = `${this.groupDetails.coverPhoto.backgroundPosition.x} ${this.groupDetails.coverPhoto.backgroundPosition.y}`
      }, 1000)

      this.$firebase.database().ref().child('groupposts').on('value', function (snapshot) {
        self.items = []
        self.likes = {}
        self.count = 0
        self.feed = []
        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val()
          if (childData.group === self.groupId) {
            const comments = []
            let i
            let j
            const likes = []
            var childKey = childSnapshot.key
            if (childData.approvalstatus === 1) {
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
          }
        })
        self.feed = self.items
      })
    },
    computed: {
      user () {
        return this.$store.getters.getUserDetails
      },
      groupName () {
        return this.groupDetails.name
      },
      coverPhoto () {
        return `${this.groupDetails.coverPhoto.url}`
      },
      coverBackgroundPosition () {
        return `${this.groupDetails.coverPhoto.backgroundPosition.x}px ${this.groupDetails.coverPhoto.backgroundPosition.y}px`
      }
    }
  }
</script>

<style>
  .change-photo {
    padding-top: 15px;
    width: auto;
    float: right;
  }
  .position-photo {
    padding-top: 15px;
    width: auto;
    float: right;
  }
  #group-cover-photo .btn {
    padding: 8px;
    background: rgba(255, 255, 255, 0.22);
    border: 1px solid #fff;
    color: #fff;
    cursor: pointer;
  }
  #group-cover-photo .btn:hover {
    background: rgba(255, 255, 255, 0.55);
  }

  .group-title {
    padding-top: 80px;
    /* width: 500px; */
    text-align: center;
    /* margin-left: auto;
    margin-right: auto; */
  }
  .tab-white-transparent {
    background: rgb(235,235,235);
    background: -moz-linear-gradient(top, rgba(235,235,235,1) 0%, rgba(230,230,230,1) 50%, rgba(223,223,223,1) 51%, rgba(254,254,254,1) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top, rgba(235,235,235,1) 0%,rgba(230,230,230,1) 50%,rgba(223,223,223,1) 51%,rgba(254,254,254,1) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, rgba(235,235,235,1) 0%,rgba(230,230,230,1) 50%,rgba(223,223,223,1) 51%,rgba(254,254,254,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ebebeb', endColorstr='#fefefe',GradientType=0 );
  }
  .tabs__wrapper {
    overflow: hidden !important;
  }
</style>

