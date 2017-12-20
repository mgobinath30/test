export const setUser = (state, payload) => {
  state.user = payload
}

export const setLoading = (state, payload) => {
  state.loading = payload
}

export const toggleGroupModal = (state, payload) => {
  state.openGroupModal = payload
}

export const changeStatus = (state, payload) => state[payload.type].forEach((post) => {
  if (post.id === payload.postId) {
    post.approvalstatus = payload.status
  }
})

export const contractHistoryAnalytics = (state, payload) => {
  state.analytics.history = payload
}

export const OpportunitiesAnalytics = (state, payload) => {
  state.analytics.opportunities = payload
}

export const verifyCompany = (state, payload) => state[payload.type].forEach((post) => {
  if (post.id === payload.postId) {
    post.verified = payload.status
  }
})

export const setContractors = (state, payload) => {
  state.contractors = payload
}

export const deletePost = (state, payload) => {
  const index = state[payload.type].map(post => post.id).indexOf(payload.postId)
  state[payload.type].splice(index, 1)
}
export const deleteUser = (state, payload) => {
  const index = state['users'].map(user => user.uid).indexOf(payload.uid)
  state['users'].splice(index, 1)
}
export const updateUser = (state, payload) => {
  const index = state['users'].map(user => user.uid).indexOf(payload.uid)
  var user = state.users[index]
  user.role = payload.role
  state.users[index] = user
}
export const setUserPrivilege = (state, payload) => {
  state.privileges = payload
}

export const setAllPriviledge = (state, payload) => {
  state.all_priviledges = payload
}

export const setError = (state, payload) => {
  state.error = payload
}

export const setProcess = (state, payload) => {
  state.process = payload
}

export const setOpportunities = (state, payload) => {
  state.opportunities = payload
}
export const setForecastOpportunities = (state, payload) => {
  state.forecastOpportunities = payload
}
export const setRecoveryOpportunities = (state, payload) => {
  state.recoveryOpportunities = payload
}
export const setContractHistory = (state, payload) => {
  state.contractHistory = payload
}

export const setSettings = (state, payload) => {
  state.settings = payload
}

export const saveUsers = (state, payload) => {
  state.users = payload
}

export const savePosts = (state, payload) => {
  state.posts = payload
}

export const saveGroupPosts = (state, payload) => {
  state.groupposts = payload
}

export const saveEvents = (state, payload) => {
  state.events = payload
}

export const saveCompanies = (state, payload) => {
  state.companies = payload
}

export const setPageSettings = (state, payload) => {
  state.pages = payload
}

export const setStyles = (state, payload) => {
  state.settings.styles[payload.type] = payload.data
}

export const setImage = (state, payload) => {
  const payloadRef = Object.keys(payload)[0].split('/')
  const payloadValue = Object.values(payload)[0]
  state.settings.styles[payloadRef[0]][payloadRef[1]] = payloadValue
}
export const toggleSidebar = (state, payload) => {
  state.ui.sidebar.active = payload
}

export const minimizeSidebar = (state, payload) => {
  state.ui.sidebar.mini = payload
}

export const setInitializing = (state, payload) => {
  state.initializing = payload
}

export const setRouteDetails = (state, payload) => {
  state.route.previous = payload.from.path
  state.route.current.path = payload.to.path
  state.route.current.meta = payload.to.meta
}

export const signOut = (state, payload) => {
  state.user = payload
}

export const triggerSnackbar = (state, payload) => {
  state.ui.snackbar.active = payload.active
  state.ui.snackbar.text = payload.text
}

export const triggerAlert = (state, payload) => {
  state.ui.alert.active = payload.active
  state.ui.alert.header = payload.header
  state.ui.alert.text = payload.text
  state.ui.alert.okText = payload.okText
  state.ui.alert.cancelText = payload.cancelText
}

export const setCompanyDetails = (state, payload) => {
  var keys = []
  for (var k in payload) {
    keys.push(k)
  }
  keys.forEach(
    (key) => {
      state.company[key] = payload[key]
    }
  )
}
