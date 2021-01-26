<template>
  <el-container>
    <el-main style="background-color:#f0f3f9;">
      <el-table
        :data="infos"
        ref="infos"
        stripe
        style="width: 100%;margin-left: 3%;background-color:transparent;"
        border>
        <el-table-column
          prop="key"
          label="配置值"
          width="250"
          align="center">
        </el-table-column>
        <el-table-column
          prop="value"
          label="值"
          width="300"
          align="center">
        </el-table-column>
        <el-table-column
          prop="desc"
          label="描述"
          width="500"
          align="center">
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>


<script>

export default {
  name: "info",
  data() {
    return {
      infos: [],
    }
  },
  methods: {
    getInfo: function () {
      this.axios.get(this.api.InfoGet)
        .then(res => {
          this.infos = res.data
        })
    }
  },
  mounted() {

    this.getInfo()
  },
  watch: {}
}
</script>

