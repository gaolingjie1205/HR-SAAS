// user.js

/*
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
*/
import {
  getToken,
  setToken as settToken,
  removeToken as removeeToken,
  setTimestamp,
  removeTimestamp
} from '@/utils/auth'

import { login, getUserInfo, getStaffInfo } from '@/api/user'
import avatarURL from '@/assets/common/bigUserHeader.png'

// 初始化user子模块时，从前端缓存读取cookie数据，放入vuex容器的token状态
const state = {
  token: getToken(),
  avatar: avatarURL,
  userInfo: { // 用户基本资料
    // userId: '',
    // mobile: '',
    // username: '',
    // company: '',
    // companyId: '',
    // roles: {
    //   apis: [''],
    //   menus: [''],
    //   points: ['']
    // },
    // authCacheKey: null
  }
}
const mutations = {
  // 提交mutation时，要确保vuex容器与前端缓存的数据一致
  setToken(state, payload) {
    state.token = payload
    settToken(payload)
  },
  removeToken(state) {
    state.token = null
    removeeToken()
  },
  setAvatar(state, payload) {
    state.avatar = payload
  },
  // 设置用户基本资料
  setUserInfo(state, payload) {
    state.userInfo = payload
  },
  // 删除用户基本资料，这在用户退出登录、切换用户等场景下很有用
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  async loginUser(context, payload) {
    try {
      const result = await login(payload)
      console.log('@/store/modules/user.js 已经成功提交了登录请求')
      console.log(result)
      context.commit('setToken', result)
      setTimestamp() // 检查token是否超时的依据
    } catch (e) {
      console.log('@/store/modules/user.js 在提交登录请求时发生了错误')
      console.log(e)
    }
  },
  async getUserInfos(context) {
    try {
      let result = await getUserInfo()
      const result2 = await getStaffInfo(result.userId)
      result = {
        ... result,
        ... result2
      }
      console.log('@/store/modules/user.js 已经成功获取了用户基本资料')
      console.log(result)
      context.commit('setUserInfo', result)
      return result // 后期会讲有什么用
    } catch (e) {
      console.log('@/store/modules/user.js 在获取用户基本资料时发生了错误')
      console.log(e)
      return null
    }
  },
  logoutUser(context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
    removeTimestamp()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
