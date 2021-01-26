<template>
  <el-container>
    <el-main style="background-color:#545c64">
      <div id="box">
        <el-select v-model="size" placeholder="20/页" style="width: 120px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <el-input style="width:40%" v-model="search"></el-input>
        <el-button type="success" @click="nextPage(search,0,size)" icon="el-icon-search">搜索</el-button>
        <el-button type="primary" @click="search=''" style="margin-left: 10px">重置</el-button>
        <el-button type="primary" @click="toFile" style="float: right" icon="el-icon-files">导出数据</el-button>
        <div style="margin-top: 5px">
          <el-button @click="toggleSelection()">取消选择</el-button>
          <el-button type="primary" @click="nextPage(search,-1,size) " icon="el-icon-arrow-left"
                     :disabled="preDisable">
            上一页
          </el-button>
          <el-button type="primary" @click="nextPage(search,1,size)" :disabled="nextDisable">下一页<i
            class="el-icon-arrow-right el-icon--right"></i></el-button>
          <el-button type="primary" @click="dialogFormVisible = true" style="margin-left: 35%"
                     icon="el-icon-document-add">单个添加
          </el-button>
          <el-button type="danger" @click="centerDialogVisible = true;batchDel(multipleSelection)"
                     icon="el-icon-delete-solid">批量删除
          </el-button>
        </div>
        <el-table
          ref="multipleTable"
          :data="data"
          style="width: 100%"
          border
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            type="index"
            width="50"
            label="序号"
          >
          </el-table-column>
          <el-table-column
            label="Key"
            width="100"
            align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.value }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag type="success" size="medium">{{ scope.row.key }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="desc"
            label="Value"
            width="300"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exp"
            label="exp"
            width="150"
            align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <!--              <el-button-->
              <!--                size="mini"-->
              <!--                type="primary"-->
              <!--                icon="el-icon-link"-->
              <!--                @click="openUrl(scope.row)">前往-->
              <!--              </el-button>-->
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="edit(scope.row)">编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="centerDialogVisible = true;delId = scope.row.key">删除
              </el-button>
            </template>
          </el-table-column>

        </el-table>


        <el-dialog
          title="提示"
          :visible.sync="centerDialogVisible"
          width="30%"
          center>
          <span style="display:block;text-align:center">是否确定要删除?</span>

          <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="danger" @click="del(delId)">确 定</el-button>
  </span>
        </el-dialog>
        <el-dialog title="添加(修改)String" :visible.sync="dialogFormVisible" :before-close="handleClose">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="Key">
              <el-input v-model="form.key" :disabled="disable"></el-input>
            </el-form-item>
            <el-form-item label="Value">
              <el-input v-model="form.value"></el-input>
            </el-form-item>
            <el-form-item label="到期时间">
              <el-input v-model="form.exp" type='number' placeholder="到期时间(s)"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="add(form)">修改</el-button>
              <el-button @click="reset()">重置</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <div>
          <span style="display:block;text-align:center;margin-top: 20px">当前第{{ current }}页</span>
        </div>
      </div>
    </el-main>


    <!--    <el-footer style="background-color:#545c64">-->
    <!--      <div>-->
    <!--        <span style="display:block;text-align:center">当前第{{ current }}页</span>-->
    <!--      </div>-->
    <!--    </el-footer>-->
  </el-container>
</template>

<script>


export default {
  name: "string",
  data() {
    return {
      search: "",
      preSearch: "",
      preCurs: [],
      nextCursor: 0,
      data: [],
      current: 0,
      options: [{
        value: '20',
        label: '20/页'
      }, {
        value: '100',
        label: '100/页'
      }, {
        value: '200',
        label: '200/页'
      }, {
        value: '500',
        label: '500/页'
      }, {
        value: '1000',
        label: '1000/页'
      },],
      size: '20',
      centerDialogVisible: false,
      dialogFormVisible: false,
      delId: 0,
      timeOut: {},
      form: {key: "", value: "", exp: 0},
      disable: false,
      preDisable: true,
      nextDisable: false,
      multipleSelection: [],
      method: "string",
    }
  },
  methods: {
    nextPage: function (search, flag, size) {
      clearInterval(this.timeOut);
      if (this.current === 1 && flag === 0 && search === "" && this.preSearch === "") {
        return
      }
      let cursor = 0
      if (flag === -1) {
        this.preCurs.pop()
        cursor = this.preCurs.pop()
        this.current -= 1

      } else if (flag === 1) {
        cursor = this.nextCursor
        this.current += 1
      } else {
        this.current = 1
      }
      this.axios.get(this.api.StringScan, {
        params: {search: search, cursor: cursor, size: size, method: this.method}
      }).then(res => {
        this.data = res.data.data
        this.nextCursor = res.data.next
        this.nextDisable = this.nextCursor === 0;
        this.preCurs.push(res.data.current)

      })
      this.timeOut = setInterval(() => {
        this.update()
      }, 1000);
      this.preSearch = search
      this.preDisable = this.current <= 1;
    },
    update: function () {
      if (this.data !== undefined) {
        for (let i = 0; i < this.data.length; i++) {
          let d = this.data[i]
          if (d.exp !== "-") {
            d.exp -= 1
            if (d.exp <= 0) {
              this.nextPage(this.search, 0, this.size)
              break
            }
          }
        }
      }
    },
    del: function (key) {
      this.centerDialogVisible = false
      this.axios.delete(this.api.StringDeleteByKeys + key)
        .then(res => {
          if (res.status === 200) {
            alert(res.data.message)
            this.nextPage(this.search + "*", 0, this.size)
          }
        })
        .catch(err => {
          alert(err.message)
        })
      this.nextPage(this.search + "*", 0, this.size)
    },
    batchDel: function (arr) {
      let ids = ""
      for (let i = 0; i < arr.length; i++) {
        ids += arr[i].key + ":"
      }
      this.delId = ids
    },
    add: function (form) {
      if (form.key === undefined || form.key === "") {
        alert("请输入键值")
        return
      }
      form.exp = parseInt(form.exp)
      this.axios.post(this.api.StringPost, JSON.stringify(form))
        .then(res => {
          if (res.status === 200) {
            this.dialogFormVisible = false
            alert(res.data.message)
            this.form = {}
            this.first = false
            this.nextPage(this.search + "*", 0, this.size)
          }
        })
        .catch(err => {
          alert(err.message)
        })
    },
    edit: function (form) {
      this.form = this.cloneObjectFn(form)
      this.disable = true
      this.dialogFormVisible = true
    },
    reset: function () {
      if (this.disable) {
        this.form.exp = 0
        this.form.value = ''
      } else {
        this.form = {}
      }
    },
    handleClose: function () {
      this.disable = false
      this.form = {}
      this.dialogFormVisible = false
    },


    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    cloneObjectFn(obj) { // 对象复制
      return JSON.parse(JSON.stringify(obj))
    },
    toFile: function () {
      this.axios.get(this.api.StringToFile)
        .then(res => {
          let url = res.data.data.url
          window.location.href = url
        })
        .catch(_ => {
          alert("导出失败")
        })
    }
  },
  mounted() {
    this.nextPage("", 0)
  },
  watch: {
    size: function (val, oldVal) {
      if (oldVal !== val) {
        this.nextPage(this.search + "*", 0, val)
      }
    }
  }
}
</script>

<style scoped>

</style>
