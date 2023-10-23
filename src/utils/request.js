import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { getTimestamp } from '@/utils/auth'

const timeout = 1 * 60 * 60 * 1000 // token过期时间

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
request.interceptors.request.use(function(config) {
  // 请求拦截器，需要添加vuex容器里面的token
  if (store.getters.token) {
    // 只有登录后，有token了，才有必要判断token是否超时
    // 超时就做清理工作，返回登录页
    if (isTimeout(timeout)) {
      store.dispatch('user/logoutUser')
      router.push('/login')
      return Promise.reject(new Error(`当前登录已经超过${(timeout / 1000 / 60 / 60).toFixed(2)}小时，请重新登录`))
    }
    config.headers.Authorization = `Bearer ${store.getters.token}`
    return config
  }
  return config
}, function(error) {
  console.log(error)
  Message({
    showClose: true,
    message: error.message,
    type: 'error'
  })
  return Promise.reject(error)
})
request.interceptors.response.use(function(value) {
  console.log('axios响应拦截器获得原始数据如下：')
  console.log(value)
  // 响应拦截器
  const { success, message, data } = value.data // 这样解构以后，API接口就无需判断是否请求成功了，await往下走必定是真实的接口给的obj.data数据，有问题就会出现在API接口的catch代码块内
  if (success) {
    // Message({
    //   showClose: true,
    //   message: message,
    //   type: 'success'
    // })
    return Promise.resolve(data)
  } else {
    Message.error(message)
    return Promise.reject(new Error(message)) // 返回一个被拒绝的Promise，中止Promise链的执行
  }
}, function(error) {
  console.log(error)

  // 如果后端返回的code为10002，则表示后端认为用户token已超时
  // 超时就做清理工作，返回登录页
  if (error.response && error.response.data && error.response.data.code === 10002) {
    store.dispatch('user/logoutUser')
    router.push('/login')
    return Promise.reject(new Error('当前登录已经超时，请重新登录'))
  } else {
    // 其它错误
    Message({
      showClose: true,
      message: error.message,
      type: 'error'
    })
    return Promise.reject(error)
  }
})

// token是否超时
function isTimeout(timeout) {
  const currentTimestamp = Date.now()
  const preTimestamp = +getTimestamp()
  return currentTimestamp - preTimestamp >= timeout
}

export default request

/*
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  // If you want to get http information such as headers or status
  // Please return  response => response
  // Determine the request status by custom code
  // Here is just an example
  // You can also judge the status by HTTP Status Code

  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
*/
