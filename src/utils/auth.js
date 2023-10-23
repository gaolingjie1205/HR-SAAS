// @/utils/auth.js 操作浏览器Cookies的工具JS

import Cookies from 'js-cookie'

const TokenKey = 'hrsaas-ihrm-token' // 用户token key
const TimestampKey = 'hrsaas-ihrm-timestamp' // 用户token存入vuex容器的时间戳 key

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getTimestamp() {
  return Cookies.get(TimestampKey)
}

export function setTimestamp() {
  return Cookies.set(TimestampKey, Date.now().toString(), {sameSite: 'Strict'})
}

export function removeTimestamp() {
  return Cookies.remove(TimestampKey)
}
