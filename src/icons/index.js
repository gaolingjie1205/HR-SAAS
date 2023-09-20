import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

// 使用require.context方法创建一个上下文，用于动态导入指定目录下的文件。这里将上下文赋值给req常量
const req = require.context('./svg', false, /\.svg$/)

// 定义一个名为requireAll的函数，用于导入req上下文中的所有文件。函数体是通过调用requireContext.keys()获得所有文件路径，再通过map和requireContext动态导入这些文件
const requireAll = requireContext => requireContext.keys().map(requireContext)

// 执行requireAll函数，导入所有位于req上下文中的.svg文件
requireAll(req)
