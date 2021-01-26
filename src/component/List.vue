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

        <div style="margin-top: 5px">
          <el-button @click="toggleSelection()">取消选择</el-button>
          <el-button type="primary" @click="nextPage(search,-1,size) " icon="el-icon-arrow-left"
                     :disabled="preDisable">
            上一页
          </el-button>
          <el-button type="primary" @click="nextPage(search,1,size)" :disabled="nextDisable">下一页<i
            class="el-icon-arrow-right el-icon--right"></i></el-button>
          <el-button type="primary" @click="addDialog = true" style="margin-left: 35%"
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
            width="200"
            align="center">
            <template slot-scope="scope">
              <!--              <el-popover trigger="hover" placement="top">-->
              <!--                <p>{{ scope.row.value }}</p>-->
              <!--                <div slot="reference" class="name-wrapper">-->

              <!--                </div>-->
              <!--              </el-popover>-->
              <el-tag type="success" size="medium">{{ scope.row.key }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="len"
            label="Length"
            width="100"
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
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="edit(scope.row.key)">编辑
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
        <el-dialog :title="l.key" :visible.sync="editDialog" :before-close="handleClose">

          <el-select v-model="insertInfo.method" placeholder="头部插入" style="width: 20%;margin-bottom: 5px">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input style="width: 60%" v-model="insertInfo.value"></el-input>
          <el-button type="success" style="width: 18%" @click="insert()">添加</el-button>


          <el-table
            :data="l.data"
            border
            style="width: 100%">
            <el-table-column
              label="值"
              width="400px"
              align="center"
            >
              <template slot-scope="scope">
                <!--                <el-tag type="success" size="medium">{{ scope.row }}</el-tag>-->
                {{ scope.row.value }}
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="removeValue(scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top: 5px">
            <el-pagination
              small
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="page"
              :page-sizes="[5, 10, 20, 50]"
              :page-size="pSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="l.len">
            </el-pagination>
          </div>
        </el-dialog>

        <el-dialog title="添加List" :visible.sync="addDialog" :before-close="handleClose1">
          <el-form ref="form" :model="form" label-width="80px" size="mini">
            <el-form-item label="Key">
              <el-input v-model="form.key"></el-input>
            </el-form-item>
            <el-form-item label="Value">
              <el-input v-model="form.value"></el-input>
            </el-form-item>
            <el-form-item label="到期时间">
              <el-input v-model="form.exp" type='number' placeholder="到期时间(s)"></el-input>
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary" @click="add(form)">立即创建</el-button>
              <el-button @click="handleClose1()">取消</el-button>
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
  name: "list",
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
      options1: [{
        value: 0,
        label: '头部插入'
      }, {
        value: 1,
        label: '尾部插入'
      }],
      size: '20',
      centerDialogVisible: false,

      editDialog: false,
      addDialog: false,
      delId: 0,
      timeOut: {},
      form: {},
      disable: false,
      preDisable: true,
      nextDisable: false,
      multipleSelection: [],
      method: 'list',
      l: {},
      page: 1,
      pSize: 5,
      insertInfo: {method: 0, value: "", key: ""},
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
      this.axios.get(this.api.ListScan, {
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
      //console.log(key)
      //centerDialogVisible = true;
      this.axios.delete(this.api.ListDeleteByKeys + key)
        .then(res => {
          alert(res.data.message)
          this.nextPage(this.search + "*", 0, this.size)
        })
        .catch(err => {
          alert(err.message)
        })
      this.nextPage(this.search + "*", 0, this.size)
    },
    removeValue: function (val) {
      if (confirm("是否确定要删除?")) {
        this.axios.post(this.api.ListRemove, val)
          .then(res => {

            alert(res.data.message)
            this.getList(val.key)
            this.nextPage(this.search, 0, this.size)
          })
          .catch(err => {
            alert(err.message)
          })
      }
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
      this.axios.get(this.api.ListExists + form.key)
        .then(res => {
          if (res.status === 200) {
            let ret = res.data.result
            let msg = res.data.message
            if (ret === -1) {
              alert(msg)
              return
            } else if (ret === 0) {
              if (confirm(msg)) {
                form.exist = true
              } else {
                return
              }
            }
            this.axios.post(this.api.ListPost, JSON.stringify(form))
              .then(res => {
                this.addDialog = false
                alert(res.data.message)
                this.form = {}
                this.nextPage(this.search + "*", 0, this.size)
              })
              .catch(err => {
                alert(err.message)
              })
          }
        })
    },
    edit: function (key) {
      this.page = 1
      this.pSize = 5
      this.key = key
      this.getList(key)

    },
    handleSizeChange: function (val) {
      this.pSize = val
      this.page = 1
      this.getList(this.key)
    },
    handleCurrentChange: function (val) {
      this.page = val
      this.getList(this.key)
      //if(this.page)
    },
    getList: function (key) {
      this.axios.get(this.api.ListGetByKey + key,
        {
          params: {page: this.page, size: this.pSize}
        })
        .then(res => {
          this.l = res.data
          this.insertInfo.key = this.l.key
          this.editDialog = true
        })
    },
    insert: function () {
      if (this.insertInfo.value === undefined || this.insertInfo.value === "") {
        alert("请输入要添加的值")
        return
      }
      this.axios.post(this.api.ListInsert, this.insertInfo)
        .then(res => {
          if (res.status === 200) {
            alert(res.data.message)
            this.getList(this.insertInfo.key)
            this.insertInfo.value = ""
          }
        })
        .catch(err => {
          alert("插入失败")
        })
    },
    handleClose: function () {
      this.l = {}
      this.editDialog = false
    },
    handleClose1: function () {
      this.form = {}
      this.addDialog = false
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
    test: function () {
      console.log(this.insertInfo)
      console.log(JSON.stringify(this.insertInfo))
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


