<template>
  <el-container>
    <el-main style="background-color:#f0f3f9;">
      <span style="font-size: 18px">欢迎{{ username }}使用redis管理系统,请配置您的redis。如果不配置，则系统默认展示用例数据</span>
      <div
        style="margin-top: 20px;    border-radius: 15px; width: 340px;color: #3d638a;border:1px solid #409EFF">
        <div><span style="display:block;text-align:center;margin-top: 5px">修改配置</span></div>
        <el-form ref="form" :model="cfg" label-width="80px" size="mini" style="width: 300px;margin-top: 20px">
          <el-form-item label="Host">
            <el-input v-model="cfg.host" style="font-size: 15px!important;">
            </el-input>
          </el-form-item>
          <el-form-item label="Port">
            <el-input v-model="cfg.port" type="number" style="font-size: 15px!important;">
            </el-input>
          </el-form-item>
          <el-form-item label="Password">
            <el-input v-model="cfg.password" style="font-size: 15px!important;">
            </el-input>
          </el-form-item>
          <el-form-item label="DB">
            <el-input v-model="cfg.db" type="number" style="font-size: 15px!important;">
            </el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" style="width: 100px" @click="connectTest(cfg)">连接测试</el-button>
            <el-button type="primary" style="width: 100px" @click="saveConfig(cfg)" :disabled="!connect">保存配置
            </el-button>
          </el-form-item>


        </el-form>
      </div>

      <div
        style="margin-top: 20px;    border-radius: 15px; width: 340px;color: #3d638a;border:1px solid #409EFF">
        <div><span style="display:block;text-align:center;margin-top: 5px">当前配置</span></div>
        <el-form ref="form" :model="nowCfg" label-width="80px" size="mini" style="width: 300px;margin-top: 20px">
          <el-form-item label="Host">
            <el-input v-model="nowCfg.host" style="font-size: 15px!important;" :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item label="Port">
            <el-input v-model="nowCfg.port" type="number" style="font-size: 15px!important;" :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item label="Password">
            <el-input v-model="nowCfg.password" style="font-size: 15px!important;" :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item label="DB">
            <el-input v-model="nowCfg.db" type="number" style="font-size: 15px!important;" :disabled="true">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>


<script>


export default {
  name: "index",
  data() {
    return {
      username: "",
      cfg: {host: "", port: 6379, password: "", db: 0},
      nowCfg: {},
      connect: false,
    }
  },
  methods: {
    connectTest: function (cfg) {
      //console.log(cfg)
      this.axios.post(this.api.ConnectTest, cfg)
        .then(_ => {
          alert("连接成功")
          this.connect = true
        })
        .catch(_ => {
            alert("连接失败")
          }
        )
    },
    saveConfig: function (cfg) {
      //console.log(cfg)
      this.axios.post(this.api.ConnectSave, cfg)
        .then(_ => {
          alert("保存成功")
          this.connect = true
          this.nowCfg = cfg
        })
        .catch(_ => {
            alert("保存失败")
          }
        )
    },
    getConfig: function () {
      //console.log(cfg)
      this.axios.get(this.api.ConnectGet)
        .then(res => {
          this.nowCfg = res.data.data
        })

    }
  },
  mounted() {
    this.username = localStorage.getItem("username")
    let token = localStorage.getItem("token")
    if (token !== "") {
      this.axios.post(this.api.UserCheck, {
        token: token
      })
        .then(res => {
          if (res.status === 200) {
            this.$router.push("/")
          }
        }).catch(err => {
        this.$router.push("/login")
      })
    } else {
      this.$router.push("/login")
    }

    this.getConfig()
  },
  watch: {}
}
</script>

