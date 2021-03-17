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
        <YongHuGuanLi
          @total="total"
          ref="YongHuGuanLis"
          :size="size"
          :current="current"
        />
      </template>
      <template v-if="this.btnInfo == '权限管理'">
        <QuanXianGuanLi @total="total" ref="YongHuGuanLis" />
      </template>
      <template v-if="this.btnInfo == '在线情况'">
        <ZaiXianQingKuang />
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
        <template>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="序号"> </el-table-column>
            <el-table-column prop="name" label="运行情况"> </el-table-column>
            <el-table-column prop="address" label="服务开启时间">
            </el-table-column>
          </el-table>
        </template>
      </template>

      <div class="block">
        <span class="demonstration">完整功能</span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totals"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import YongHuGuanLi from "../SystemSettings/YongHuGuanLi";
import QuanXianGuanLi from "../SystemSettings/QuanXianGuanLi";
import ZaiXianQingKuang from "../SystemSettings/ZaiXianQingKuang";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        region: "",

        delivery: 12,
        type: [],
        resource: "",
        desc: "",
      },
      tableData: [],
      currentPage4: 4,
      //新增弹窗
      dialogVisible: false,
      btnInfo: "用户管理",
      formInline: {
        user: "",
        region: "",
      },
      size: 10,
      current: 1,
      totals: 0,
      // gridSource_list: [],
    };
  },
  methods: {
    total(data) {
      console.log(data);
      this.totals = data;
    },
    // gridSource(data) {
    //   console.log(data, 46456);
    //   this.gridSource_list = data;
    // },
    // dialogVisibleFun() {
    //   this.dialogVisible = true;
    // },
    getInfo(data) {
      this.btnInfo = data;
      window.name = data;
    },
    onSubmit() {
      console.log("submit!");
    },
    handleSizeChange(val) {
      // console.log(this.$refs.YongHuGuanLis);
      this.size = val;
      this.$refs.YongHuGuanLis.action(this.current, val);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.current = val;
      this.$refs.YongHuGuanLis.action(val, this.size);
    },
    submitForm() {},
  },
  components: {
    YongHuGuanLi,
    QuanXianGuanLi,
    ZaiXianQingKuang,
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
    position: relative;
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
  .block {
    position: absolute;
    bottom: 30px;
    right: 30px;
  }
}
</style>