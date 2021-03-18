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
              <span @click="set(scope.row.devId)">设置</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
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
    <el-dialog title="功率管理" :visible.sync="dialogVisible" width="30%">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>功率设置</span>
        </div>

        <p>最大功率</p>
        <el-input v-model="maxPower"></el-input>
        <p>最小功率</p>
        <el-input v-model="minPower"></el-input>
      </el-card>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="(dialogVisible = false), setPowerFun()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getDeviceStatus, setPower } from "@/api/index.js";
export default {
  data() {
    return {
      maxPower: "",
      minPower: "",
      formInline: {
        proName: "",
        imei: "",
      },
      currentPage4: 1,
      checkList: [],
      timeValue: "",
      dialogVisible: false,
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
      current: 10,
      size: 1,
      totals: 1,
    };
  },
  mounted() {
    this.getDeviceStatusFun();
  },
  methods: {
    setPowerFun() {
      setPower(this.maxPower, this.minPower, this.devID).then((res) => {
        this.$message.success("设置成功");
      });
    },
    onSubmit() {
      console.log("submit!");
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
        "",
        3,
        this.utils.userName,
        1 //在线:1 离线:0
      ).then((res) => {
        this.tableData = res.data.list;
        this.totals = res.data.total * 1;
      });
    },
    set(data) {
      this.devID = data;
      this.dialogVisible = true;
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