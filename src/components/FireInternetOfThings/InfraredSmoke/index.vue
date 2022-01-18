<template>
  <div id="huozaibaojing">
    <div class="btnQh">
      <el-button type="primary" @click="dialogVisible = true"
        >红外模式时间设置</el-button
      >
    </div>
    <div class="leftWapper">
      <div class="left_one" ref="leftOne">
        <p>今日报警项目</p>
        <div class="title">
          <ul v-for="(item, index) in baojingNum" :key="index">
            <li>{{ item }}</li>
          </ul>
        </div>
        <div class="scroll_wapper">
          <ul
            class="ulList"
            v-for="(item, index) in DeviceAlarmList"
            :key="index"
          >
            <li @click="callPolice(item.pid)">
              <span>{{ item.typeName }}</span
              ><span>共{{ item.value }}条未处理></span>
            </li>
          </ul>
        </div>
      </div>
      <div class="left_two">
        <p>接入烟感设备</p>

        <Translate />
      </div>
    </div>
    <SearchTranslate
      :SElec_DetailElecDevice_List="SElec_DetailElecDevice_List"
      :pagetype="pagetype"
    />

    <el-dialog
      title="时间选择"
      :visible.sync="dialogVisible"
      width="25%"
      :modal="false"
    >
      <el-time-picker
        is-range
        v-model="infraredTime"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        placeholder="选择时间范围"
        value-format="HH:MM"
      >
      </el-time-picker>
      <div>
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
          >全选</el-checkbox
        >
        <div style="margin: 15px 0"></div>
        <el-checkbox-group
          v-model="checkedCities"
          @change="handleCheckedCitiesChange"
        >
          <el-checkbox
            v-for="city in getHongWaiYGList"
            :label="city"
            :key="city"
            >{{ city }}</el-checkbox
          >
        </el-checkbox-group>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setTimeTrue">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  DeviceAlarm,
  SElec_DetailElecDevice,
  getHongWaiYG,
  setTime,
} from "@/api/index.js";
import Translate from "../translate/baojingTranslate.vue";
import SearchTranslate from "../translate/searchTranslate.vue";
export default {
  data() {
    return {
      SElec_DetailElecDevice_List: "",
      baojingNum: "",
      DeviceAlarmList: "",
      pagetype: "6",
      // DeviceNumList: "",
      dialogVisible: false,
      getHongWaiYGList: [],
      checkAll: false,
      checkedCities: [],
      infraredTime: "",
      isIndeterminate: true,
    };
  },
  mounted() {
    this.DeviceAlarm();
    this.getHongWaiYGFun();
  },
  methods: {
    setTimeTrue() {
      if (this.checkedCities.length == 0) {
        return this.$message({
          showClose: true,
          type: "error",
          message: "请选择设备号",
        });
      } else {
        setTime(
          this.utils.userName,
          this.checkedCities.toString(),
          this.infraredTime[0],
          this.infraredTime[1]
        ).then(
          (res) => {
            //
            if (res.data.code == 200) {
              this.$message({
                showClose: true,
                type: "success",
                message: "设置成功",
              });
            } else {
              this.$message({
                showClose: true,
                type: "error",
                message: "请稍后重试或联系管理员",
              });
            }
          },
          (rej) => {
            this.$message({
              showClose: true,
              type: "error",
              message: "请稍后重试或联系管理员",
            });
          }
        );
      }
      this.dialogVisible = false;
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.getHongWaiYGList : [];

      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      console.log(value, 2);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.getHongWaiYGList.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.getHongWaiYGList.length;
    },
    getHongWaiYGFun() {
      getHongWaiYG(this.utils.userName).then((res) => {
        // console.log(res, 88);
        this.getHongWaiYGList = res.data.data;
      });
    },
    callPolice(pid) {
      SElec_DetailElecDevice(pid).then((res) => {
        this.SElec_DetailElecDevice_List = res.data;
      });
    },
    DeviceAlarm() {
      const region = sessionStorage.getItem("region");
      DeviceAlarm(this.utils.userName, "45", region).then((res) => {
        this.DeviceAlarmList = res.data;
        let num = 0;
        // console.log(res.data, 99);
        if (res.data.length <= 0) {
          // return this.$message.error("今日报警数据丢失");
          this.baojingNum = "000000";

          this.$refs.leftOne.style.height = "140" + "px";
        } else {
          res.data.forEach((element) => {
            num += element.value;
          });

          // this.baojingNum = str + num;
          let str = "000000" + num;
          this.baojingNum = str.substring(str.length - 6);
        }
      });
    },
  },
  components: {
    Translate,
    SearchTranslate,
  },
};
</script>
<style lang='less' scoped>
#huozaibaojing {
  /deep/.btnQh {
    position: absolute;
    z-index: 999;

    width: 58%;
    top: 135px;

    right: -780px;
  }
  /deep/.el-dialog__header {
    background: #1071e2;

    .el-dialog__title {
      color: #fff;
    }
    .el-dialog__headerbtn .el-dialog__close {
      color: #fff;
    }
  }
  ul {
    list-style-type: none;
  }
  // position: relative;
  // z-index: 999;
  // color: #bfa;
  .leftWapper {
    left: 20px;
    position: absolute;
    z-index: 999;
    width: 373px;
    .left_one {
      background-image: url("../../../assets/images/zhengchangbili.png");
      height: 450px;
      background-size: 100% 450px;
      p {
        text-align: center;
        line-height: 70px;
        font-size: 18px;
      }
      .title {
        margin-top: 10px;
        margin-left: 30px;
        // width: 200px;
        height: 32px;
        font-size: 16px;
        li {
          width: 32px;
          margin-right: 10px;
          height: 32px;
          float: left;
          background: linear-gradient(
            0deg,
            rgba(71, 102, 179, 0.62),
            rgba(23, 47, 107, 0.62)
          );

          font-weight: bold;
          color: #f830af;
          line-height: 32px;
          text-align: center;
        }
      }
      .ulList {
        margin-left: 30px;
        li {
          width: 301px;
          height: 35px;
          background: linear-gradient(-87deg, #3053af, #14295a);
          border: 1px solid #3486da;
          margin: 10px 0;
          padding: 0 10px;
          line-height: 35px;
          font-size: 16px;
          display: flex;
          justify-content: space-between;
        }
      }
    }
    .left_two {
      background-image: url("../../../assets/images/juxing7.png");
      height: 300px;
      background-size: 100% 100%;
      p {
        text-align: center;
        line-height: 65px;
        font-size: 18px;
      }
      .title {
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 30px;
        // width: 200px;
        height: 32px;

        li {
          width: 32px;
          margin-right: 10px;
          height: 32px;
          float: left;
          background: linear-gradient(
            0deg,
            rgba(71, 102, 179, 0.62),
            rgba(23, 47, 107, 0.62)
          );

          font-weight: bold;
          color: #6dff64;
          line-height: 32px;
          text-align: center;
        }
      }
      .ulList {
        margin-left: 30px;
        li {
          width: 301px;
          height: 35px;
          background: linear-gradient(-87deg, #3053af, #14295a);
          border: 1px solid #3486da;
          margin: 10px 0;
          padding: 0 10px;
          line-height: 35px;
          font-size: 16px;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
  .rightWapper {
    margin-top: 50px;
    position: absolute;
    z-index: 999;
    right: 20px;
    width: 330px;
    .right_one {
      // background-image: ("../../../assets/images/zhengchangbili.png");
      height: 400px;
      background-size: 100% 100%;
      background-image: url("../../../assets/images/juxing5.png");
      .chaxun {
        padding-top: 20px;
        padding-left: 20px;
      }
      .right_info {
        // padding-left: 1px;
        margin-top: 5px;
        margin-left: 3px;
        // padding: none;
        width: 99%;
        // height: 100px;
        border-top: 1px solid #3486da;
        box-sizing: border-box;
        .olList {
          padding-left: 45px;
        }
      }
    }
  }
}
</style>