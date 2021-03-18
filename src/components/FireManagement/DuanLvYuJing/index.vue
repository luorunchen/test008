<template>
  <div id="BaoJingGuZhang">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      size="mini"
    >
      <el-form-item label="事件状态:">
        <el-button-group>
          <el-button @click="btn('')">全部</el-button>
          <el-button @click="btn('0')">报警</el-button>
          <el-button @click="btn('1')">故障</el-button>
        </el-button-group>
      </el-form-item>
      <el-form-item label="项目名称">
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
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="pname" label="项目名称" width="180">
        </el-table-column>
        <el-table-column prop="address" label="项目位置" width="180">
        </el-table-column>
        <el-table-column prop="devno" label="设备编号"> </el-table-column>
        <el-table-column prop="type" label="事件详情"> </el-table-column>
        <el-table-column prop="regdate" label="事件时间"> </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <div class="caozuo">
              <span @click="see(scope.row.devId)">查看</span>
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
    <BaojingTranslate ref="baojingTranslate" />
  </div>
</template>

<script>
import BaojingTranslate from "../../FireInternetOfThings/translate/baojingTranslate";
import { getAlarmDevice } from "@/api/index.js";
export default {
  data() {
    return {
      formInline: {
        proName: "",
        imei: "",
      },
      tableData: [],
      totals: 0,
      current: 10,
      size: 1,
      currentPage4: 1,
    };
  },
  mounted() {
    this.DeviceAlarmFun();
  },
  components: {
    BaojingTranslate,
  },
  methods: {
    see(data) {
      this.$refs.baojingTranslate.see(264224);
    },
    btn(num) {
      this.num = num;
      this.DeviceAlarmFun();
    },
    DeviceAlarmFun(obj) {
      getAlarmDevice(
        this.utils.userName,
        this.size,
        this.num,
        this.current,
        obj,
        "短路"
      ).then((res) => {
        if (obj != "" && res.data.list.length <= 0) {
          return this.$message.error("未查询到结果");
        }
        this.tableData = res.data.list;
        this.totals = res.data.total * 1;
      });
    },
    handleSizeChange(val) {
      this.current = val;
      // console.log(`每页 ${val} 条`);
      this.DeviceAlarmFun();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.size = val;
      this.DeviceAlarmFun();
    },
    onSubmit() {
      console.log("submit!");
      let obj = this.formInline.imei || this.formInline.proName;
      // console.log(obj, "sssss");
      // if (obj == "") {
      //   return this.$message.error("请输入关键词后重试");
      // }
      console.log(obj);
      this.DeviceAlarmFun(obj);
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
    bottom: 20px;
    right: 50px;
  }
}
</style>