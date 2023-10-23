<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 v-else class="sidebar-title">{{ title }} </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import avatarURL from '@/assets/common/logo.png'

export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: '人力资源管理平台',
      logo: avatarURL
    }
  }
}
</script>

<style lang="scss" scoped>
// 过渡动画
.sidebarLogoFade-enter-active {
  transition: opacity 1s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 50px;
  background: transparent;
  line-height: 50px;
  text-align: center;

  & .sidebar-logo-link {
    width: 100%;
    height: 100%;

    // LOGO图片
    & .sidebar-logo {
      width: 140px;
      vertical-align: middle;
      margin-right: 12px;
    }

    // LOGO文字
    & .sidebar-title {
      display: inline-block;
      margin: 0;
      font-weight: 600;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      color: #fff;
      vertical-align: middle;
    }
  }

  // 折叠时，令LOGO图片无外边距，宽度变窄
x  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
      width: 32px;
      width: 32px;
    }
  }
}
</style>
