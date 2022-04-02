<template>
  <div>
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      size="mini"
    >
      <el-form-item label="查询时间">
        <el-date-picker
          v-model="formInline.time"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="设备名称">
        <el-input
          v-model="formInline.device_name"
          placeholder="设备名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="设备号">
        <el-input
          v-model="formInline.productNumber"
          placeholder="设备号"
        ></el-input>
      </el-form-item>
      <el-form-item label="在线状态">
        <el-select v-model="formInline.state" placeholder="请选择">
          <el-option label="所有" value=""></el-option>
          <el-option label="在线" value="1"></el-option>
          <el-option label="离线" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="报警状态">
        <el-select v-model="formInline.alarmType" placeholder="请选择">
          <el-option label="所有" value=""></el-option>
          <el-option label="正常" value="0"></el-option>
          <el-option label="报警" value="1"></el-option>
          <el-option label="故障" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否过期">
        <el-select v-model="formInline.expiration" placeholder="请选择">
          <el-option label="所有" value=""></el-option>
          <el-option label="已过期" value="1"></el-option>
          <el-option label="未过期" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备类型">
        <el-select v-model="formInline.dSid" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.dsid"
            :label="item.dSName"
            :value="item.dsid"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="getDeviceStateFun(), (currentPage4 = 1)"
          >查询</el-button
        >
        <el-button type="primary" @click="exportsFun">导出</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="singleTable"
      :data="tableData.data"
      highlight-current-row
      style="width: 100%"
      height="600px"
      v-loading="loading"
    >
      <el-table-column type="index" width="50"> </el-table-column>

      <el-table-column property="installLocation" label="设备位置">
      </el-table-column>
      <el-table-column property="dSName" label="设备类型"> </el-table-column>
      <el-table-column property="productNumber" label="设备号">
      </el-table-column>
      <el-table-column property="online" label="是否在线">
        <template slot-scope="scope">
          {{ scope.row.online == "1" ? "在线" : "离线" }}
        </template>
      </el-table-column>
      <el-table-column property="online" label="是否过期">
        <template slot-scope="scope">
          {{ scope.row.expiration == "1" ? "已过期" : "未过期" }}
        </template>
      </el-table-column>
      <el-table-column property="time" label="创建时间"> </el-table-column>
      <el-table-column property="master" label="拥有者"> </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage4"
        :page-sizes="[15, 20, 25, 30]"
        :page-size="15"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.count"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getDeviceState, getDsid } from "@/api/index.js";
export default {
  data() {
    return {
      formInline: {
        state: "",
        alarmType: "",
        device_name: "",
        dSid: "",
        productNumber: "",
        time: "",
        expiration: "",
      },
      radio: "",
      tableData: { data: [] },
      options: [],
      currentPage4: 1,
      size: "15",
      current: "1",
      loading: false,
    };
  },
  methods: {
    getDsidFun() {
      getDsid(this.utils.userName).then((res) => {
        this.options = res.data.data;
        this.options.unshift({ dsid: "", dSName: "所有" });
      });
    },
    onSubmit() {
      console.log("submit!");
    },
    exportsFun() {
      window.open(
        `http://psy119.cn/earlyWarn/poiDeviceState?username=${
          this.utils.userName
        }&online=${this.formInline.state}&alarmType=${
          this.formInline.alarmType
        }&productNumber=${this.formInline.productNumber}&device_name=${
          this.formInline.device_name
        }&dSid=${this.formInline.dSid}&pageNumber=${
          this.formInline.productNumber
        }1&pageSize=1&type=1&startTime=${
          this.formInline.time[0] || ""
        }&endTime=${this.formInline.time[1] || ""}`
      );
    },
    getDeviceStateFun(type) {
      this.loading = true;

      this.$forceUpdate();
      getDeviceState(
        this.utils.userName, //用户
        this.formInline.state, //在线离线
        this.formInline.alarmType, //报警状态
        this.formInline.productNumber, //设备号
        this.formInline.device_name, //设备名称
        this.formInline.dSid, //设备类型
        //数量
        this.current, //分页
        this.size,
        "",
        this.formInline.time[0] || "", //开始时间
        this.formInline.time[1] || "", //结束时间
        this.formInline.expiration
      ).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data;
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error",
          });
        }
        this.loading = false;
      });
    },
    handleSizeChange(val) {
      // console.log(val, 111);
      this.size = val;
      this.getDeviceStateFun();
    },
    handleCurrentChange(val) {
      this.current = val;
      // console.log(val, 222);
      this.getDeviceStateFun();
    },
  },
  mounted() {
    this.getDsidFun();
  },
};
</script>
<style lang='less' scoped>
.block {
  position: absolute;
  bottom: 30px;
  right: 10px;
}
</style>