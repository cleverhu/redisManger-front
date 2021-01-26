<template>
  <el-container>
    <el-main style="background-color:#f0f3f9;">
      <el-table
        :data="cfs"
        stripe

        style="width: 100%;margin-left: 3%;background-color:transparent;"
        border>

        <el-table-column
          type="index"
          width="50"
          label="序号"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="key"
          label="配置值"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="value"
          label="值"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="note"
          label="备注(手工整理，难免有误，欢迎提出错误)"
          width="500"
          align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" width="100px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="edit(scope.row)">编辑
            </el-button>
          </template>
        </el-table-column>

      </el-table>


      <el-dialog title="修改配置" :visible.sync="dialogFormVisible" :before-close="handleClose">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="Key">
            <el-input v-model="form.key" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="Value">
            <el-input v-model="form.value"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-checkbox v-model="form.file">修改配置文件(永久生效)</el-checkbox>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="update(form)">修改</el-button>
          </el-form-item>

        </el-form>
      </el-dialog>

    </el-main>
  </el-container>
</template>


<script>


import axios from "axios";
import api from "../api/redis";

export default {
  name: "config",
  data() {
    return {
      cfs: [],
      form: {},
      dialogFormVisible: false,
    }
  },
  methods: {
    getConfig: function () {
      this.axios.get(this.api.ConfigGet)
        .then(res => {
          if (res.status === 200) {
            this.cfs = res.data.config
          }
        })

    },
    edit: function (form) {
      this.form = this.cloneObjectFn(form)
      this.dialogFormVisible = true
    },
    update: function (form) {
      let res = {}
      this.axios.post(this.api.ConfigPost, JSON.stringify(form))
        .then(resp => {
          res = resp
          if (resp.data.message === "success") {
            alert("修改配置成功")
            this.dialogFormVisible = false
            this.getConfig()
          } else {
            alert("修改配置失败:" + resp.data.message)
          }
        })
        .catch(err => {
          if (err !== undefined) {
            alert("修改配置失败")
          }
        })
    },
    handleClose: function (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.getConfig()
          done();
        })
        .catch(_ => {
        });
    },
    cloneObjectFn(obj) { // 对象复制
      return JSON.parse(JSON.stringify(obj))
    },
  },
  mounted() {
    this.getConfig()
  },
  watch: {}
}
</script>

