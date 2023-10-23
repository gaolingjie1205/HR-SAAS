import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
    // { mobile: '手机号', password: '密码' }
  })
}

// 获取用户基本资料
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

// 获取员工基本信息
export function getStaffInfo (userId) {
  return request({
    url: `/sys/user/${userId}`,
    // method: 'get'
  })
}

export function logout() {
  // return request({
  //   url: '/vue-admin-template/user/logout',
  //   method: 'post'
  // })
}
