<template>
  <el-container>
    <el-main style="background-color:#f0f3f9;">
      <div
        style="margin-top: 20px;    border-radius: 15px; width: 340px;color: #3d638a;border:1px solid #409EFF">
        <div><span style="display:block;text-align:center;margin-top: 5px">导出到Excel配置</span></div>
        <el-form ref="form" :model="setting" label-width="100px" size="mini" style="width: 300px;margin-top: 20px">
          <el-form-item label="KeyAxis">
            <el-input v-model="setting.keyAxis" style="font-size: 15px!important;">
            </el-input>
          </el-form-item>

          <el-form-item label="KeyName">
            <el-input v-model="setting.keyName" style="font-size: 15px!important;">
            </el-input>
          </el-form-item>

          <el-form-item label="ValueAxis">
            <el-input v-model="setting.valueAxis" style="font-size: 15px!important;">
            </el-input>
          </el-form-item>

          <el-form-item label="ValueName">
            <el-input v-model="setting.valueName" style="font-size: 15px!important;">
            </el-input>
          </el-form-item>

          <el-form-item label="SheetName">
            <el-input v-model="setting.sheetName" style="font-size: 15px!important;">
            </el-input>
          </el-form-item>

          <el-form-item label="">
            <el-button type="primary" style="width: 100%" @click="exportToFile">导出</el-button>
          </el-form-item>


        </el-form>
      </div>
    </el-main>
  </el-container>
</template>


<script>


export default {
  name: "excel",
  data() {
    return {
      setting: {keyAxis: "A1", keyName: "Key", valueAxis: "B1", valueName: "Value", sheetName: "Sheet1",},
    }
  },
  methods: {
    exportToFile: function () {
      this.axios.post(this.api.CommonToFile, this.setting)
        .then(res => {
          window.location.href = res.data.data.url
        })
        .catch(_ => {
          alert("导出失败")
        })
    }

  },
  mounted() {
  },
  watch: {}
}
</script>

