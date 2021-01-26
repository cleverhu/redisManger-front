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
          <!--          <el-button type="primary"-->
          <!--                     @click="getCommonFunc(0)"-->
          <!--                     style="margin-left: 10%"-->
          <!--                     :disabled="!getCommon">-->
          <!--            查看距离-->
          <!--          </el-button>-->


          <el-button type="primary" @click="addDialog = true;keyDisable=false"
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
              <el-tag type="success" size="medium">{{ scope.row.key }}</el-tag>
            </template>
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

        <el-dialog title="编辑GEO" :visible.sync="addDialog">

          <el-form ref="form" :model="addForm" label-width="80px" size="mini"
                   style="margin-top: -20px;margin-bottom: -30px">
            <el-form-item label="Key">
              <el-input v-model="addForm.key" :disabled="keyDisable"></el-input>
            </el-form-item>
            <el-form-item label="Member">
              <el-input v-model="addForm.member"></el-input>
            </el-form-item>
            <el-form-item label="Longitude">
              <el-input v-model="addForm.longitude" type='number'></el-input>
            </el-form-item>
            <el-form-item label="Latitude">
              <el-input v-model="addForm.latitude" type='number'></el-input>
            </el-form-item>
            <el-form-item label="到期时间">
              <el-input v-model="addForm.exp" type='number' placeholder="到期时间(s)"></el-input>
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary" @click="add(addForm)">立即修改</el-button>
              <el-button @click="addDialog=false;addForm={}">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>


        <el-dialog :title="keysCommonName" :visible.sync="commonDialog">
          <el-table
            :data="commonData"
            border
            style="width: 100%;margin-top: -30px;">
            <el-table-column
              label="值"
              style="width: 100%!important;"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row }}
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top: 5px">
            <div style="margin-top: 10px;margin-bottom: -20px">
              <span style="display:block;text-align:center">总共{{ commonData.length }}条</span>
            </div>
          </div>
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
  name: "geo",
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
      editDialog: false,
      addDialog: false,
      delId: 0,
      timeOut: {},
      addForm: {key: "", member: "", longitude: 0, latitude: 0, exp: 0},
      keyDisable: true,
      disable: false,
      preDisable: true,
      nextDisable: false,
      multipleSelection: [],
      method: 'geo',
      setVal: {},
      set: {},
      pageObj: {page: 1, size: 5, total: 0, realTotal: 0},
      key: "",
      getCommon: false,
      commonDialog: false,
      commonKeys: {keys: [], method: -1},
      commonData: [],
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
      this.axios.get(this.api.GEOScan, {
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
    getSetVal: function (key) {

      this.axios.get(this.api.SetGetByKey + key,
        {
          params: {page: this.pageObj.page, size: this.pageObj.size}
        })
        .then(res => {
          this.setVal = res.data.data
          this.pageObj.total = res.data.total_page * this.pageObj.size
          this.pageObj.realTotal = res.data.total
          this.key = key
          this.editDialog = true
        })
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
      this.axios.delete(this.api.SetDeleteByKeys + key)
        .then(res => {

          if (res.status === 200) {
            alert("删除成功")
            this.nextPage(this.search + "*", 0, this.size)
          } else {
            alert("删除失败")
          }
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
      form.longitude = parseFloat(form.longitude)
      form.latitude = parseFloat(form.latitude)

      this.axios.post(this.api.GEOPost, JSON.stringify(form))
        .then(res => {
          this.addDialog = false
          alert(res.data.message)
          this.addForm = {}
          this.nextPage(this.search + "*", 0, this.size)
        })
        .catch(err => {
          alert(err.message)
        })
    },
    removeValue: function (val) {
      if (confirm("是否确定要删除?")) {
        this.axios.post(this.api.SetRemove, val)
          .then(res => {
            if (res.status === 200) {
              alert(res.data.message)
              this.getSetVal(val.key)
            }
          })
          .catch(err => {
            alert(err.message)
          })
      }
    },

    edit: function (key) {
      this.pageObj.page = 1
      this.pageObj.size = 5
      this.getSetVal(key)
    },
    handleSizeChange: function (val) {
      this.pageObj.size = val
      this.pageObj.page = 1
      this.getSetVal(this.key)
    },
    handleCurrentChange: function (val) {
      this.pageObj.page = val
      this.getSetVal(this.key)
    },

    getCommonFunc: function (method) {
      this.commonKeys.method = method;
      this.commonKeys.keys = [];
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.commonKeys.keys[i] = this.multipleSelection[i].key
      }
      this.commonDialog = true;

      this.axios.post(this.api.SetGetCommon, this.commonKeys)
        .then(res => {
          this.commonData = res.data.data
        })

    },
    handleClose: function () {
      this.editDialog = false
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
      this.getCommon = this.multipleSelection.length >= 2;
    },
    cloneObjectFn(obj) { // 对象复制
      return JSON.parse(JSON.stringify(obj))
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
  },
  computed: {
    keysCommonName: {
      get: function () {
        let title = ""

        for (let i = 0; i < this.commonKeys.keys.length; i++) {
          if (i !== this.commonKeys.keys.length - 1) {
            title += this.commonKeys.keys[i] + "和"
          } else {
            title += this.commonKeys.keys[i]
            if (this.commonKeys.method === 0) {
              title += "的交集"
            } else {
              title += "的并集"
            }
          }
        }
        return title
      }
    }
  }
}
</script>


