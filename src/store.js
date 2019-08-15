import Vue from 'vue'
import Vuex from 'vuex'
import service from '@/api/service'
import axios from 'axios'

Vue.use(Vuex)

const enhanceAccessToken = () => {
  const { accessToken } = localStorage
  if (!accessToken) return
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
}
enhanceAccessToken()

export default new Vuex.Store({
  state: {
    isAuth: false,
    userInfo: {},
    accessToken: null
  },
  mutations: {
    async login (state, accessToken) {
      state.isAuth = true
      state.accessToken = accessToken
      localStorage.setItem('accessToken', accessToken)
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
      state.userInfo = (await service.getUserInfo())
    },

    logout (state) {
      state.isAuth = false
      state.accessToken = null
      localStorage.removeItem('accessToken')
      axios.defaults.headers.common['Authorization'] = null
      state.userInfo = {}
    }
  },
  actions: {
    login (state, form) {
      service.Login(form)
        .then(accessToken => {
          state.commit('login', accessToken)
        })
    },

    logout (state) {
      state.commit('logout')
    }
  },
  getters: {
    user (state) {
      return state.userInfo
    },
    isAuth (state) {
      return state.isAuth
    }
  }
})
