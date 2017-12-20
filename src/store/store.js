import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'
import { clientConfig } from '../assets/config.js'

Vue.use(Vuex)

const state = {
  clientID: null,
  opportunities: {},
  forecastOpportunities: {},
  recoveryOpportunities: {},
  openGroupModal: false,
  contractHistory: {},
  contractors: {},
  adminSettings: [],
  analytics: {
    history: {},
    opportunities: {}
  },
  privileges: {
    chat: {
      group_chat: true,
      private_chat: true,
      video_chat: true,
      voice_chat: true
    }
  },
  all_priviledges: [],
  groupposts: [],
  user: {
    uid: localStorage.getItem('uid') || null,
    avatar: null,
    firstname: 'Random',
    lastname: 'User',
    email: 'email@example.com',
    jobtitle: '',
    department: '',
    social: {
      likes: [],
      comments: [],
      events: [],
      posts: []
    },
    companylegalname: '',
    businesswebsite: '',
    role: 1
  },
  company: {
    companylegalname: '',
    companylogo: '/static/img/error.png'
  },
  client: {
    cid: clientConfig.cid,
    title: 'Exchange',
    state: 'State',
    logo: '',
    tagline: 'Department of Defense, State'
  },
  categories: [0, 1, 2],
  visits: [0, 1, 2],
  posts: [],
  users: [],
  events: [],
  companies: [],
  settings: {
    pages: {
      data_exploration: {
        text: '',
        title: ''
      },
      directory: {
        text: '',
        title: ''
      },
      economic_impact: {
        text: '',
        title: ''
      },
      group_page: {
        text: '',
        title: ''
      },
      homepage: {
        text: '',
        title: ''
      },
      landing_pages: {
        case_studies: {
          block1: {
            header: '',
            sub_text: ''
          },
          block2: {
            header: '',
            sub_text: ''
          },
          block3: {
            header: '',
            sub_text: ''
          }
        },
        faq: {
          block1: {
            header: '',
            sub_text: ''
          },
          block2: {
            header: '',
            sub_text: ''
          },
          block3: {
            header: '',
            sub_text: ''
          }
        },
        footer: {
          block1: {
            header: '',
            sub_text: ''
          },
          block2: {
            header: '',
            sub_text: ''
          },
          block3: {
            header: '',
            sub_text: ''
          }
        },
        intro_section: {
          block1: {
            header: '',
            sub_text: ''
          },
          block2: {
            header: '',
            sub_text: ''
          },
          block3: {
            header: '',
            sub_text: ''
          }
        },
        jumbotron: {
          block1: {
            header: '',
            sub_text: ''
          }
        },
        info_section: {
          block1: {
            header: '',
            sub_text: ''
          }
        }
      },
      opportunities: {
        text: '',
        title: ''
      },
      questionnaire: {
        text: '',
        title: ''
      }
    },
    styles: {
      general: {
        background_color: '#fff',
        background_image: 'https://firebasestorage.googleapis.com/v0/b/defense-exchange.appspot.com/o/site_settings%2Fstyles%2Fgeneral%2Fbackground_image?alt=media&token=ca28589e-474d-4f1e-bdb1-150046400cdf',
        font_color: '#000000',
        font_size: '15',
        font_types: 'Roboto Thin',
        logo: 'https://firebasestorage.googleapis.com/v0/b/defense-exchange.appspot.com/o/site_settings%2Fstyles%2Fgeneral%2Flogo.png?alt=media&token=95b4bda7-e37e-4e7c-b4d4-cf221ad10300',
        text: 'Welcome to Defense Exchange'
      },
      landing: {
        background_color: '#ffffff',
        background_image: 'https://raw.githubusercontent.com/the-simple-vue/exchange/alpha/static/img/jet-1.jpg?token=AedG6_qFA8jH6a7gI47U1_of7ti2r6NWks5ZzL23wA%3D%3D',
        font_color: '#000000',
        font_size: '15',
        font_types: 'Roboto Thin',
        text: ''
      }
    }
  },
  loading: false,
  error: null,
  process: null,
  ui: {
    sidebar: {
      active: true,
      mini: true
    },
    snackbar: {
      active: false,
      text: 'Encountered an error. Please try again later.'
    },
    alert: {
      active: false,
      header: '',
      text: '',
      okText: '',
      cancelText: ''
    }
  },
  route: {
    previous: '',
    current: {
      path: '',
      meta: []
    }
  },
  initializing: true
}

export const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations

})
