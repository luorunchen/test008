<template>
  <div id="ZaiXianGuanLi">
    <div class="onLineInfo">
      <ul>
        <li>
          <p>{{ line.num }}</p>
          <p>用户总数</p>
        </li>
        <li>
          <p>{{ line.webOnline }}</p>
          <p>Web端在线人数</p>
        </li>
        <li>
          <p>{{ line.appOnline }}</p>
          <p>App端在线人数</p>
        </li>
        <li>
          <p>{{ line.offine }}</p>
          <p>离线人数</p>
        </li>
      </ul>
    </div>
    <div class="onLineBG"></div>
    <el-table :data="tableData" style="width: 100%" height="550px" border>
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column property="user_name" label="账号"> </el-table-column>
      <el-table-column property="status" label="在线状态"> </el-table-column>
      <el-table-column property="logintime" label="登录时间">
        <template slot-scope="scope">
          <p v-if="scope.row.logintime == null">暂无</p>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-form
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
      </el-form-item>
    </el-form> -->
  </div>
</template>

<script>
import { RegisterOnline } from "@/api/index.js";
export default {
  data() {
    return {
      line: {},
      tableData: [],
    };
  },
  mounted() {
    RegisterOnline(this.utils.userName).then((res) => {
      this.line = res.data;
      this.tableData = [...res.data.webList, ...res.data.appList];
    });
  },
};
</script>
<style lang='less' scoped>
#ZaiXianGuanLi {
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