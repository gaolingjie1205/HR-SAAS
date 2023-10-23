// @/directives/index.js 定义全局Vue自定义指令

// 图片加载异常的处理
export const imagerror = {
  inserted (el, binding) {
    el.onerror = function () {
      el.src = binding.value // 图片URL的替代选择
    }
  }
}
