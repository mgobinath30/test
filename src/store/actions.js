import * as firebase from 'firebase'
import axios from 'axios'

export const getClientID = ({commit}) => {
}

export const getAdminSettings = ({commit}) => {
}

export const toggleGroupModal = ({ commit }, val) => {
  commit('toggleGroupModal', val)
}

export const getContractHistoryAnalytics = ({ commit }, payload) => {
  // eslint-disable-next-line
  let api = 'https://fed-exchange-api.herokuapp.com/api/v2.0/charts/history?'
  let query = '' // eslint-disable-line
  if (payload && payload.naics) {
    query += `&naics=${payload.naics}`
  }
  if (payload && payload.psc) {
    query += `&psc=${payload.psc}`
  }
  api += query
  return axios.get(api)
    .then(res => {
      commit('contractHistoryAnalytics', res.data)
      return res
    })
}

export const getOpportunitiesAnalytics = ({ commit }, payload) => {
  // eslint-disable-next-line
  let api = 'https://fed-exchange-api.herokuapp.com/api/v2.0/charts/opportunities?'
  let query = '' // eslint-disable-line
  if (payload && payload.naics) {
    query += `&naics=${payload.naics}`
  }
  if (payload && payload.psc) {
    query += `&psc=${payload.psc}`
  }
  api += query
  return axios.get(api)
    .then(res => {
      commit('OpportunitiesAnalytics', res.data)
      return res
    })
}

export const getContractors = ({ commit }, payload) => {
  console.log('-------------------API-----------------')
  // eslint-disable-next-line
  let contractorsApi = `https://fed-exchange-api.herokuapp.com/api/v2.0/companydirectory?limit=${payload && payload.limit ? payload.limit : '25'}`
  let query = '' // eslint-disable-line
  if (payload && payload.skip) {
    contractorsApi += `&skip=${payload.skip}`
  }
  // if (payload && payload.limit) {
  //   console.log(payload.limit, 'limit')
  //   contractorsApi += `&limit=${payload.limit}`
  // }
  if (payload && payload.search) {
    contractorsApi += `&companylegalname=${payload.search}`
  }

  if (payload.search === undefined) {
  //  let state = payload.state
    console.log('-----CA')
    let state = 'CA'
    contractorsApi += `&state=` + state
  }
  return axios({
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: false,
    method: 'GET',
    url: contractorsApi
  }).then((res) => {
    commit('setContractors', res.data)
    debugger
    return res
  }).catch(err => {
    console.log(err, 'err')
  })
}

export const signInViaGoogle = ({ commit }, payload) => {
  commit('setLoading', true)
  commit('setError', null)
  commit('setProcess', 'Sign Up')

  firebase.database().ref(`users/${payload.uid}`).once('value')
    .then(snapshot => {
      commit('setLoading', false)
    })
}

export const signUpViaGoogle = ({ commit }, payload) => {
  commit('setLoading', true)
  commit('setError', null)
  commit('setProcess', 'Sign Up')
  const firstname = payload.displayName.split(' ')[0]
  const lastname = payload.displayName.split(' ')[1]

  const newUser = {
    uid: payload.uid,
    avatar: payload.photoURL,
    firstname,
    lastname,
    email: payload.email,
    jobtitle: '',
    department: '',
    companylegalname: '',
    businesswebsite: '',
    social: {
      likes: [],
      comments: [],
      events: [],
      posts: []
    },
    role: 4
  }

  firebase.database().ref(`users/${payload.uid}`).once('value')
  .then(
    snapshot => {
      if (!snapshot.val()) {
        return firebase.database().ref(`users/${payload.uid}`).set(newUser)
          .then(
            res => {
              commit('setLoading', false)
            }
          )
          .catch()
      }
      commit('setUser', snapshot.val())
      commit('setLoading', false)
    }
  )
  .catch(
    error => {
      alert(error.message)
    }
  )
}
export const getForecastOpportunities = ({ commit }, payload) => {
  let query = '' // eslint-disable-line
  let getForecastOpportunitiesApi = `https://fed-exchange-api.herokuapp.com/api/v2.0/forecastfilter?take=${payload && payload.limit ? payload.limit : 10}`

  if (payload && payload.type) {
    query += `&type=${payload.type}`
  }
  if (payload && payload.psc) {
    query += `&psc=${payload.psc}`
  }
  if (payload && payload.skip) {
    query += `&skip=${payload.skip}`
  }
  if (payload && payload.naics) {
    query += `&naics=${payload.naics}`
  }
  if (payload && payload.startdate && payload.enddate) {
    query += `&daterange=${payload.startdate}to${payload.enddate}`
  }
  if (payload && payload.search) {
    query += `&keywords=${payload.search}`
  }
  return axios.get(getForecastOpportunitiesApi).then((res) => {
    commit('setForecastOpportunities', res.data)
    return res
  })
}
export const getRecoveryOpportunities = ({ commit }, payload) => {
  let query = '' // eslint-disable-line
  let getRecoveryOpportunitiesApi = `https://fed-exchange-api.herokuapp.com/api/v2.0/recoveryfilter?take=${payload && payload.limit ? payload.limit : 10}`

  if (payload && payload.type) {
    query += `&type=${payload.type}`
  }
  if (payload && payload.psc) {
    query += `&psc=${payload.psc}`
  }
  if (payload && payload.skip) {
    query += `&skip=${payload.skip}`
  }
  if (payload && payload.naics) {
    query += `&naics=${payload.naics}`
  }
  if (payload && payload.startdate && payload.enddate) {
    query += `&daterange=${payload.startdate}to${payload.enddate}`
  }
  if (payload && payload.search) {
    query += `&keywords=${payload.search}`
  }
  return axios.get(getRecoveryOpportunitiesApi).then((res) => {
    commit('setRecoveryOpportunities', res.data)
    return res
  })
}
export const getOpportunities = ({ commit }, payload) => {
  let query = '' // eslint-disable-line
  let getOpportunitiesApi = `https://fed-exchange-api.herokuapp.com/api/v2.0/solicitationfilter?take=${payload && payload.limit ? payload.limit : 10}`

  if (payload && payload.type) {
    query += `&type=${payload.type}`
  }
  if (payload && payload.psc) {
    query += `&psc=${payload.psc}`
  }
  if (payload && payload.skip) {
    query += `&skip=${payload.skip}`
  }
  if (payload && payload.naics) {
    query += `&naics=${payload.naics}`
  }
  if (payload && payload.startdate && payload.enddate) {
    query += `&daterange=${payload.startdate}to${payload.enddate}`
  }
  if (payload && payload.search) {
    query += `&keywords=${payload.search}`
  }

  getOpportunitiesApi += query
  return axios.get(getOpportunitiesApi).then((res) => {
    commit('setOpportunities', res.data)
    return res
  })
}

export const getContractHistory = ({ commit }, payload) => {
  // eslint-disable-next-line
  let query = ''
  let contractHistoryAPI = `https://fed-exchange-api.herokuapp.com/api/v2.0/contractsfilter?take=${payload && payload.limit ? payload.limit : 10}`
  if (payload && payload.skip) {
    query += `&skip=${payload.skip}`
  }
  if (payload && payload.psc) {
    query += `&psc=${payload.psc}`
  }
  if (payload && payload.search) {
    query += `&keywords=${payload.search}`
  }
  if (payload && payload.subcontractplan && payload.subcontractplan.length && payload.subcontractplan !== 'All') {
    const subcontractplan = payload.subcontractplan.split(': ')[0]
    query += `&subcontractplan=${subcontractplan}`
  }
  if (payload && payload.setaside) {
    const setaside = payload.setaside.toLowerCase().split(' ').join('')
    query += `&setaside=${setaside}`
  }
  if (payload && payload.daterangetype && payload.daterangetype.length && payload.daterangetype !== 'Fiscal Year') {
    const daterangetype = payload.daterangetype.toLowerCase().split(' ').join('')
    query += `&daterangetype=${daterangetype}&daterange=${payload.startdate}to${payload.enddate}`
  }
  if (payload && payload.daterangetype === 'Fiscal Year') {
    const startyear = new Date(payload.startdate).getFullYear()
    const endyear = new Date(payload.enddate).getFullYear()
    query += `&daterangetype=fiscalyear&daterange=${startyear}to${endyear}`
  }
  contractHistoryAPI += query
  return axios.get(contractHistoryAPI).then((res) => {
    commit('setContractHistory', res.data)
    return res
  })
}

export const signUserUp = ({commit}, payload) => {
  commit('setLoading', true)
  commit('setError', null)
  commit('setProcess', 'Sign Up')

  firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
    .then(
      async function (user) {
        user.sendEmailVerification()
        commit('setLoading', false)
        const newUser = {
          uid: user.uid,
          avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
          firstname: payload.firstname,
          lastname: payload.lastname,
          email: user.email,
          jobtitle: payload.jobtitle,
          department: payload.department,
          companylegalname: payload.companylegalname,
          businesswebsite: payload.businesswebsite,
          social: {
            likes: [],
            comments: [],
            events: [],
            posts: []
          },
          role: 4
        }
        commit('setProcess', null)
        var updates = {}
        updates['/' + user.uid + '/'] = newUser
        await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        console.log(firebase.auth().currentUser)
        firebase.database().ref('users').child(user.uid.toString()).set(newUser)
          .then(
          )
          .catch(
            error => {
              console.log(error)
              alert(error.message)
            }
          )
      }
    )
    .catch(
      error => {
        commit('setLoading', false)
        commit('setError', error.message)
        console.log(error)
      }
    )
}

export const signUserIn = ({commit}, payload) => {
  commit('setLoading', true)
  commit('setError', null)
  commit('setProcess', 'Sign In')
  firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
    .then(
      user => {
        commit('setLoading', false)
        commit('setProcess', 'null')
      }
    )
    .catch(
      error => {
        commit('setLoading', false)
        commit('setError', error.message)
        console.log(error)
      }
    )
}

export const autoSignIn = ({commit}, payload) => {
  localStorage.setItem('uid', payload.uid)
  commit('setUser', payload)
}

export const loadUsers = ({ commit }, payload) => {
  commit('saveUsers', payload)
}

export const setError = ({commit}, payload) => {
  commit('setError', payload)
}

export const setProcess = ({commit}, payload) => {
  commit('setProcess', payload)
}

export const loadSettings = ({commit}, payload) => {
  commit('setSettings', payload)
  commit('setPageSettings', payload)
}

export const loadPosts = ({commit}, payload) => {
  commit('savePosts', payload)
}

export const loadGroupPosts = ({commit}, payload) => {
  commit('saveGroupPosts', payload)
}

export const loadEvents = ({commit}, payload) => {
  commit('saveEvents', payload)
}

export const loadCompanies = ({commit}, payload) => {
  commit('saveCompanies', payload)
}

export const updateProfile = async ({commit, dispatch}, payload) => {
  commit('setLoading', true)
  commit('setError', null)
  if (payload.tempFile) {
    const storageRef = firebase.storage().ref(`users/${payload.uid}/profile-pic.jpg`)
    try {
      await storageRef.put(payload.tempFile)
    } catch (error) {
      let snackbar = {
        active: true,
        text: error.message
      }
      dispatch('triggerSnackbar', snackbar)
      return null
    }
    try {
      payload.avatar = await storageRef.getDownloadURL()
    } catch (error) {
      let snackbar = {
        active: true,
        text: error.message
      }
      dispatch('triggerSnackbar', snackbar)
    }
  }
  firebase.database().ref('/users/' + payload.uid).set(payload)
    .then(
      value => {
        commit('setProcess', 'Profile Update')
        commit('setLoading', false)
      }
    )
    .catch(
      error => {
        commit('setError', error.message)
      }
    )
}

export const uploadImage = ({commit}, payload) => {
  commit('setLoading', true)
  commit('setError', null)
  commit('setProcess', `${payload.type} upload`)
  const storageRef = firebase.storage().ref(`site_settings/styles/${payload.type}`)
  let updates = {}
  const task = storageRef.put(payload.file)
  return new Promise((resolve, reject) => {
    task.on('state_changed',
      (snapshot) => {
        const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log(percentage)
      },
      () => {
        commit('setError', 'An error occured, file was not uploaded! Try again')
      },
      () => {
        const photoURL = task.snapshot.downloadURL
        updates[payload.type] = photoURL
        commit('setImage', updates)
        commit('setLoading', false)
        setTimeout(() => {
          let snackbar = {
            active: false,
            text: ''
          }
          commit('setProcess', null)
          commit('triggerSnackbar', snackbar)
        }, 2000)
      })
  })
}

export const saveSettings = ({commit}, payload) => {
  commit('setLoading', true)
  commit('setError', null)
  commit('setProcess', 'Settings Saved')
  const databaseRef = firebase.database().ref(`site_settings/styles/${payload.type}`)
  databaseRef.set(payload.data)
    .then(
      value => {
        commit('setLoading', false)
        let snackbar = {
          active: true,
          text: 'Settings Saved'
        }
        commit('triggerSnackbar', snackbar)
        commit('setStyles', payload)
        setTimeout(() => {
          let snackbar = {
            active: false,
            text: ''
          }
          commit('setProcess', null)
          commit('triggerSnackbar', snackbar)
        }, 2000)
      }
    ).catch(
      error => {
        commit('setLoading', false)
        let snackbar = {
          active: true,
          text: error.message
        }
        commit('triggerSnackbar', snackbar)
        commit('setError', error.message)
        setTimeout(() => {
          let snackbar = {
            active: false,
            text: ''
          }
          commit('setProcess', null)
          commit('triggerSnackbar', snackbar)
        }, 2000)
      }
  )
}

export const changeStatus = ({commit}, payload) => {
  commit('setLoading', true)
  const databaseRef = firebase.database().ref(`${payload.type}/${payload.postId}`)
  databaseRef.update({
    approvalstatus: payload.status
  }).then(() => {
    commit('setLoading', false)
    let snackbar = {
      active: true,
      text: 'Settings Saved'
    }
    commit('changeStatus', payload)
    commit('triggerSnackbar', snackbar)
    setTimeout(() => {
      let snackbar = {
        active: false,
        text: ''
      }
      commit('setProcess', null)
      commit('triggerSnackbar', snackbar)
    }, 2000)
  })
}

export const updatePriviledge = ({commit}, payload) => {
  console.log(payload, 'payload')
  commit('setLoading', true)
  const databaseRef = firebase.database().ref(`level_priviledge/${payload.level}`)
  databaseRef.update(payload.priviledges)
  .then(() => {
    commit('setLoading', false)
    let snackbar = {
      active: true,
      text: 'Settings Saved'
    }
    // commit('changeStatus', payload)
    commit('triggerSnackbar', snackbar)
    setTimeout(() => {
      let snackbar = {
        active: false,
        text: ''
      }
      commit('setProcess', null)
      commit('triggerSnackbar', snackbar)
    }, 2000)
  })
}

export const addPriviledge = ({commit}, payload) => {
  commit('setLoading', true)
  const databaseRef = firebase.database().ref('level_priviledge')
  .child(payload.level.toString())
  databaseRef.set(payload.priviledges)
  .then(() => {
    commit('setLoading', false)
    let snackbar = {
      active: true,
      text: 'New Role have been added Successfully'
    }
    commit('triggerSnackbar', snackbar)
    setTimeout(() => {
      let snackbar = {
        active: false,
        text: ''
      }
      commit('setProcess', null)
      commit('triggerSnackbar', snackbar)
    }, 2000)
  })
}

export const verifyCompany = ({commit}, payload) => {
  commit('setLoading', true)
  const databaseRef = firebase.database().ref(`${payload.type}/${payload.postId}`)
  databaseRef.update({
    verified: payload.status
  }).then(() => {
    commit('setLoading', false)
    let snackbar = {
      active: true,
      text: 'Settings Saved'
    }
    commit('verifyCompany', payload)
    commit('triggerSnackbar', snackbar)
    setTimeout(() => {
      let snackbar = {
        active: false,
        text: ''
      }
      commit('setProcess', null)
      commit('triggerSnackbar', snackbar)
    }, 2000)
  })
}

export const deletePost = ({commit}, payload) => {
  commit('setLoading', true)
  const databaseRef = firebase.database().ref(`${payload.type}/${payload.postId}`)
  databaseRef.remove().then(() => {
    commit('setLoading', false)
    let snackbar = {
      active: true,
      text: 'Deleted Successfully'
    }
    commit('triggerSnackbar', snackbar)
    setTimeout(() => {
      let snackbar = {
        active: false,
        text: ''
      }
      commit('setProcess', null)
      commit('triggerSnackbar', snackbar)
    }, 2000)
    commit('deletePost', payload)
  })
}

export const deleteRole = ({commit}, payload) => {
  commit('setLoading', true)
  const databaseRef = firebase.database().ref(`level_priviledge/${payload.title}`)
  databaseRef.remove().then(() => {
    commit('setLoading', false)
    let snackbar = {
      active: true,
      text: 'Deleted Successfully'
    }
    commit('triggerSnackbar', snackbar)
    setTimeout(() => {
      let snackbar = {
        active: false,
        text: ''
      }
      commit('setProcess', null)
      commit('triggerSnackbar', snackbar)
    }, 2000)
  })
}

export const deleteUser = ({commit}, payload) => {
  commit('setLoading', true)
  const databaseRef = firebase.database().ref('users/' + payload.uid)
  databaseRef.remove().then(() => {
    commit('setLoading', false)
    let snackbar = {
      active: true,
      text: 'User Deleted Successfully'
    }
    commit('triggerSnackbar', snackbar)
    setTimeout(() => {
      let snackbar = {
        active: false,
        text: ''
      }
      commit('setProcess', null)
      commit('triggerSnackbar', snackbar)
    }, 2000)
    commit('deleteUser', payload)
  })
}
export const updateUser = ({commit}, payload) => {
  commit('setLoading', true)
  const databaseRef = firebase.database().ref('users/' + payload.uid)
  databaseRef.update({'role': payload.role}).then(() => {
    commit('setLoading', false)
    let snackbar = {
      active: true,
      text: 'User Updated Successfully'
    }
    commit('triggerSnackbar', snackbar)
    setTimeout(() => {
      let snackbar = {
        active: false,
        text: ''
      }
      commit('setProcess', null)
      commit('triggerSnackbar', snackbar)
    }, 2000)
    commit('updateUser', payload)
  })
}
export const savePageSettings = ({commit}, payload) => {
  commit('setLoading', true)
  commit('setError', null)
  // commit('setProcess', 'Settings Saved')
  const ref = payload.from ? `${payload.from}/${payload.type}` : `${payload.type}`
  const databaseRef = firebase.database().ref(`site_settings/pages/${ref}`)
  databaseRef.set(payload.data)
    .then(
      value => {
        commit('setLoading', false)
        let snackbar = {
          active: true,
          text: 'Settings Saved'
        }
        commit('triggerSnackbar', snackbar)
        commit('setStyles', payload)
        setTimeout(() => {
          let snackbar = {
            active: false,
            text: ''
          }
          commit('setProcess', null)
          commit('triggerSnackbar', snackbar)
        }, 2000)
      }
    ).catch(
      error => {
        commit('setLoading', false)
        let snackbar = {
          active: true,
          text: error.message
        }
        commit('triggerSnackbar', snackbar)
        commit('setError', error.message)
      }
  )
}

export const fetchSettings = ({commit}, payload) => {
  commit('setLoading', true)
  commit('setError', null)
  commit('setProcess', 'Settings Update')
  firebase.database().ref('/settings/').set(payload)
    .then(
      value => {
        commit('setLoading', false)
      }
    )
    .catch(
      error => {
        commit('setLoading', false)
        let snackbar = {
          active: true,
          error: error.message
        }
        commit('triggerSnackbar', snackbar)
        commit('setError', error.message)
        setTimeout(() => {
          let snackbar = {
            active: false,
            text: ''
          }
          commit('setError', null)
          commit('triggerSnackbar', snackbar)
        }, 2000)
      }
    )
}

export const setInitializing = ({commit}, payload) => {
  commit('setInitializing', payload)
}

export const setRouteDetails = ({commit}, payload) => {
  commit('setRouteDetails', payload)
}

export const triggerSnackbar = ({commit}, payload) => {
  commit('triggerSnackbar', payload)
}

export const triggerAlert = ({commit}, payload) => {
  commit('triggerAlert', payload)
}

export const signUserOut = ({commit}, payload) => {
  localStorage.removeItem('uid')
  firebase.auth().signOut()
    .then(
      () => {
      }
    )
}

export const setCompany = ({commit}, payload) => {
  commit('setCompanyDetails', payload)
}
