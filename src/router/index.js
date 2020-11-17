import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)
const rejectAuthUser = (to, from, next) => {
  if (store.state.isLogin === true) {
    // 이미 로그인된 유저 막기
    alert('이미 로그인되었습니다.')
    next('/')
  } else {
    next()
  }
}
const onlyAuthUser = (to, from, next) => {
  if (store.state.isLogin === false) {
    // 로그인 안된 유저니 막기
    alert('로그인해주세요')
    next('/login')
  } else {
    next()
  }
}
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    beforeEnter: rejectAuthUser, //  guard
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/mypage',
    name: 'mypage',
    beforeEnter: onlyAuthUser,
    component: () => import(/* webpackChunkName: "mypage" */ '../views/Mypage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
