import Vue from 'vue'
import Router from 'vue-router'

import meta from './meta.json'
import authGaurd from './auth-gaurd.js'
Vue.use(Router)

function route (path, view) {
  return {
    name: view,
    path: path,
    meta: meta[path],
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `../pages/${view}View.vue`
    ),
    props: meta[path]
  }
}

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    const position = {}
    // new navigation.
    // scroll to anchor by returning the selector
    return position
  }
}
function adminRoute (path, view) {
  // console.log(meta[path])
  // console.log(path)
  return {
    path: path,
    meta: meta[path],
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `../pages/admin/settings/${view}View.vue`
      ),
    props: meta[path],
    beforeEnter: authGaurd
  }
}

export default new Router({
  routes: [
    route('/contractors', 'Contractors'),
    route('/recoveryfilter', 'recoveryfilter'),
    route('/forecastfilter', 'forecastfilter'),
    route('/contract-history', 'ContractsHistory'),
    route('/opportunities', 'Opportunities'),
    route('/groups', 'groups'),
    route('/groups/:id', 'groupPage'),
    route('/opportunities/awarded', 'AwardedOpportunities'),
    route('/contractors', 'Contractors'),
    adminRoute('/admin/settings/home', 'Index'),
    adminRoute('/admin/settings/appearance', 'Appearance'),
    adminRoute('/admin/settings/pages', 'Pages'),
    adminRoute('/admin/settings/users', 'Useradmin'),
    adminRoute('/admin/settings/priviledges', 'Priviledges'),
    adminRoute('/admin/settings/requests', 'Request'),
    adminRoute('/admin/settings/gareport', 'Gareport'),
    route('/', 'Index'),
    route('/user/profile', 'Profile'),
    route('/user/feed', 'HomePage'),
    route('/questionnaire', 'Questionnaire'),
    route('/company/:name', 'Company')
  ],
  scrollBehavior,
  mode: 'history',
  beforeEach: authGaurd
})
