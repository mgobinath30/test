import Vue from 'vue'
import moment from 'moment'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import vuex from 'vuex'
import { store } from './store/store.js'
import * as firebase from 'firebase'
import { config } from './database/firebase-config.js'
import authGaurd from './router/auth-gaurd.js'
import { statusFilter, sliceFilter } from './filters/filters'
// import VueAnalytics from 'vue-analytics'

Vue.prototype.$firebase = firebase.initializeApp(config)

Vue.use(Vuetify)
Vue.use(vuex)
// Vue.use(VueAnalytics, {
//   id: 'UA-109500012-1',
//   router
// })

Vue.filter('fromNow', (value) => {
  return moment(new Date(value)).fromNow()
})
let presenceRef = firebase.database().ref('.info/connected')
let myRef = ''

Vue.filter('actualDate', (value) => {
  return moment(new Date(value)).format('MM/DD/YYYY')
})

Vue.filter('status', statusFilter)
Vue.filter('sliceText', sliceFilter)

Vue.config.productionTip = false

/* eslint-disable no-new */

router.afterEach((to, from) => {
  // document.title = to.meta.title
  store.dispatch('setRouteDetails', {to, from})
})
router.beforeEach(authGaurd)

new Vue({
  el: '#app',
  store,
  router,
  filters: {
  },
  mounted () {
    store.dispatch('setInitializing', true)
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (!user.emailVerified) {
          var alert = {
            header: 'Email verification',
            text: 'Please verify your email address.',
            active: true,
            okText: 'OK',
            cancelText: ''
          }
          store.dispatch('signUserOut', null)
          router.push('/')
          store.dispatch('triggerAlert', alert)
        } else {
          myRef = firebase.database().ref().child('/users/' + user.uid)
          presenceRef.on('value', function (snap) {
            if (snap.val()) {
              myRef.onDisconnect().update({status: 'offline'})
              myRef.update({
                status: 'online',
                lastlogin: new Date()
              })
            }
          })
          firebase.database().ref('users/' + user.uid).on('value', function (snapshot) {
            const userDetails = snapshot.val()
            store.dispatch('autoSignIn', userDetails)
            var companylegalname = snapshot.val().companylegalname.toString().toLowerCase().replace(/\s/g, '')
            firebase.database().ref(`level_priviledge/${userDetails.role}`).on('value', (snapshot) => {
              var levelPrivileges = snapshot.val()
              store.commit('setUserPrivilege', levelPrivileges)
            })
            firebase.database().ref('companies/' + companylegalname).once('value')
              .then(
                snapshot => {
                  store.dispatch('setCompany', snapshot.val())
                }
              )

            store.dispatch('setInitializing', false)
          })
        }
      }
    })

    firebase.database().ref('level_priviledge')
    .on('value', (snapshot) => {
      const allPrivileges = {}
      snapshot.forEach((element) => {
        allPrivileges[element.key] = element.val()
      })
      store.commit('setAllPriviledge', allPrivileges)
    })

    firebase.database().ref('/site_settings/').once('value')
      .then(
        snapshot => {
          store.dispatch('loadSettings', snapshot.val())
          store.dispatch('setInitializing', false)
        }
      )
      .catch(
        error => {
          alert(error.message)
        }
      )
    firebase.database().ref('/posts/')
    .on('value', (snapshot) => {
      const allData = []
      snapshot.forEach((element) => {
        firebase.database().ref('users/' + element.val()['uid']).once('value')
        .then((data) => {
          let avatar
          if (data.val()) {
            avatar = data.val()['avatar']
          } else {
            avatar = 'https://randomuser.me/api/portraits/men/88.jpg'
          }
          let value = {
            id: element.key,
            activeDialog: false,
            ...element.val(),
            avatar
          }
          allData.push(value)
        })
      })
      store.dispatch('loadPosts', allData)
      store.dispatch('setInitializing', false)
    })
    firebase.database().ref('/groupposts/').on('value', (snapshot) => {
      const allData = []
      snapshot.forEach((element) => {
        firebase.database().ref('users/' + element.val()['uid']).once('value')
        .then((data) => {
          let avatar
          if (data.val()) {
            avatar = data.val()['avatar']
          } else {
            avatar = 'https://randomuser.me/api/portraits/men/88.jpg'
          }
          let value = {
            id: element.key,
            activeDialog: false,
            ...element.val(),
            avatar
          }
          allData.push(value)
        })
      })
      console.log(allData)
      store.dispatch('loadGroupPosts', allData)
      store.dispatch('setInitializing', false)
    })
    firebase.database().ref('/events/').on('value', (snapshot) => {
      const allData = []
      snapshot.forEach((element) => {
        firebase.database().ref('users/' + element.val()['uid']).once('value')
        .then((data) => {
          let avatar
          if (data.val()) {
            avatar = data.val()['avatar']
          } else {
            avatar = 'https://randomuser.me/api/portraits/men/88.jpg'
          }
          let value = {
            id: element.key,
            activeDialog: false,
            ...element.val(),
            avatar
          }
          allData.push(value)
        })
      })
      store.dispatch('loadEvents', allData)
      store.dispatch('setInitializing', false)
    })
    firebase.database().ref('/companies/').on('value', (snapshot) => {
      const allData = []
      snapshot.forEach((element) => {
        let value = {
          id: element.key,
          activeDialog: false,
          ...element.val()
        }
        allData.push(value)
      })
      store.dispatch('loadCompanies', allData)
      store.dispatch('setInitializing', false)
    })

    firebase.database().ref('/users/').once('value')
      .then(
        snapshot => {
          const allData = []
          snapshot.forEach((element) => {
            let value = {
              id: element.key,
              activeDialog: false,
              ...element.val()
            }
            allData.push(value)
          })
          store.dispatch('loadUsers', allData)
          store.dispatch('setInitializing', false)
        }
      )
      .catch(
        error => {
          alert(error.message)
        }
      )
  },
  ready () {
    console.log('kiran ready')
  },
  render: h => h(App)
})
