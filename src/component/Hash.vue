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


          <el-button type="primary" @click="
          addDialog = true;
          keyDisable=false;
          fieldDisable=false;
          addTitle='添加Hash';
          addForm={}"
                     icon="el-icon-document-add" style="margin-left: 30%">单个添加
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
        <el-dialog :title="key" :visible.sync="editDialog">
          <div style="margin-top: -30px;margin-bottom: 10px">
            <el-select v-model="fieldSize" placeholder="20/页" style="width: 120px;">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-input type="number" style="width: 100px;align-content:center" v-model="fieldSize1"></el-input>
            <el-button type="success" @click="getHashVal1">搜索</el-button>
            <el-button type="primary"
                       @click="
                       addDialog=true;
                       keyDisable=true;
                       fieldDisable=false;
                       addForm={};
                       addForm.key = key;
                       addTitle='添加'+key"
                       icon="el-icon-document-add">添加
            </el-button>
          </div>

          <el-table
            :data="hashVal"
            border
            style="width: 100%">
            <el-table-column
              prop="field"
              label="字段"
              width="200px"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row.field }}
              </template>
            </el-table-column>
            <el-table-column
              prop="key"
              label="值"

              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row.value }}
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="200px">

              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  @click="
                  addForm = cloneObjectFn(scope.row);
                  checked=true;
                  addTitle='编辑'+key+',字段'+addForm.field;
                  addDialog=true;
                  keyDisable=true;
                  fieldDisable=true;
">
                  编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="removeValue(scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top: 5px;">
            <div style="margin-top: 10px;margin-bottom: -20px;">
              <span style="display:block;text-align:center">总共{{ fieldTotal }}条</span>
            </div>
          </div>
        </el-dialog>

        <el-dialog
          :title="addTitle" :visible.sync="addDialog">
          <el-form ref="form" :model="addForm" label-width="80px" size="mini"
                   style="margin-bottom: -30px;margin-top: -20px">
            <el-form-item label="Key">
              <el-input v-model="addForm.key" :disabled="keyDisable"></el-input>
            </el-form-item>
            <el-form-item label="Field">
              <el-input v-model="addForm.field" :disabled="fieldDisable"></el-input>
            </el-form-item>
            <el-form-item label="Value">
              <el-input v-model="addForm.value"></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="checked">覆盖添加</el-checkbox>
            </el-form-item>
            <el-form-item label="到期时间">
              <el-input v-model="addForm.exp" type='number' placeholder="到期时间(s)"></el-input>
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary" @click="add">立即修改</el-button>
              <el-button @click="addDialog=false">取消</el-button>
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
  name: "hash",
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
        value: 10,
        label: '10/页'
      }, {
        value: 20,
        label: '20/页'
      }, {
        value: 50,
        label: '50/页'
      }, {
        value: 100,
        label: '100/页'
      }],
      size: '20',
      centerDialogVisible: false,
      editDialog: false,
      addDialog: false,
      keyDisable: false,
      delId: 0,
      timeOut: {},
      addForm: {key: "", field: "", value: "", exp: 0, force: true},
      disable: false,
      preDisable: true,
      nextDisable: false,
      multipleSelection: [],
      method: 'hash',
      hashVal: {},
      set: {},
      fieldSize: 20,
      fieldTotal: 0,
      fieldSize1: 20,
      key: "",
      getCommon: false,
      commonDialog: false,
      commonKeys: {keys: [], method: -1},
      commonData: [],
      addTitle: "添加Hash",
      fieldDisable: false,
      checked: false,
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
      this.axios.get(this.api.HashScan, {
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
    getHashVal: function (key) {
      this.axios.get(this.api.HashGetByKey + key,
        {
          params: {page: 1, size: this.fieldSize}
        })
        .then(res => {
          this.hashVal = res.data.data
          this.fieldTotal = res.data.total
          this.key = key
          this.editDialog = true
        })
    },

    getHashVal1: function () {
      if (this.fieldSize1 < 1) {
        alert("请输入一个正确的值")
        return
      }
      this.axios.get(this.api.HashGetByKey + this.key,
        {
          params: {page: 1, size: this.fieldSize1}
        })
        .then(res => {
          this.hashVal = res.data.data
          this.fieldTotal = res.data.total
          this.editDialog = true
        })
    },

    update: function () {
      if (this.data !== null) {
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
      this.axios.delete(this.api.HashDeleteByKeys + key)
        .then(res => {

          if (res.status === 200) {
            alert(res.data.message)
            this.nextPage(this.search + "*", 0, this.size)
          } else {
            alert(res.data.message)
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

    add: function () {
      if (this.addForm.key === undefined || this.addForm.key === "") {
        alert("请输入键值")
        return
      }
      this.addForm.force = this.checked
      this.axios.post(this.api.HashPost, JSON.stringify(this.addForm))
        .then(res => {
          this.addDialog = false
          this.addForm = {}
          alert(res.data.message)
          //this.resetField()
          this.nextPage(this.search + "*", 0, this.size)
          if (this.editDialog) {
            this.getHashVal(this.key)
          }

        })
        .catch(err => {
          alert(err.message)
        })
    },
    removeValue: function (val) {
      if (confirm("是否确定要删除?")) {
        this.axios.post(this.api.HashRemove, val)
          .then(res => {
            if (res.status === 200) {
              alert(res.data.message)
              this.getHashVal(val.key)
            }
          })
          .catch(err => {
            alert(err.message)
          })
      }
    },

    edit: function (key) {
      this.fieldSize1 = 20
      this.getHashVal(key)
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
    },
    resetField: function () {
      // this.keyDisable = false
      // this.fieldDisable = false
      // this.addDialog = false
      // //this.addForm = {}
      // //this.addForm.force = true
      // console.log(this.addForm.force)
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
    },
    fieldSize: function (val, oldVal) {
      if (oldVal !== val) {
        this.getHashVal(this.key)
      }
    },

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


