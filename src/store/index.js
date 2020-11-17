import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import axios  from 'axios';

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
    login({ dispatch }, loginObj) {
      axios
      .post('https://reqres.in/api/login', loginObj)
      .then(res => {
        // 성공시 받은 토큰을 헤더에 포함시켜서 유저정보를 요청
        let token = res.data.token
        // 토큰을 로컬 스토리지에 저장
        localStorage.setItem("access_token", token)
        dispatch('getMemberInfo')
      })
      .catch(err => {
        alert('이메일 비번 확인해')
      });
      // let selectedUser = null;
      // state.allUsers.forEach(user => {
      //     if (user.email === loginObj.email) selectedUser = user
      // });
      // if (selectedUser === null || selectedUser.password !== loginObj.password ) {
      //   commit('loginError')
      // } else {
      //   commit('loginSuccess', selectedUser)
      //   // this.$router.push({ name: 'mypage'})
      //   router.push({ name: 'mypage'})
      // }
    },
    logout({ commit }) {
      commit('logout')
      router.push({name: 'login'})
    },
    getMemberInfo({ commit }) {
      // 로컬스토리지에 저장된 토큰을 불러온다.
      let token = localStorage.getItem("access_token")
      let config = {
        headers: {
          "access-token": token
        }
      }
      axios
      .get('https://reqres.in/api/users/2', config)
      .then(response => {
          let userInfo = {
            id : response.data.data.id,
            first_name: response.data.data.first_name,
            last_name : response.data.data.last_name,
            avatar : response.data.data.avatar
          }
          commit('loginSuccess', userInfo);            
      })
      .catch(error => {
          alert('이메일 비번 확인해')
      })
    }
  },
  modules: {
  }
})
