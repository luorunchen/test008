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
      <el-form-item label="设备号">
        <el-input v-model="formInline.productNumber"></el-input>
      </el-form-item>
      <el-form-item label="责任人">
        <el-input v-model="formInline.responsible"></el-input>
      </el-form-item>
      <el-form-item label="报警名称">
        <el-input v-model="formInline.typeName"></el-input>
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
        <el-button type="primary" @click="onSubmit(), (currentPage4 = 1)"
          >查询</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="exportFun">导出</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="distinctFun">设备去重</el-button>
      </el-form-item>
    </el-form>

    <el-table
      ref="singleTable"
      :data="tableData.data"
      highlight-current-row
      style="width: 100%"
      height="650px"
      header-align="center"
      v-loading="loading"
    >
      <el-table-column type="index" width="50"> </el-table-column>

      <el-table-column property="name" label="项目名称"> </el-table-column>
      <el-table-column property="dSName" label="设备类型"> </el-table-column>
      <el-table-column property="productNumber" label="设备号">
      </el-table-column>
      <el-table-column property="typeName" label="报警名称"> </el-table-column>
      <el-table-column property="alarmFaultDate" label="报警时间">
      </el-table-column>
      <el-table-column property="user_name" label="责任人"> </el-table-column>
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
import { statisticsAlarm, getDsid } from "@/api/index.js";
export default {
  data() {
    return {
      formInline: {
        time: "",
        productNumber: "",
        responsible: "",
        dSid: "",
        typeName: "",
      },
      loading: false,
      options: [],
      tableData: [],
      currentPage4: 1,
      size: "15",
      current: "1",
      distinct: "",
    };
  },
  methods: {
    distinctFun() {
      this.distinct = "1";
      this.statisticsAlarmFun();
    },
    statisticsAlarmFun(exportState) {
      this.loading = true;
      statisticsAlarm(
        this.utils.userName, //用户名
        this.formInline.time[0] || "", //开始时间
        this.formInline.time[1] || "", //结束时间
        this.formInline.productNumber, //设备号
        this.formInline.responsible, //责任人
        this.formInline.dSid, //设备类型
        this.formInline.typeName, //报警名称
        exportState, //空查询，1导出
        this.current, //数量l
        this.size, //分页,
        this.distinct //去重
      ).then((res) => {
        if (res.data.data.length > 0) {
          this.tableData = res.data;
        } else {
          this.$message({
            showClose: true,
            message: "暂无查询数据",
            type: "error",
          });
        }
        this.loading = false;
      });
    },
    onSubmit() {
      this.distinct = "";
      this.statisticsAlarmFun();
    },
    getDsidFun() {
      getDsid(this.utils.userName).then((res) => {
        this.options = res.data.data;
        this.options.unshift({ dsid: "", dSName: "所有" });
      });
    },
    handleSizeChange(val) {
      console.log(val, 111);
      this.size = val;
      this.statisticsAlarmFun();
    },
    handleCurrentChange(val) {
      this.current = val;
      console.log(val, 222);
      this.statisticsAlarmFun();
    },
    exportFun() {
      // this.statisticsAlarmFun(1);
      if (this.formInline.time[0] == undefined) {
      }
      window.open(
        `http://psy119.cn/earlyWarn/statisticsAlarm?username=${
          this.utils.userName
        }&startTime=${
          this.formInline.time[0] == undefined ? "" : this.formInline.time[0]
        }&endTime=${
          this.formInline.time[1] == undefined ? "" : this.formInline.time[1]
        }&productNumber=${this.formInline.productNumber}&responsible=${
          this.formInline.responsible
        }&Dsid=${this.formInline.dSid}&typeName=${
          this.formInline.typeName
        }&type=1&pageNumber=${this.current}&pageSize=${this.size}`
      );
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