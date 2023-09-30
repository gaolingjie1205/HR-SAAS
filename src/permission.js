/*
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo')

          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // has no token

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
*/

import router from '@/router'
import store from '@/store'

// 引入进度条
// 这个进度条会在路由开始切换时，展示在页面顶部，是一个蓝色的小长条；中间如果加载比较慢，则它会从左到右一点一点增加，同时右上方的spinner小圈圈也会一直旋转，告诉用户正在加载；在路由结束切换时，拉伸到最长100%，然后蓝色的小长条、spinner小圈圈同时消失
// https://www.npmjs.com/package/nprogress
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 白名单页面
const whiteList = ['/login', '/404']

// 全局前置导航守卫
router.beforeEach((to, from, next) => {
  nProgress.start()
  if (store.getters.token) {
    if (to.path === '/login') {
      // 无需重复登录
      next('/')
    } else {
      // 已登录，有权访问任何页面
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 基础白名单页面，放行
      next()
    } else {
      // 非法访问，阻止
      next('/login')
    }
  }
  // 当最终等效生成的路由路径与当前用户所处的路由路径一致时，无法触发全局后置导航守卫，这里需要手动关闭进度条的加载状态，否则不美观
  nProgress.done()
})

// 全局后置导航守卫
router.afterEach(() => {
  nProgress.done()
})
