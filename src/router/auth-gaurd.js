
import { store } from '../store/store.js'

export default (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.getUserDetails.uid === null || store.getters.getUserDetails.uid === undefined) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
}
