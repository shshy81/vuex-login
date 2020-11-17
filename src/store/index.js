import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    allUsers: [
      {id:1, name:'cho', email:'cho', password: "1234"},
      {id:2, name:'sh', email:'sh', password: "1234"},
    ],
    isLogin: false,
    isLoginError: false,
  },
  mutations: {
    // 로그인 성공했을때
    loginSuccess(state, payload) {
      state.isLogin = true
      state.isLoginError = false
      state.userInfo = payload    
    },
    // 로그인 실패했을때
    loginError(state) {
      state.isLogin = false
      state.isLoginError = true
    },
    logout(state) {
      state.isLogin = false
      state.isLoginError = false
      state.userInfo = null
    }
  },
  actions: {
    // 로그인을 시도
    login({ state, commit }, loginObj) {
      let selectedUser = null;
      state.allUsers.forEach(user => {
          if (user.email === loginObj.email) selectedUser = user
      });
      if (selectedUser === null || selectedUser.password !== loginObj.password ) {
        commit('loginError')
      } else {
        commit('loginSuccess', selectedUser)
        // this.$router.push({ name: 'mypage'})
        router.push({ name: 'mypage'})
      }
    },
    logout({ commit }) {
      commit('logout')
      router.push({name: 'login'})
    }
  },
  modules: {
  }
})
