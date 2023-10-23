<template>
  <div :class="classObj" class="app-wrapper">
    <!-- 移动端黑色半透明遮罩层 -->
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <!-- 侧边导航栏容器 -->
    <sidebar class="sidebar-container" />
    <!-- 主操作区容器 -->
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>
      <!-- 主要内容都显示在这里 -->
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    // 类名对象，这里的每个属性都是一个css类名
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        // 如果sidebar已经展开，则openSidebar为true，hideSidebar为false，这是vue组件判断sidebar状态的依据，决定vue组件会带有哪个CSS类名
        openSidebar: this.sidebar.opened,
        // 是否有sidebar动画
        withoutAnimation: this.sidebar.withoutAnimation,
        // 根据vuex里面的device判断当前设备是移动端，还是桌面端
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    width: 100%;
    height: 100%;

    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
    // 移动端黑色半透明遮罩层
    .drawer-bg {
      position: absolute;
      top: 0;
      z-index: 999;
      width: 100%;
      height: 100%;
      background: #000;
      opacity: 0.3;
    }
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
