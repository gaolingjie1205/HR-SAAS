// 引入vue核心库
import Vue from 'vue'

// 引入normalize.css，令跨浏览器默认样式更统一
import 'normalize.css/normalize.css'

// 引入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

// 引入全局SCSS样式
import '@/styles/index.scss'

import App from './App'
import store from './store'
import router from './router'

// 引入本项目的所有SVG文件
import '@/icons'

// 引入Vue导航守卫，做权限控制
import '@/permission'

// 引入全局Vue自定义指令
import * as directives from '@/directives'
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})


// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

// 禁用生产环境下的提示信息
Vue.config.productionTip = true

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
