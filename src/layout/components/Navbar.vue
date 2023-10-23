<template>
  <div class="navbar">
    <!-- 汉堡按钮组件，根据侧边栏的折叠状态会更改自身显示 -->
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <!-- 面包屑导航组件 -->
    <!-- 本项目不使用面包屑，注释掉 -->
    <!-- <breadcrumb class="breadcrumb-container" /> -->

    <!-- 黑马公司的信息 -->
    <div class="app-breadcrumb">
      <span>江苏传智播客教育科技股份有限公司</span>
      <span class="breadBtn">体验版</span>
    </div>

    <!-- 右侧头像、下拉菜单 -->
    <div class="right-menu">
      <!-- 头像就是下拉菜单的容器 -->
      <!-- trigger触发下拉的行为，默认是hover，这里令用户点击时才展示下拉菜单 -->
      <el-dropdown trigger="click" class="avatar-container">
        <div class="avatar-wrapper">
          <!-- 头像 -->
          <!-- <img :src="$store.getters.staffPhoto || $store.getters.avatar" alt="" class="avatar"> -->
          <img
            v-imagerror="defaultImg"
            :src="$store.getters.staffPhoto"
            alt=""
            class="avatar"
          >
          <!-- 昵称 -->
          <span class="name">{{ $store.getters.username }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <!--
        <span class="el-dropdown-link">
          下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        -->
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>首页</el-dropdown-item>
            </router-link>
            <a href="https://github.com/gaolingjie1205/HR-SAAS" target="_blank">
              <el-dropdown-item>项目地址</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click.native="logout()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    // Breadcrumb
    Hamburger
  },
  data() {
    // const THIS = this
    return {
      // defaultImg: THIS.$store.getters.avatar
      defaultImg: require('@/assets/common/head.jpg')
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout() {
      this.$store.dispatch('user/logoutUser')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  background-image: linear-gradient(to left,#3d6df8,#5b8cff);
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  // 黑马公司的信息
  .app-breadcrumb {
    float: left;
    height: 50px;
    margin-left: 10px;
    font-size: 18px;
    color: #fff;
    line-height: 50px;

    .breadBtn {
      display: inline-block;
      height: 30px;
      padding: 0 10px;
      margin-left: 15px;
      border-radius: 10px;
      background-color: #84a9fe;
      font-size: 14px;
      line-height: 30px;
    }
  }

  .breadcrumb-container {
    float: left;
  }

  // 右侧头像、下拉菜单
  .right-menu {
    float: right;
    height: 50px;
    font-size: 14px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    // 头像就是下拉菜单的容器
    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;
        margin-top: 10px;

        // 头像
        .avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          vertical-align: middle;
          cursor: pointer;
        }
        // 昵称
        .name {
          margin-left: 5px;
          color: #fff;
          vertical-align: middle;
        }
        // 菜单指示器
        .el-icon-caret-bottom {
          position: absolute;
          top: 25px;
          right: -20px;
          font-size: 12px;
          color: #fff;
          cursor: pointer;
        }
      }
      // .el-dropdown-link{
      //   color: #409eff;
      //   cursor: pointer;

      //   .el-icon-arrow-down {
      //     font-size: 12px;
      //   }
      // }
    }
  }
}
</style>
