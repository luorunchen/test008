<template>
  <div id="BaoJingGuZhang">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      size="mini"
    >
      <!-- <el-form-item label="事件状态:">
        <el-button-group>
          <el-button>全部</el-button>
          <el-button>报警</el-button>
          <el-button>故障</el-button>
        </el-button-group>
      </el-form-item> -->
      <el-form-item label="内容">
        <el-input
          v-model="formInline.proName"
          placeholder="项目名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="设备编号">
        <el-input v-model="formInline.imei" placeholder="设备编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <template>
      <el-table :data="tableData" style="width: 100%" height="650px" border>
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="name" label="项目名称"> </el-table-column>
        <el-table-column prop="location" label="项目位置"> </el-table-column>
        <el-table-column prop="productNumber" label="设备编号">
        </el-table-column>
        <!-- <el-table-column prop="address" label="事件详情"> </el-table-column> -->
        <el-table-column prop="heartbeatTime" label="心跳时间">
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <div class="caozuo">
              <span @click="set(scope.row.devId, scope.row.productNumber)"
                >设置</span
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <div class="block">
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
    <el-dialog title="定时设置" :visible.sync="dialogVisible" width="30%">
      <div class="time">
        <h3 class="demonstration">定时设置</h3>
        <el-date-picker
          v-model="timeValue"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
      </div>
      <h3>重复</h3>
      <el-checkbox-group v-model="checkList">
        <el-row>
          <el-col :span="6">
            <el-checkbox label="1" border>星期一</el-checkbox></el-col
          >
          <el-col :span="6"
            ><el-checkbox label="2" border>星期二</el-checkbox></el-col
          >
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-checkbox label="3" border>星期三</el-checkbox></el-col
          >
          <el-col :span="6"
            ><el-checkbox label="4" border>星期四</el-checkbox></el-col
          >
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-checkbox label="5" border>星期五</el-checkbox></el-col
          >
          <el-col :span="6"
            ><el-checkbox label="6" border>星期六</el-checkbox></el-col
          >
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-checkbox label="7" border>星期日</el-checkbox></el-col
          >
        </el-row>

        <!-- <el-checkbox label="星期三" border></el-checkbox>
        <el-checkbox label="星期四" border></el-checkbox>
        <el-checkbox label="星期五" border></el-checkbox>
        <el-checkbox label="星期六" border></el-checkbox>
        <el-checkbox label="星期天" border></el-checkbox> -->
      </el-checkbox-group>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="(dialogVisible = false), setTrue()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getDeviceStatus, getDevTime } from "@/api/index.js";
export default {
  data() {
    return {
      formInline: {
        proName: "",
        imei: "",
      },
      currentPage4: 1,
      checkList: [],
      timeValue: "",
      dialogVisible: false,
      tableData: [],
      current: 10,
      size: 1,
      totals: 1,
    };
  },
  mounted() {
    this.getDeviceStatusFun();
  },
  methods: {
    setTrue() {
      // console.log(this.timeValue);
      console.log(this.checkList);
      var start = this.$moment(this.timeValue[0]).day();
      console.log(start);
      var end = this.$moment(this.timeValue[1]).day();
      console.log(end);

      let time = this.$moment(this.timeValue[1]).diff(
        this.$moment(this.timeValue[0]),
        "days"
      );

      if (time < 7 && this.checkList.length >= 7) {
        return this.$message.error("shibai");
      }
      console.log(time);

      getDevTime(
        this.timeValue[0],
        this.timeValue[1],
        this.productNumber,
        this.checkList.toString(),
        "0",
        "default",
        this.utils.userName
      ).then(
        (res) => {
          if (res.data.status == "true") {
            this.$message.success("设置成功");
          } else {
            this.$message.error("设置失败");
          }
        },
        () => {
          this.$message.error("请稍后重试或联系管理员");
        }
      );
    },
    onSubmit() {
      console.log("submit!");
      this.getDeviceStatusFun();
    },
    handleSizeChange(val) {
      this.current = val;
      // console.log(`每页 ${val} 条`);
      this.getDeviceStatusFun();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.size = val;
      this.getDeviceStatusFun();
    },
    getDeviceStatusFun() {
      getDeviceStatus(
        this.utils.userName,
        this.size,
        "",
        this.current,
        this.formInline.imei || this.formInline.proName,
        3,
        this.utils.userName,
        1 //在线:1 离线:0
      ).then((res) => {
        this.tableData = res.data.list;
        this.totals = res.data.total * 1;
      });
    },
    set(dev, num) {
      this.dialogVisible = true;
      this.productNumber = num;
    },
  },
};
</script>
<style lang='less' scoped>
#BaoJingGuZhang {
  .caozuo {
    cursor: pointer;
    color: blue;
  }
  .block {
    position: absolute;
    bottom: 30px;
    right: 50px;
  }
}
</style>