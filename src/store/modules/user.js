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
import { getToken, setToken as settToken, removeToken as removeeToken } from '@/utils/auth'
import { login } from '@/api/user'

// 初始化user子模块时，从前端缓存读取cookie数据，放入vuex容器的token状态
const state = {
  token: getToken()
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
  }
}
const actions = {
  async loginUser(context, payload) {
    try {
      const result = await login(payload)
      console.log('@/store/modules/user.js 已经成功提交了登录请求')
      console.log(result)
      context.commit('setToken', result)
    } catch (e) {
      console.log('@/store/modules/user.js 在提交登录请求时发生了错误')
      console.log(e)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
