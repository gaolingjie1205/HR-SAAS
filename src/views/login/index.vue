<template>
  <!-- 登录表单容器 -->
  <div class="login-container">
    <!-- 登录表单el-form -->
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <!-- 登录表单标题 -->
      <div class="title-container">
        <!-- HR-SAAS人力资源管理系统 -->
        <h3 class="title">
          <img src="@/assets/common/login-logo.png" alt="">
        </h3>
      </div>

      <!-- 登录表单项 -->
      <el-form-item prop="mobile">
        <!-- svg图标组件容器 -->
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.mobile"
          placeholder="手机号码"
          name="mobile"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <!-- 登录表单项 -->
      <el-form-item prop="password">
        <!-- svg图标组件容器 -->
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <!-- 显示/隐藏密码 -->
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        class="loginBtn"
        @click.native.prevent="handleLogin"
      >登录</el-button>

      <div class="tips">
        <span>账号：13800000002</span>
        <span>密码：hm#qd@23!</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validMobile } from '@/utils/validate'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data() {
    const validateMobile = (rule, value, callback) => {
      console.log('验证手机号码时，获得rule形参如下：')
      console.log(rule)
      console.log('验证手机号码时，获得value形参如下：')
      console.log(value)
      if (!validMobile(value)) {
        callback(new Error('手机号格式有误'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        mobile: '13800000002',
        password: 'hm#qd@23!'
      },
      loginRules: {
        mobile: [
          { required: true, trigger: 'blur', message: '手机号不能为空' },
          { validator: validateMobile, trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '密码不能为空' },
          { min: 6, max: 16, trigger: 'blur', message: '密码长度必须是6到16位' }
        ]
      },
      loading: false, // 登录按钮加载状态，是否正在发送登录请求
      passwordType: 'password', // 密码文本框的type类型，决定了是否显示密码、右侧眼睛图标的切换
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    // 切换密码显示状态、右侧眼睛图标的切换
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // 处理用户的登录请求
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (!valid) return
        this.loading = true
        // this.$store.dispatch('user/login', this.loginForm).then(() => {
        //   this.$router.push({ path: this.redirect || '/' })
        //   this.loading = false
        // }).catch(() => {
        //   this.loading = false
        // })
        try {
          // 调用vuex容器的loginUser action方法，完成AJAX请求，更新token，切换到主页
          this.$store.commit('user/removeToken')
          await this['user/loginUser'](this.loginForm)
          if (this.$store.state.user.token) {
            this.$router.push('/')
          }
        } catch (e) {
          console.log(e)
        } finally {
          this.loading = false
        }
      })
    },
    ...mapActions(['user/loginUser'])
  }
}
</script>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

$bg2:#283443;
$light_gray2:#68b0fe;
$cursor: #fff;

/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
/*
根据给出的代码，@supports 是一个CSS条件规则，它检查浏览器是否支持某个CSS属性或属性值。在这个示例中，条件规则检查浏览器是否支持属性 -webkit-mask 和属性值 none，并且不支持属性 color 为变量 $cursor 的值。如果条件满足，那么 .login-container .el-input input 选择器下的元素的文本颜色将被设置为变量 $cursor 的值。这样做的目的是在支持特定的浏览器环境下，设置输入框的文本颜色为 $cursor，以提供更好的用户体验。
*/
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

// 登录表单容器
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  background-image: url('~@/assets/common/login.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow: hidden;

  // 登录表单el-form
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    // 登录表单标题
    .title-container {
      position: relative;

      .title {
        margin: 0px auto 40px;
        font-weight: bold;
        font-size: 26px;
        color: $light_gray;
        text-align: center;
      }
    }

    // 登录表单项el-form-item
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(255, 255, 255, 0.7);
      border-radius: 5px;
      color: #454545;

      // svg图标组件容器
      .svg-container {
        display: inline-block;
        padding: 6px 5px 6px 15px;
        width: 30px;
        color: $dark_gray;
        vertical-align: middle;
      }
      .el-input {
        display: inline-block;
        width: 85%;
        height: 52px;

        // ::v-deep 用于深度修改el-input组件内的input
        ::v-deep .el-input__inner {
          height: 52px;
          padding: 12px 5px 12px 15px;
          border: 0px;
          border-radius: 0px;
          background-color: transparent !important;
          color: $light_gray2;
          appearance: none;
          -webkit-appearance: none;

          // 当浏览器自动填充表单字段时，它会为相应的输入框添加此伪类，从而允许您针对这种情况设置特定的样式
          &:-webkit-autofill {
            box-shadow: 0 0 0px 1000px $bg2 inset !important;
            -webkit-text-fill-color: $cursor !important;
          }
        }
      }

      // 校验错误时的提示信息
      ::v-deep .el-form-item__error {
        color: #fff !important;
      }

      // 显示/隐藏密码
      .show-pwd {
        position: absolute;
        top: 7px;
        right: 10px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
      }
    }

    // 登录按钮
    .loginBtn {
      width: 100%;
      height: 64px;
      margin-bottom: 30px;
      font-size: 24px;
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 20px;
      }
    }
  }
}
</style>
