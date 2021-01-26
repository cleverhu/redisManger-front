<template>
  <el-container>
    <el-main style="background-color:#f0f3f9;">
      <div
        style="margin-top: 20px;    border-radius: 15px; width: 540px;color: #3d638a;border:1px solid #409EFF">
        <div><span style="display:block;text-align:center;margin-top: 5px">导出到Mysql配置</span></div>
        <el-form ref="form" :model="setting" label-width="100px" size="mini" style="width: 500px;margin-top: 20px">
          <el-form-item label="DNS">
            <el-input v-model="setting.dns" style="font-size: 15px!important;">
            </el-input>
          </el-form-item>

          <el-form-item label="TableName">
            <el-input v-model="setting.tableName" style="font-size: 15px!important;">
            </el-input>
          </el-form-item>

          <el-form-item label="ColumnOfKey">
            <el-input v-model="setting.columnOfKey" style="font-size: 15px!important;">
            </el-input>
          </el-form-item>

          <el-form-item label="ColumnOfValue">
            <el-input v-model="setting.columnOfValue" style="font-size: 15px!important;">
            </el-input>
          </el-form-item>

          <el-form-item label="">
            <el-button type="primary" style="width: 100%" @click="exportToMySql">导出</el-button>
          </el-form-item>


        </el-form>
      </div>
    </el-main>
  </el-container>
</template>


<script>


export default {
  name: "mysql",
  data() {
    return {
      setting: {dns: "root:123456@tcp(101.132.107.3:3306)/redis_manger?charset=utf8mb4&parseTime=true&loc=Local",
        tableName: "t_string", columnOfKey: "key1", columnOfValue: "value1",},
    }
  },
  methods: {
    exportToMySql: function () {
      this.axios.post(this.api.CommonToMySql, this.setting)
        .then(res => {
          alert(res.data.message)

        })
        .catch(err => {
          alert(err.message)
        })
    }

  },
  mounted() {
  },
  watch: {}
}
</script>

