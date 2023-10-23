const getters = {
  // user.js
  token: state => state.user.token,
  // avatar: state => state.user.avatar,
  username: state => state.user.userInfo.username,
  userId: state => state.user.userInfo.userId,
  staffPhoto: state => state.user.userInfo.staffPhoto,
  
  // app.js
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,

  // settings.js
  title: state => state.settings.title,
  fixedHeader: state => state.settings.fixedHeader,
  sidebarLogo: state => state.settings.sidebarLogo
}
export default getters
