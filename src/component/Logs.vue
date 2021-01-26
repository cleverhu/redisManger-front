<template>
  <el-container>
    <el-main style="background-color:#f0f3f9;">
      <div style="width: 810px;margin-left: 30px">

        <el-input style="width:40%;border-radius: 10px 0 0 10px;" v-model="pageObj.search"></el-input>
        <el-button type="success" icon="el-icon-search" @click="getLogs(true)">搜索</el-button>
        <el-button type="primary" @click="pageObj.search=''" style="margin-left: 10px">重置</el-button>
<!--        <el-button type="success" icon="el-icon-search" @click="getLogs(true)">上一页</el-button>-->
<!--        <el-button type="success" icon="el-icon-search" @click="getLogs(true)">下一页</el-button>-->
        <el-table
          :data="logs"
          border
          style="width: 810px"
        >
          <el-table-column
            label="序号"
            type="index"
            width="50"
            align="center">
          </el-table-column>
          <el-table-column
            prop="uid"
            label="用户"
            width="100" align="center">
          </el-table-column>
          <el-table-column
            prop="action"
            label="操作对象"
            width="100" align="center">
          </el-table-column>
          <el-table-column
            prop="path"
            label="路径" align="center"
            width="280">
          </el-table-column>

          <el-table-column
            prop="method"
            label="模式"
            width="100" align="center">
          </el-table-column>
          <el-table-column
            prop="log_time"
            label="日志时间"
            width="180" align="center">
          </el-table-column>
        </el-table>

        <el-pagination

          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="pageObj.page"
          :page-sizes="[20, 50, 100, 200]"
          :page-size="pageObj.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageObj.total"
          style="width: 810px">
        </el-pagination>
      </div>

    </el-main>
  </el-container>
</template>


<script>


export default {
  name: "logs",
  data() {
    return {
      logs: [],
      pageObj: {page: 1, size: 20, search: "", total: 0,}
    }
  },
  methods: {
    getLogs: function (isSearch) {
      if (isSearch) {
        this.pageObj.page = 1
      }
      this.axios.post(this.api.LogsGet, this.pageObj)
        .then(res => {
          this.logs = res.data.result.logs
          this.pageObj.total = res.data.result.total
        })
    },
    sizeChange: function (val) {
      //alert(val)
      this.pageObj.size = val
      this.pageObj.page = 1
      this.getLogs()
    },
    currentChange: function (val) {
      //alert(val)
      this.pageObj.page = val
      this.getLogs()
    }
  },
  mounted() {
    this.getLogs()

  },
  watch: {}
}
</script>

