<template>
  <div id="app">
    <div class="title">
      <div class="gotoSy">
        <div style="width: 130px">
          <router-link to="/"> <p>返回首页</p></router-link>
        </div>
      </div>
      <div class="xiaofangInfo">
        <p>系统设置</p>

        <p>-{{ btnInfo }}</p>
      </div>
      <div class="fenbuInfo">
        <div
          :class="btnInfo == '用户管理' ? 'infoBtn infoBtnClick' : 'infoBtn'"
          @click="getInfo('用户管理')"
        >
          <p>用户管理</p>
        </div>
        <div
          :class="btnInfo == '权限管理' ? 'infoBtn infoBtnClick' : 'infoBtn'"
          @click="getInfo('权限管理')"
        >
          <p>权限管理</p>
        </div>
        <div
          :class="btnInfo == '在线情况' ? 'infoBtn infoBtnClick' : 'infoBtn'"
          @click="getInfo('在线情况')"
        >
          <p>在线情况</p>
        </div>
        <div
          :class="btnInfo == '系统日志' ? 'infoBtn infoBtnClick' : 'infoBtn'"
          @click="getInfo('系统日志')"
        >
          <p>系统日志</p>
        </div>
      </div>
    </div>
    <div class="content_wapper">
      <template v-if="this.btnInfo == '用户管理'">
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          size="mini"
        >
          <el-form-item label="审批人">
            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="审批人">
            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="formInline.region" placeholder="活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <!-- <el-button type="primary" @click="onSubmit">新增</el-button> -->
            <el-button type="primary" @click="dialogVisible = true"
              >新增
            </el-button>
          </el-form-item>
        </el-form>
      </template>
      <template v-if="this.btnInfo == '权限管理'">
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
            <el-button type="primary" @click="dialogVisible = true"
              >新增
            </el-button>
          </el-form-item>
        </el-form>
      </template>
      <template v-if="this.btnInfo == '在线情况'">
        <div class="onLineInfo">
          <ul>
            <li>
              <p>7506</p>
              <p>用户总数</p>
            </li>
            <li>
              <p>7506</p>
              <p>用户总数</p>
            </li>
            <li>
              <p>7506</p>
              <p>用户总数</p>
            </li>
            <li>
              <p>7506</p>
              <p>用户总数</p>
            </li>
          </ul>
        </div>
        <div class="onLineBG"></div>
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          size="mini"
        >
          <el-form-item label="账号">
            <el-input v-model="formInline.user" placeholder="账号"></el-input>
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
      </template>
      <template v-if="this.btnInfo == '系统日志'">
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
      </template>
      <div class="tabs">
        <el-table :data="tableData" height="85%" border style="width: 100%">
          <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column label="地址">
            <div class="caozuo">
              <span @click="dialogVisible = true">编辑</span>
              <span>禁用</span>
              <span>删除</span>
            </div>
          </el-table-column>
        </el-table>
      </div>
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
    <el-dialog title="新增" :visible.sync="dialogVisible" width="50%">
      <template v-if="this.btnInfo == '用户管理'">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="200px"
          class="demo-ruleForm"
          :inline="true"
        >
          <el-form-item label="账号" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="region">
            <el-input v-model="ruleForm.region"></el-input>
          </el-form-item>

          <el-form-item label="手机号码" prop="delivery">
            <el-input v-model="ruleForm.delivery"></el-input>
          </el-form-item>
          <el-form-item label="选择角色" prop="type">
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox label="后台技术人员" name="type"></el-checkbox>
              <el-checkbox label="超级管理员" name="type"></el-checkbox>
              <el-checkbox label="一般管理员" name="type"></el-checkbox>
              <el-checkbox label="管理员" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="真实姓名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="region">
            <el-input v-model="ruleForm.region"></el-input>
          </el-form-item>
          <el-form-item label="固定电话" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="公司名称(所属单位)" prop="region">
            <el-input v-model="ruleForm.region"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="region">
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
      <template v-if="this.btnInfo == '权限管理'">
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
      <template v-if="this.btnInfo == '在线情况'"></template>
      <template v-if="this.btnInfo == '系统日志'"></template>
    </el-dialog>
  </div>
</template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      //新增弹窗
      dialogVisible: false,
      btnInfo: "用户管理",
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
    };
  },
  methods: {
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
  },
  mounted() {
    if (window.name == "") {
      this.btnInfo = "用户管理";
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
#app {
  /deep/.el-dialog__header {
    background: #1071e2;

    /deep/.el-dialog__title {
      color: #fff;
    }
    /deep/.el-dialog__headerbtn .el-dialog__close {
      color: #fff;
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
      background-image: url("../images/Rectangle 2 copy.png");
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
}
</style>