<template>
  <div id="app" style="height: 100%">
    <el-container style="background-color:#545c64;font-family: Microsoft YaHei,serif" v-if="!$route.meta.showOnly">
      <el-header height="60px">
        <div style="margin-top: 20px">
          <span style="font-size: 18px;color: #fff;margin-left: 40%;margin-top: 16px;width:100%">Redis后台管理系统</span>
          <el-dropdown style="color: #409eff;float:right;font-size: 18px">
      <span class="el-dropdown-link">
        {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-caret-left" @click.native="logout">
                退出
              </el-dropdown-item>
<!--              <el-dropdown-item icon="el-icon-edit">修改密码</el-dropdown-item>-->
            </el-dropdown-menu>
          </el-dropdown>

        </div>
      </el-header>
      <el-container>
        <el-aside style="width: 200px;">
          <el-col>
            <el-menu
              :default-active="$route.path"
              router
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              style="border-right:0!important;font-size: 25px!important;width: 100%;  height: calc(100vh - .29524rem);"
            >
              <el-menu-item index="/">
                <i class="el-icon-s-home"></i>
                <span slot="title">连接配置</span>
              </el-menu-item>

              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-edit-outline"></i>
                  <span>数据管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/string">string</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="/list">list</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="/hash">hash</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="/set">set</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="/sorted-set">sorted-set</el-menu-item>
                </el-menu-item-group>
<!--                <el-menu-item-group>-->
<!--                  <el-menu-item index="/GEO">GEO</el-menu-item>-->
<!--                </el-menu-item-group>-->


              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-files"></i>
                  <span>导出管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/exportToExcel">Excel</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="/exportToMysql">MySql</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="/config">
                <i class="el-icon-s-tools"></i>
                <span slot="title">配置管理</span>
              </el-menu-item>

              <el-menu-item index="/info">
                <i class="el-icon-info"></i>
                <span slot="title">redis信息</span>
              </el-menu-item>
              <el-menu-item index="/logs">
                <i class="el-icon-s-data"></i>
                <span slot="title">账户日志</span>
              </el-menu-item>
            </el-menu>

          </el-col>
        </el-aside>
        <keep-alive>
          <router-view class="view"></router-view>
        </keep-alive>
      </el-container>
    </el-container>
    <div v-else>
      <router-view></router-view>
    </div>
  </div>


</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      username: "",
    }
  },
  methods: {
    logout: function () {

      this.$confirm("是否确定要退出？")
        .then(_ => {
          localStorage.clear()
          this.$router.push("/login")
        })
    }
  },
  mounted() {
    this.username = localStorage.getItem("username")
    if (this.username) {
      this.$forceUpdate()
    }
  }
}


</script>


