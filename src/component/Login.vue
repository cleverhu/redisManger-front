<template>
  <div style="height: calc(100vh - .29524rem);background:#fff url('../../src/assets/login.jpg');">
    <el-card class="box-card"
             style="width: 300px;text-align:center;position:absolute;left:50%;margin-left:-150px;top:50%;margin-top: -145px;">
      <div slot="header" class="clearfix">
        <span style="font-size: 18px;">欢迎使用redis后台管理系统</span>
      </div>
      <el-form :model="ruleForm" label-width="60px">
        <el-form-item prop="username" label="账号" :rules="rules.username">
          <el-input style="width: 100%" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" :rules="rules.password">
          <el-input type="password" style="width: 100%" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label-width="0px">
          <el-button type="primary" style="width: 100%" @click="login(ruleForm)" @keyup.enter.native="enterSearch">登录
          </el-button>
        </el-form-item>
      </el-form>
      <el-tag>测试账号密码:admin admin</el-tag>
    </el-card>
  </div>
</template>

<script>

import axios from "axios";
import api from "../api/redis";

export default {
  name: "login",
  data() {
    return {
      ruleForm: {username: "", password: ""},
      resp: {code: 0, message: "", token: ""},
      rules: {
        username: [{required: true, message: "请输入用户名", blur: true}],
        password: [{required: true, message: "请输入密码", blur: true}],
      },
    }
  },
  methods: {
    login: function (user) {
      if (user.username === "" || user.password === "") {
        alert("请输入账号密码")
        return
      }
      this.axios.post(this.api.UserLogin, user)
        .then(res => {
          this.resp = res.data
          if (this.resp.token === "" || this.resp.token === undefined) {
            alert(this.resp.message)
          } else {
            localStorage.setItem("token", this.resp.token)
            localStorage.setItem("username", user.username)
            //this.$router.push("/")
            window.history.go(0)
          }
        })
    }
    ,
    enterSearch() {
      document.onkeydown = e => {
        if (e.keyCode === 13 && e.target.baseURI.match(/login/)) {
          //回车后执行搜索方法
          this.login(this.ruleForm)
        }
      }
    }

  },
  mounted() {
    let token = localStorage.getItem("token")
    if (token !== "") {
      axios.post(api.UserCheck, {
        token: token
      })
        .then(res => {
          if (res.status === 200) {
            this.$router.push("/")
          }
        })

    }
    this.enterSearch()
  }
}
</script>

<style scoped>

</style>
