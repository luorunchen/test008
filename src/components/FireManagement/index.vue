<template>
  <div id="app">
    <div class="title">
      <div class="gotoSy">
        <div style="width: 130px">
          <router-link to="/"> <p>返回首页</p></router-link>
        </div>
      </div>
      <div class="xiaofangInfo">
        <p>消防管理</p>

        <p>-{{ btnInfo }}</p>
      </div>
      <div class="fenbuInfo">
        <div
          :class="btnInfo == '项目管理' ? 'infoBtn infoBtnClick' : 'infoBtn'"
          @click="getInfo('项目管理')"
        >
          <p>项目管理</p>
        </div>
        <div
          :class="btnInfo == '设备管理' ? 'infoBtn infoBtnClick' : 'infoBtn'"
          @click="getInfo('设备管理')"
        >
          <p>设备管理</p>
        </div>
        <div
          :class="btnInfo == '单位管理' ? 'infoBtn infoBtnClick' : 'infoBtn'"
          @click="getInfo('单位管理')"
        >
          <p>单位管理</p>
        </div>
        <div
          :class="btnInfo == '消防新闻' ? 'infoBtn infoBtnClick' : 'infoBtn'"
          @click="getInfo('消防新闻')"
        >
          <p>消防新闻</p>
        </div>
      </div>
    </div>
    <div class="content_wapper">
      <template v-if="this.btnInfo == '项目管理'">
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          size="mini"
        >
          <el-form-item label="项目名称">
            <el-input
              v-model="formInline.user"
              placeholder="项目名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="防火员">
            <el-input v-model="formInline.user" placeholder="防火员"></el-input>
          </el-form-item>
          <el-form-item label="负责人">
            <el-input v-model="formInline.user" placeholder="负责人"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>

            <el-button type="primary" @click="dialogVisible = true"
              >新增项目
            </el-button>
            <el-button type="primary" @click="onSubmit"
              >删除责任人和防火员</el-button
            >
          </el-form-item>
        </el-form>
        <div class="tabs">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column type="index" :index="indexMethod">
            </el-table-column>
            <el-table-column label="项目名称" width="120">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="name" label="项目位置" width="120">
            </el-table-column>
            <el-table-column
              prop="address"
              label="防火员"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="防火员电话"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="责任人"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="责任人电话"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="项目介绍"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column prop="address" label="备注" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" show-overflow-tooltip>
              <div class="caozuo">
                <span @click="dialogVisible = true">编辑</span>
                <span @click="delClick">删除</span>
                <span @click="newClick">新增设备</span>
              </div>
            </el-table-column>
          </el-table>
        </div>
      </template>
      <template v-if="this.btnInfo == '设备管理'">
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          size="mini"
        >
          <el-form-item label="设备类型">
            <el-input
              v-model="formInline.user"
              placeholder="设备类型"
            ></el-input>
          </el-form-item>
          <el-form-item label="项目名称">
            <el-input
              v-model="formInline.user"
              placeholder="项目名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="设备号">
            <el-input v-model="formInline.user" placeholder="设备号"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>

            <!-- <el-button type="primary" @click="dialogVisible = true"
              >新增项目
            </el-button>
            <el-button type="primary" @click="onSubmit"
              >删除责任人和防火员</el-button
            > -->
          </el-form-item>
        </el-form>
        <div class="tabs">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column type="index" :index="indexMethod">
            </el-table-column>
            <el-table-column label="项目名称" width="120">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="name" label="项目位置" width="120">
            </el-table-column>
            <el-table-column
              prop="address"
              label="设备类型"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="设备号"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="注册时间"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="心跳时间"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="设备厂商"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="是否授权"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="保险单号"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="是否开启流量"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column prop="address" label="备注" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" show-overflow-tooltip>
              <div class="caozuo">
                <span>编辑</span>
                <span>删除</span>
                <span>设置</span>
              </div>
            </el-table-column>
          </el-table>
        </div>
      </template>
      <template v-if="this.btnInfo == '单位管理'">
        <el-row :gutter="20">
          <el-col :span="4">
            <div class="danwei_left">
              <p class="titleP">行政区域</p>
              <el-tree :data="data" :props="defaultProps" accordion> </el-tree>
            </div>
          </el-col>
          <el-col :span="20">
            <div class="danwei_right">
              <div class="one"></div>
              <div style="padding: 20px 0 0 40px">
                <el-form
                  :inline="true"
                  :model="formInline"
                  class="demo-form-inline"
                  size="mini"
                >
                  <el-form-item label="单位名称">
                    <el-input
                      v-model="formInline.user"
                      placeholder="单位名称"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="防火员">
                    <el-input
                      v-model="formInline.user"
                      placeholder="防火员"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="项目负责人">
                    <el-input
                      v-model="formInline.user"
                      placeholder="项目负责人"
                    ></el-input>
                  </el-form-item>

                  <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                  </el-form-item>
                </el-form>
                <div class="tabs">
                  <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 97%"
                  >
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column type="index" :index="indexMethod">
                    </el-table-column>
                    <el-table-column label="单位名称" width="120">
                      <template slot-scope="scope">{{
                        scope.row.date
                      }}</template>
                    </el-table-column>
                    <el-table-column prop="name" label="所属区域" width="120">
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="联系电话"
                      show-overflow-tooltip
                    >
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="防火员"
                      show-overflow-tooltip
                    >
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="项目负责人"
                      show-overflow-tooltip
                    >
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="巡查点数"
                      show-overflow-tooltip
                    >
                    </el-table-column>

                    <el-table-column label="操作" show-overflow-tooltip>
                      <div class="caozuo">
                        <span @click="dialogVisible_search = true">查看</span>
                      </div>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </template>
      <template v-if="this.btnInfo == '消防新闻'">
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          size="mini"
        >
          <el-form-item label="角色名称">
            <el-input
              v-model="formInline.user"
              placeholder="角色名称"
            ></el-input>
          </el-form-item>

          <el-form-item label="状态">
            <el-select v-model="formInline.region" placeholder="状态">
              <el-option label="启用" value="shanghai"></el-option>
              <el-option label="禁用" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <!-- <el-button type="primary" @click="onSubmit">新增</el-button> -->
            <!-- <el-button type="primary" @click="dialogVisible = true"
              >新增
            </el-button> -->
          </el-form-item>
        </el-form>
        <div class="tabs">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column type="index" :index="indexMethod">
            </el-table-column>
            <el-table-column label="新闻名称" width="1200">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="name" label="发表时间" width="400">
            </el-table-column>

            <el-table-column label="操作" show-overflow-tooltip>
              <div class="caozuo">
                <span @click="dialogVisible_search = true">查看</span>
              </div>
            </el-table-column>
          </el-table>
        </div>
      </template>

      <div class="block">
        <span class="demonstration">完整功能</span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        >
        </el-pagination>
      </div>
    </div>

    <!-- 用户管理新增弹窗 -->
    <el-dialog
      title="新增"
      :visible.sync="dialogVisible"
      width="50%"
      :modal-append-to-body="false"
    >
      <template v-if="this.btnInfo == '项目管理'">
        <el-form
          size="mini"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="300px"
          class="demo-ruleForm"
          :inline="true"
        >
          <el-form-item label="项目名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="项目位置" prop="region">
            <el-input v-model="ruleForm.region"></el-input>
          </el-form-item>

          <el-form-item label="防火员" prop="delivery">
            <el-autocomplete placeholder="请输入内容"></el-autocomplete>
            <el-button type="primary" plain @click="outerVisible = true"
              >新增</el-button
            >
          </el-form-item>
          <el-form-item label="责任人" prop="type">
            <el-autocomplete placeholder="请输入内容"></el-autocomplete>
            <el-button type="primary" plain @click="outerVisible = true"
              >新增</el-button
            >
          </el-form-item>
          <el-form-item label="网格员" prop="name">
            <el-autocomplete placeholder="请输入内容"></el-autocomplete>
            <el-button type="primary" plain @click="outerVisible = true"
              >新增</el-button
            >
          </el-form-item>
          <el-form-item label="街道负责人" prop="region">
            <el-autocomplete placeholder="请输入内容"></el-autocomplete>
            <el-button type="primary" plain @click="outerVisible = true"
              >新增</el-button
            >
          </el-form-item>
          <el-form-item label="应用场所" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="项目介绍(所属单位)" prop="region">
            <el-input v-model="ruleForm.region"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="region">
            <el-input v-model="ruleForm.region"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确 定</el-button
          >
        </span>
      </template>
      <template v-if="this.btnInfo == '设备管理'">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="200px"
          class="demo-ruleForm"
          :inline="true"
        >
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="区域权限" prop="region">
            <el-input v-model="ruleForm.region"></el-input>
          </el-form-item>

          <el-form-item label="用户管理" prop="type">
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox label="后台技术人员" name="type"></el-checkbox>
              <el-checkbox label="超级管理员" name="type"></el-checkbox>
              <el-checkbox label="一般管理员" name="type"></el-checkbox>
              <el-checkbox label="管理员" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="项目管理" prop="type">
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox label="后台技术人员" name="type"></el-checkbox>
              <el-checkbox label="超级管理员" name="type"></el-checkbox>
              <el-checkbox label="一般管理员" name="type"></el-checkbox>
              <el-checkbox label="管理员" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确 定</el-button
          >
        </span>
      </template>
      <!-- <template v-if="this.btnInfo == '单位管理'"></template>
      <template v-if="this.btnInfo == '消防新闻'"></template> -->
    </el-dialog>

    <!-- 搜索内容弹窗 -->
    <div class="titleWapper">
      <el-dialog :visible.sync="dialogVisible_search" width="60%">
        <p class="title_name">设备名称</p>

        <el-row :gutter="20">
          <el-col :span="8">
            <!-- 电气火灾展示数据 -->
            <template>
              <div class="scroll_wapper">
                <div class="left_one">
                  <ul>
                    <li>在线监测</li>
                    <li>更新时间</li>
                    <li>报警类型</li>
                    <li>位置</li>
                  </ul>
                </div>
              </div>
            </template>
          </el-col>
          <el-col :span="16">
            <div class="right_wapper">
              <el-row
                style="margin-bottom: 20px"
                v-show="this.$route.name != 'KeyParts'"
                :gutter="20"
              >
                <el-col :span="8"
                  ><div
                    :class="
                      equipmentColor == 'police' ? 'one equipmentColor' : 'one'
                    "
                    @click="equipment('police')"
                  >
                    <div class="one_item"></div>
                    <p>1</p>
                    <p>报警设备</p>
                  </div></el-col
                >
                <el-col :span="8"
                  ><div
                    :class="
                      equipmentColor == 'onLine' ? 'two equipmentColor' : 'two'
                    "
                    @click="equipment('onLine')"
                  >
                    <div class="two_item"></div>
                    <p>1</p>
                    <p>在线设备</p>
                  </div></el-col
                >
                <el-col :span="8"
                  ><div
                    :class="
                      equipmentColor == 'offLine'
                        ? 'three equipmentColor'
                        : 'three'
                    "
                    @click="equipment('offLine')"
                  >
                    <div class="three_item"></div>
                    <p>1</p>
                    <p>离线设备</p>
                  </div></el-col
                >
              </el-row>

              <el-row :gutter="20">
                <el-col :span="12"
                  ><div class="four">
                    <p>单位简介</p>
                    <p>
                      大家看到啦数据库的垃圾的考拉手机打开胜利大街奥斯卡来得及奥斯卡来得及奥斯卡大家可达师姐裸考
                    </p>
                    <p>
                      大家看到啦数据库的垃圾的考拉手机打开胜利大街奥斯卡来得及奥斯卡来得及奥斯卡大家可达师姐裸考
                    </p>
                    <p>大家看到啦数据库</p>
                  </div></el-col
                >
                <el-col :span="12"
                  ><div class="five">
                    <p>一周内报警数</p>
                    <div class="echart_wapper"></div></div
                ></el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </el-dialog>
    </div>

    <!-- 新增人员弹窗 -->
    <el-dialog
      center
      width="30%"
      title="新增"
      :visible.sync="outerVisible"
      :modal-append-to-body="false"
    >
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input size="mini"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input size="mini"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="outerVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>


<script>
export default {
  data() {
    return {
      outerVisible: false,
      equipmentColor: "police",
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],

        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change",
          },
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" },
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
      ruleForm: {
        name: "",
        region: "",

        delivery: 12,
        type: [],
        resource: "",
        desc: "",
      },
      currentPage4: 4,
      //单位管理弹窗
      dialogVisible_search: false,
      //新增弹窗
      dialogVisible: false,
      btnInfo: "项目管理",
      formInline: {
        user: "",
        region: "",
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      data: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1",
                },
              ],
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1",
                },
              ],
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    newClick() {},
    // 项目管理删除
    delClick() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    equipment(data) {
      this.equipmentColor = data;
    },
    getInfo(data) {
      this.btnInfo = data;
      window.name = data;
    },
    onSubmit() {
      console.log("submit!");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          this.dialogVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    indexMethod(index) {
      return index * 2;
    },
  },
  mounted() {
    if (window.name == "") {
      this.btnInfo = "项目管理";
    } else if (window.name != "") {
      this.btnInfo = window.name;
    }
  },
  destroyed() {
    window.name = "";
  },
};
</script>
<style lang='less' scoped>
/deep/.el-dialog__header {
  background: #1071e2;

  /deep/.el-dialog__title {
    color: #fff;
  }
  /deep/.el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
}
#app {
  .titleWapper {
    /deep/.el-dialog__header {
      background: rgb(20, 49, 108);
      padding: 0;
      // /deep/.el-dialog__title {
      //   width: 255px;
      //   height: 30px;
      //   display: inline-block;
      //   background: linear-gradient(90deg, #3053af, #14295a);
      //   color: #fff;
      // }
      // /deep/.el-dialog__headerbtn .el-dialog__close {
      //   color: #fff;
      // }
    }
    /deep/.el-dialog__body {
      color: #fff;
      height: 100%;
      background: linear-gradient(0deg, rgb(39, 65, 132), rgb(2, 17, 50, 0.62));

      border: 1px solid #3486da;
      // border-radius: 6px;
    }
    .title_name {
      width: 255px;
      height: 30px;
      background: linear-gradient(90deg, #3053af, #14295a);
      line-height: 30px;
      padding-left: 16px;
    }
    .scroll_wapper {
      margin-top: 15px;
      // position: relative;
      overflow-y: auto;
      height: 370px; //高度根据需求自行设定
      overflow-x: hidden;
    }
    .scroll_wapper ::-webkit-scrollbar {
      display: none; /*隐藏滚动条*/
    }
    .left_one {
      margin-top: 15px;
      // width: 371px;
      // height: 131px;
      background: linear-gradient(-87deg, #3053af, #14295a);
      border: 1px solid #3486da;
      ul {
        margin: 15px 0 0 15px;
        li {
          margin-bottom: 10px;
        }
      }
    }

    .right_wapper {
      margin-top: 30px;
      .one {
        cursor: pointer;
        position: relative;
        width: 236px;
        height: 75px;
        background: rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(54, 238, 248, 0.2);
        p {
          text-align: center;

          line-height: 50px;

          &:nth-child(2) {
            font-size: 20px;
            color: #f830af;
          }
          &:nth-child(3) {
            // font-size: 20px;
            line-height: 0;
          }
        }
      }
      .equipmentColor {
        background: rgba(30, 85, 143);
      }

      .one_item::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;

        border-left: 2px solid #00c0ff;
        border-bottom: 2px solid #00c0ff;

        width: 10px;
        height: 10px;
      }
      .one_item::after {
        content: "";
        position: absolute;
        right: 0;
        bottom: 0;

        border-right: 2px solid #00c0ff;
        border-bottom: 2px solid #00c0ff;

        width: 10px;
        height: 10px;
      }
      .one::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;

        border-left: 2px solid #00c0ff;
        border-top: 2px solid #00c0ff;

        width: 10px;
        height: 10px;
      }
      .one::after {
        content: "";
        position: absolute;
        right: 0;
        top: 0;
        border-right: 2px solid #00c0ff;
        border-top: 2px solid #00c0ff;
        width: 10px;
        height: 10px;
      }
      .two {
        cursor: pointer;
        position: relative;
        width: 236px;
        height: 75px;
        background: rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(54, 238, 248, 0.2);
        p {
          text-align: center;

          line-height: 50px;

          &:nth-child(2) {
            font-size: 20px;
            color: #30ff32;
          }
          &:nth-child(3) {
            // font-size: 20px;
            line-height: 0;
          }
        }
      }
      .equipmentColor {
        background: rgba(30, 85, 143);
      }

      .two_item::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;

        border-left: 2px solid #00c0ff;
        border-bottom: 2px solid #00c0ff;

        width: 10px;
        height: 10px;
      }
      .two_item::after {
        content: "";
        position: absolute;
        right: 0;
        bottom: 0;

        border-right: 2px solid #00c0ff;
        border-bottom: 2px solid #00c0ff;

        width: 10px;
        height: 10px;
      }
      .two::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;

        border-left: 2px solid #00c0ff;
        border-top: 2px solid #00c0ff;

        width: 10px;
        height: 10px;
      }
      .two::after {
        content: "";
        position: absolute;
        right: 0;
        top: 0;
        border-right: 2px solid #00c0ff;
        border-top: 2px solid #00c0ff;
        width: 10px;
        height: 10px;
      }
      .three {
        cursor: pointer;
        position: relative;
        width: 236px;
        height: 75px;
        background: rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(54, 238, 248, 0.5);
        p {
          text-align: center;

          line-height: 50px;

          &:nth-child(2) {
            font-size: 20px;
            color: #c0cbe9;
          }
          &:nth-child(3) {
            // font-size: 20px;
            line-height: 0;
          }
        }
      }
      .equipmentColor {
        background: rgba(30, 85, 143);
      }
      .three_item::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;

        border-left: 2px solid #00c0ff;
        border-bottom: 2px solid #00c0ff;

        width: 10px;
        height: 10px;
      }
      .three_item::after {
        content: "";
        position: absolute;
        right: 0;
        bottom: 0;

        border-right: 2px solid #00c0ff;
        border-bottom: 2px solid #00c0ff;

        width: 10px;
        height: 10px;
      }
      .three::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;

        border-left: 2px solid #00c0ff;
        border-top: 2px solid #00c0ff;

        width: 10px;
        height: 10px;
      }
      .three::after {
        content: "";
        position: absolute;
        right: 0;
        top: 0;
        border-right: 2px solid #00c0ff;
        border-top: 2px solid #00c0ff;
        width: 10px;
        height: 10px;
      }
      .four {
        height: 274px;
        border: 1px solid #3486da;
        p {
          &:nth-child(1) {
            width: 180px;
            height: 30px;
            background: linear-gradient(90deg, #3053af, #14295a);
            line-height: 30px;
            padding-left: 16px;
            // margin-top: 14px;
            margin: 15px 0 0 15px;
          }
          &:nth-child(2) {
            padding: 0 16px;
            text-indent: 2em;
          }
          &:nth-child(3) {
            padding: 0 16px;
            text-indent: 2em;
          }
          &:nth-child(4) {
            padding: 0 16px;
            text-indent: 2em;
          }
        }
      }
      .five {
        height: 274px;
        border: 1px solid #3486da;
        p {
          width: 180px;
          height: 30px;
          background: linear-gradient(90deg, #3053af, #14295a);
          line-height: 30px;
          padding-left: 16px;
          margin: 15px 0 0 15px;
        }
        .echart_wapper {
          height: 230px;
        }
      }
    }
  }

  color: #fff;
  width: 100%;
  height: calc(100vh);
  background: #030542;
  .title {
    margin-bottom: 20px;
    display: flex;
    width: 100%;
    height: 108px;
    // background: #030542;
    position: relative;
    z-index: 999;
    .gotoSy {
      width: 190px;
      height: 76px;
      background-image: url("../../assets/images/Rectangle 2 copy.png");
      background-size: 100% 100%;
      p {
        font-size: 22px;
        text-align: center;
        line-height: 90px;
      }
    }
    .xiaofangInfo {
      margin-top: 10px;
      width: 325px;
      p {
        font-weight: bold;
        text-align: center;
        &:nth-child(1) {
          font-size: 46px;
        }
        &:nth-child(2) {
          font-size: 26px;
        }
      }
      // background: #fff;
    }
    .fenbuInfo {
      width: 1400px;
      display: flex;
      flex-wrap: wrap;
      margin-top: 20px;
      .infoBtn {
        margin-right: 14px;
        width: 130px;
        height: 30px;
        background: linear-gradient(0deg, #274184, #021132);
        border: 1px solid #3486da;
        border-radius: 6px;
        p {
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #ffffff;
          line-height: 30px;
          text-align: center;
        }
      }
      .infoBtnClick {
        background: rgb(48, 148, 213);
      }
    }
  }
  .content_wapper {
    box-sizing: border-box;
    padding: 20px 20px 0 20px;
    margin: 0 30px;
    height: 800px;
    background: #fff;
  }
  .tabs {
    .caozuo {
      span {
        cursor: pointer;
        color: #1071e2;
        margin-right: 10px;
      }
    }
  }
  .onLineInfo {
    height: 110px;
    padding-top: 20px;
    box-sizing: border-box;
    ul {
      li {
        width: 158px;
        float: left;
        border-left: 1px solid #eaeaea;
        &:nth-child(1) {
          border: none;
        }
        p {
          font-size: 22px;
          color: #000;
          text-align: center;
          &:nth-child(2) {
            font-size: 14px;
            color: #999;
          }
        }
      }
    }
  }
  .onLineBG {
    width: 103%;
    height: 20px;
    background: #030542;
    // margin: 0 20px 0 -20px;
    margin-left: -20px;
    margin-bottom: 20px;
    // float: left;
  }
  .danwei_left {
    color: #000;
    height: 700px;
    // background: #bfa;
    margin: -20px 0 0 -20px;
    .titleP {
      padding-left: 20px;
      line-height: 40px;
      border-bottom: 1px solid #f3f6fa;
      // text-align: center;
    }
  }
  .danwei_right {
    color: #000;
    margin: -20px;
    height: 800px;
    // background: rgb(170, 176, 255);
    .one {
      width: 20px;
      height: 100%;
      background: #021132;
      // position: relative;
      // display: inline;
      float: left;
    }
  }
  .block {
    position: absolute;
    right: 30px;
    bottom: 30px;
  }
}
</style>