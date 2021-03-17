<template>
  <div>
    <div class="rightWapper">
      <div class="right_one" ref="right_one">
        <div class="chaxun">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
              <el-input
                v-model="formInline.user"
                placeholder="请输入"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary">查询</el-button>
            </el-form-item>
            <!-- <el-form-item> 12312 </el-form-item> -->
          </el-form>
        </div>
        <template>
          <div class="scroll_wapper">
            <div class="right_info">
              <ul
                class="olList"
                v-for="(item, index) in SElec_DetailElecDevice_List"
                :key="index"
                @click="echart_wapper(item.BH)"
              >
                <li>{{ index + 1 }}.{{ item.text }}</li>
                <li>地址:{{ item.MC }}</li>
                <li>报警次数:{{ item.value }}</li>
              </ul>
            </div>
          </div>
        </template>
      </div>
    </div>
    <PublicPopUps ref="publicPopUps" :pagetype="pagetype" />
    <!-- 搜索内容弹窗 -->
  </div>
</template>

<script>
import PublicPopUps from "../translate/publicPopUps.vue";
import {
  GetMapData,
  getDeviceByPid,
  ElecData,
  WebeditFileimageServlet,
  ReadParameterApi,
  getDeviceByDevId,
  ElectricDeviceDate,
  resetclose,
  putMessToDevice,
  putMessToDeviceOn,
  resetclosefuwei,
  insertClouddog,
  updateShutdown,
  UpdateDevicePush,
} from "@/api/index.js";
export default {
  props: ["SElec_DetailElecDevice_List", "pagetype"],
  data() {
    return {
      DeviceHistory: "",

      fazhishezhi: {
        SYDL: "",
        AXDL: "",
        BXDL: "",
        CXDL: "",
        AXWD: "",
        BXWD: "",
        CXWD: "",
        NXWD: "",
        AXDY: "",
        BXDY: "",
        CXDY: "",
      },
      baoxiandanhao: "",
      ElecDataList_images: [],
      ElecDataList: "",
      getDeviceByPidList: "",
      loading: true,
      GetMapDataList: "",
      GetMapDataListName: {
        name: "",
        callPolice: "",
        onLine: "",
        offLine: "",
      },
      managementInput: "",
      //独立烟感
      SmartIndependentSmokeDialog: false,
      //重点部位
      KeyPartsDialog: false,
      // 火灾报警
      FireAlarmSystemDialog: false,
      msg: "",
      FireWaterSystemDialog: false,
      equipmentColor: "onLine",
      sizeForm: {
        date2: "",
        date1: "",
      },
      innerVisible_lishi: false,
      checkList: [],
      activeName: "second",
      input: "",
      innerVisible: false,
      dialogVisible: false,
      onlineVisible: false,
      innerVisible_shebei: false,
      offlineVisible: false,
      formInline: {
        user: "",
        region: "",
      },
      getDeviceByDevIdList: "",
      shengyu_loudian: "",
      ElecDataList_typeName: "",
      currentPage4: 4,
      tableData: [],
      getHistoryFault: "",
    };
  },
  mounted() {
    // console.log(this.SElec_DetailElecDevice_List, 4564565);
    // undefined;
  },
  components: {
    PublicPopUps,
  },
  methods: {
    //设备历史
    deviceHistory() {
      console.log(this.DeviceHistory);
      getHistoryFault(
        this.ElecDataList.DevData[0].productNumber,
        this.DeviceHistory[0],
        this.DeviceHistory[1]
      ).then((res) => {});
    },
    //报警推送
    baojingtuisong() {
      console.log(this.checkList);
      let app = 0;
      let sms = 0;
      let phone = 0;
      // if(this.checklist.length==3){
      //   app = 1
      // }
      // if(this.checklist.length==2){
      //   sms = 1
      // }
      this.checkList.forEach((index, element) => {
        console.log(index, element);
        if (index === "短信") {
          sms = 1;
        }
        if (index === "电话") {
          phone = 1;
        }
        if (index === "App") {
          app = 1;
        }
      });
      UpdateDevicePush(
        "undefined",
        app,
        this.utils.userName,
        sms,
        this.ElecDataList.DevData[0].productNumber,
        phone
      ).then((res) => {
        this.$message.success("修改成功");
      });
    },
    SetParameterApiFun() {
      SetParameterApi(
        this.ElecDataList.DevData[0].productNumber,
        this.fazhishezhi.SYDL,
        this.fazhishezhi.AXWD,
        this.fazhishezhi.BXWD,
        this.fazhishezhi.CXWD,
        this.fazhishezhi.NXWD,
        this.fazhishezhi.AXDL,
        this.fazhishezhi.BXDL,
        this.fazhishezhi.CXDL,
        this.fazhishezhi.AXDY,
        this.fazhishezhi.BXDY,
        this.fazhishezhi.CXDY
      ).then((res) => {
        if (result.status == 1) {
          alert("参数设置成功");
          setTimeout(function () {
            parent.location.reload();
          }, 1000);
        } else {
          alert("参数设置失败");
        }
      });
    },
    //提交处置情况
    management() {
      if (this.ElecDataList.DevData == "正常") {
        return this.$message.warning("设备正常,无需解除");
      }
      if (this.managementInput == "") {
        return this.$message.error("请填写处置信息");
      }
      WebeditFileimageServlet(this.utils.userName, this.managementInput).then(
        (res) => {
          if (res.data.list[0].status == true) {
            return this.$message.success("报警解除成功");
          }
        }
      );
    },
    //独立烟感
    SmartIndependentSmokeSee() {
      this.$nextTick(() => {
        let shui_echart = this.$echarts.init(
          document.querySelector(".SmartIndependentSmoke_echars_one_wapper")
        );
        shui_echart.setOption({
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: ["邮件营销", "联盟广告"],
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "邮件营销",
              type: "line",
              stack: "总量",
              data: [120, 132, 101, 134, 90, 230, 210],
            },
            {
              name: "联盟广告",
              type: "line",
              stack: "总量",
              data: [220, 182, 191, 234, 290, 330, 310],
            },
          ],
        });
      });
    },
    // 水压表
    shuiyaSee(data) {
      // this.seeInfo = data;
      let max;
      let name;
      if (data == "shuiya") {
        max = 1000;
        name = "kpa";
        this.msg = "水压表";
      } else {
        this.msg = "液位表";
        max = 20;
        name = "m";
      }

      this.$nextTick(() => {
        let shui_echart = this.$echarts.init(
          document.querySelector(".shuiya_echarts")
        );

        // console.log(option2);

        var option2 = (Math.random() * 1000).toFixed(2) - 0;
        // option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
        // console.log((Math.random() * 100).toFixed(2) - 0);
        // shui_echart.setOption(option, true);
        shui_echart.setOption({
          // tooltip: {
          //   formatter: "{a} <br/>{b} : {c}m",
          // },

          series: [
            {
              // name: "业务指标",
              type: "gauge",
              min: 0,
              max: max,
              detail: { formatter: `{value}${name}` },
              axisLine: {
                // 坐标轴线
                lineStyle: {
                  // 属性lineStyle控制线条样式
                  color: [
                    [0.2, "#91c7ae"],
                    [0.8, "#63869e"],
                    [1, "#c23531"],
                  ],
                },
              },
              pointer: {
                itemStyle: {
                  color: "auto",
                },
              },
              data: [{ value: option2 }],
            },
          ],
        });
      });
      this.$nextTick(() => {
        let one_echart_left = this.$echarts.init(
          document.querySelector(".shuju_echarts_wapper")
        );
        one_echart_left.setOption({
          xAxis: {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisLabel: {
              show: true,
              textStyle: {
                color: "#000",
              },
            },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985",
              },
            },
          },
          yAxis: {
            type: "value",
            axisLabel: {
              show: true,
              textStyle: {
                color: "#000",
              },
            },
          },
          series: [
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: "line",
              smooth: true,
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: "red",
                  },
                },
              },
            },
          ],
        });
      });
    },
    equipment(data, num) {
      this.equipmentColor = data;
      getDeviceByPid(this.devicepidData, num, 2, this.utils.userName).then(
        (res) => {
          // console.lotg(res.data, 3121);
          this.getDeviceByPidList = res.data;
        }
      );
    },
    // 外部弹窗echart
    echart_wapper(data) {
      // this.loading = true;
      // console.log(data)
      this.$refs.publicPopUps.initOff();
      this.$refs.publicPopUps.echart_wapper(data);
      // // const type = 2;
      // this.devicepidData = data;
      // GetMapData(data, 2, this.utils.userName).then((res) => {
      //   // console.log(res);
      //   this.GetMapDataList = res.data;
      //   this.GetMapDataListName.name = this.GetMapDataList.Company[0].MC;
      //   this.GetMapDataListName.callPolice = this.GetMapDataList.devMess[0];
      //   this.GetMapDataListName.onLine = this.GetMapDataList.devMess[1];
      //   this.GetMapDataListName.offLine = this.GetMapDataList.devMess[2];
      //   // this.loading = false;
      //   // console.log(res.data, "wwww");
      //   let name = [];
      //   let data = [];
      //   // console.log(res.data.Diagram, 333);
      //   res.data.Diagram.forEach((element) => {
      //     name.push(element.date);
      //     data.push(element.num);
      //   });
      //   this.$nextTick(() => {
      //     let one_echart_left = this.$echarts.init(
      //       document.querySelector(".echart_wapper")
      //     );
      //     one_echart_left.setOption({
      //       xAxis: {
      //         type: "category",
      //         data: name,
      //         axisLabel: {
      //           show: true,
      //           textStyle: {
      //             color: "#fff",
      //           },
      //         },
      //       },
      //       grid: {
      //         left: "3%",
      //         right: "4%",
      //         bottom: "3%",
      //         containLabel: true,
      //       },
      //       tooltip: {
      //         trigger: "axis",
      //         axisPointer: {
      //           type: "cross",
      //           label: {
      //             backgroundColor: "#6a7985",
      //           },
      //         },
      //       },
      //       yAxis: {
      //         type: "value",
      //         axisLabel: {
      //           show: true,
      //           textStyle: {
      //             color: "#fff",
      //           },
      //         },
      //       },
      //       series: [
      //         {
      //           data: data,
      //           type: "line",
      //           smooth: true,
      //           itemStyle: {
      //             normal: {
      //               lineStyle: {
      //                 color: "red",
      //               },
      //             },
      //           },
      //         },
      //       ],
      //     });
      //   });
      // });
      // getDeviceByPid(data, 1, 2, this.utils.userName).then((res) => {
      //   console.log(res.data, 3121);
      //   this.getDeviceByPidList = res.data;
      // });
    },
    // 查看echart图片函数
    see(devId) {
      getDeviceByDevId(devId).then((res) => {
        // console.log(res, "sssqqq");
        this.getDeviceByDevIdList = res.data.list[0];
      });
      // 设备详情接口
      ElecData(devId, now).then((res) => {
        //重置照片
        this.ElecDataList_images = [];
        this.ElecDataList = res.data;

        if (res.data.DevData[0].image != "") {
          const list = res.data.DevData[0].image.split(",");
          list.forEach((Element) => {
            // Element =
            let a = "http://edog-online.com/ctx/devPic/" + Element;
            this.ElecDataList_images.push(a);
          });
        }

        this.ElecDataList_typeName = res.data.DevData[0].typeName;
        console.log(this.ElecDataList_typeName);
        ReadParameterApi(res.data.DevData[0].productNumber).then((res) => {
          // console.log(res, "ldjakjdla");
          // this.getDeviceByDevIdList.row = res.data.row;
          // console.log(this.getDeviceByDevIdList, 7899987978);
          this.shengyu_loudian = {
            oneAlarm: this.getDeviceByDevIdList.mess2[0]
              .noLeakageAlarmACurrentValue,
            twoAlarm: this.getDeviceByDevIdList.mess2[0]
              .noLeakageAlarmBCurrentValue,
            threeAlarm: this.getDeviceByDevIdList.mess2[0]
              .noLeakageAlarmCCurrentValue,
            fourAlarm: this.getDeviceByDevIdList.mess2[0]
              .leakageAlarmCurrentValue,
            oneDianLiu: res.data.row.ADianLiu,
            twoDianLiu: res.data.row.BDianLiu,
            threeDianLiu: res.data.row.CDianLiu,
            fourDianLiu: res.data.row.SYdianliu,
            oneVolatage: this.getDeviceByDevIdList.mess2[0]
              .noVoltageAlarmAValue,
            twoVolatage: this.getDeviceByDevIdList.mess2[0]
              .noVoltageAlarmBValue,
            threeVolatage: this.getDeviceByDevIdList.mess2[0]
              .noVoltageAlarmCValue,
            oneDianYa: res.data.row.ADianYa,
            twoDianYa: res.data.row.BDianYa,
            threeDianYa: res.data.row.CDianYa,
            oneTempera: this.getDeviceByDevIdList.mess2[0]
              .noAlarmATemperatureValue,
            twoTempera: this.getDeviceByDevIdList.mess2[0]
              .noAlarmBTemperatureValue,
            threeTempera: this.getDeviceByDevIdList.mess2[0]
              .noAlarmCTemperatureValue,
            fourTempera: this.getDeviceByDevIdList.mess2[0]
              .noAlarmNTemperatureValue,
            oneWenDu: res.data.row.AWenDu,
            twoWenDu: res.data.row.BWenDu,
            threeWenDu: res.data.row.CWenDu,
            fourWenDu: res.data.row.NWenDu,
          };
          console.log(this.shengyu_loudian);
        });
      });
      const time = new Date();
      const year = time.getFullYear();
      const month = time.getMonth() + 1;
      const day = time.getDate();
      const now = year + "-" + month + "-" + day;

      ElectricDeviceDate(devId, now).then((res) => {
        let dianLiuUa = [];
        let dianLiuUb = [];
        let dianLiuUc = [];
        let dianLiuUd = [];
        let dianYaA = [];
        let dianYaB = [];
        let dianYaC = [];
        let wenduA = [];
        let wenduB = [];
        let wenduC = [];
        let wenduN = [];
        let name = [];

        //图标数据赋值
        res.data.Data.forEach((element) => {
          dianLiuUa.push(element.ia);
          dianLiuUb.push(element.ib);
          dianLiuUc.push(element.ic);
          dianLiuUd.push(element.ld);
          wenduA.push(element.ta);
          wenduB.push(element.tb);
          wenduC.push(element.tc);
          wenduN.push(element.tn);
          dianYaA.push(element.ua);
          dianYaB.push(element.ub);
          dianYaC.push(element.uc);
          name.push(element.happenedTime);
        });
        var one_echart_left;
        var two_echart_left;
        var three_echart_left;
        //重置图表
        console.log(
          one_echart_left != null &&
            one_echart_left != undefined &&
            one_echart_left != ""
        );
        // this.$nextTick(() => {
        //   if (
        //     one_echart_left != null ||
        //     one_echart_left != undefined ||
        //     one_echart_left != ""
        //   ) {
        //     one_echart_left.dispose();
        //   }
        //   if (
        //     two_echart_left != null ||
        //     two_echart_left != undefined ||
        //     two_echart_left != ""
        //   ) {
        //     two_echart_left.dispose();
        //   }
        //   if (
        //     three_echart_left != null ||
        //     three_echart_left != undefined ||
        //     two_echart_left != ""
        //   ) {
        //     three_echart_left.dispose();
        //   }
        // });

        this.$nextTick(() => {
          one_echart_left = this.$echarts.init(
            document.querySelector(".echarts_wapper_one_search")
          );

          // 电流统计图
          one_echart_left.setOption({
            tooltip: {
              trigger: "axis",
            },
            legend: {
              data: ["A电流(mA)", "B电流(mA)", "C电流(mA)", "剩余电流(mA)"],
            },
            grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              containLabel: true,
            },
            toolbox: {
              feature: {
                saveAsImage: {},
              },
            },
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: name.reverse(),
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                name: "A电流(mA)",
                type: "line",

                data: dianLiuUa.reverse(),
              },
              {
                name: "B电流(mA)",
                type: "line",

                data: dianLiuUb.reverse(),
              },
              {
                name: "C电流(mA)",
                type: "line",

                data: dianLiuUc.reverse(),
              },
              {
                name: "剩余电流(mA)",
                type: "line",

                data: dianLiuUd.reverse(),
              },
            ],
          });

          // 第二个图表
          two_echart_left = this.$echarts.init(
            document.querySelector(".echarts_wapper_two_search")
          );
          //第三个图表
          two_echart_left.setOption({
            tooltip: {
              trigger: "axis",
            },
            legend: {
              data: ["A温度(℃)", "B温度(℃)", "C温度(℃)", "N温度(℃)"],
            },
            grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              containLabel: true,
            },
            toolbox: {
              feature: {
                saveAsImage: {},
              },
            },
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: name.reverse(),
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                name: "A温度(℃)",
                type: "line",

                data: wenduA.reverse(),
              },
              {
                name: "B温度(℃)",
                type: "line",

                data: wenduB.reverse(),
              },
              {
                name: "C温度(℃)",
                type: "line",

                data: wenduC.reverse(),
              },
              {
                name: "N温度(℃)",
                type: "line",

                data: wenduN.reverse(),
              },
            ],
          });

          three_echart_left = this.$echarts.init(
            document.querySelector(".echarts_wapper_three_search")
          );
          three_echart_left.setOption({
            tooltip: {
              trigger: "axis",
            },
            legend: {
              data: ["A电压(A)", "B电压(A)", "C电压(A)"],
            },
            grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              containLabel: true,
            },
            toolbox: {
              feature: {
                saveAsImage: {},
              },
            },
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: name.reverse(),
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                name: "A电压(A)",
                type: "line",
                // stack: "总量",
                data: dianYaA.reverse(),
              },
              {
                name: "B电压(A)",
                type: "line",
                // stack: "总量",
                data: dianYaB.reverse(),
              },
              {
                name: "C电压(A)",
                type: "line",
                // stack: "总量",
                data: dianYaC.reverse(),
              },
            ],
          });
        });
      });
    },

    //设备设置按钮
    shebeiBtn(num) {
      const role = sessionStorage.getItem("role");
      const power = sessionStorage.getItem("power");
      switch (num) {
        //远程断电
        case "1":
          if (role == "1000" || power.indexOf("10003003") != -1) {
            resetclose(this.ElecDataList.DevData[0].productNumber, 0).then(
              (res) => {
                if (res.message == "请求成功") {
                  this.$message.success(res.message);
                } else {
                  this.$message.error(res.message);
                }
              }
            );
          } else {
            this.$message.error("暂无权限");
          }

          break;

        //远程开机
        case "2":
          if (role == "1000" || power.indexOf("10003004") != -1) {
            putMessToDeviceOn(
              this.ElecDataList.DevData[0].productNumber,
              "shutdown"
            ).then((res) => {
              if (res.message == "请求成功") {
                alert("远程开机成功");
              } else {
                alert("请稍后重试");
              }
            });
            break;
          } else {
            this.$message.error("暂无权限");
          }
        //远程关机
        case "3":
          if (role == "1000" || power.indexOf("10003004") != -1) {
            putMessToDeviceOn(
              this.ElecDataList.DevData[0].productNumber,
              "startup"
            ).then((res) => {
              if (res.message == "请求成功") {
                alert("远程开机成功");
              } else {
                alert("请稍后重试");
              }
            });
            break;
          } else {
            this.message.error("暂无权限");
          }
          break;
        //开启蜂鸣器
        case "4":
          if (role == "1000" || power.indexOf("10003004") != -1) {
            putMessToDeviceOn(
              this.ElecDataList.DevData[0].productNumber,
              "voiceon"
            ).then((res) => {
              if (res.message == "请求成功") {
                alert("开启蜂鸣器成功");
              } else {
                alert("请稍后重试");
              }
            });
            break;
          } else {
            this.$message.error("暂无权限");
          }
          break;
        //关闭蜂鸣器
        case "5":
          if (role == "1000" || power.indexOf("10003004") != -1) {
            putMessToDeviceOn(
              this.ElecDataList.DevData[0].productNumber,
              "voiceoff"
            ).then((res) => {
              if (res.message == "请求成功") {
                alert("开启蜂鸣器成功");
              } else {
                alert("请稍后重试");
              }
            });
            break;
          } else {
            this.message.error("暂无权限");
          }
          break;
        //远程消音
        case "6":
          if (role == "1000" || power.indexOf("10003001") != -1) {
            resetclose(this.ElecDataList.DevData[0].productNumber, 2).then(
              (res) => {
                if (res.message == "请求成功") {
                  alert("远程消音成功");
                } else {
                  alert("远程消音失败");
                }
              }
            );
          } else {
            this.$message.error("暂无权限");
          }

          break;
        //开启流量
        case "7":
          if (role == "1000" || power.indexOf("10003004") != -1) {
            putMessToDeviceOn(
              this.ElecDataList.DevData[0].productNumber,
              "openflow"
            ).then((res) => {
              if (res.message == "请求成功") {
                alert("开启流量成功");
              } else {
                alert("请稍后重试");
              }
            });
            break;
          } else {
            this.$message.error("暂无权限");
          }
          break;
        //远程复位
        case "8":
          if (role == "1000" || power.indexOf("10003003") != -1) {
            resetclosefuwei(this.ElecDataList.DevData[0].productNumber, 2).then(
              (res) => {
                if (res.status == "1") {
                  this.$message.success(res.message);
                } else {
                  this.$message.error(res.message);
                }
              }
            );
          } else {
            this.$message.error("暂无权限");
          }
          break;
        //授权
        case "9":
          if (role == "1000" || power.indexOf("10003004") != -1) {
            insertClouddog(this.ElecDataList.DevData[0].productNumber).then(
              (res) => {
                if (res.list[0].status == "true") {
                  this.$message.success(
                    "授权成功.工作日一天后将授权生效,非工作日将延期"
                  );
                } else {
                  this.$message.error("授权失败");
                }
              }
            );
          }
          break;
        //开启屏蔽器
        case "10":
          if (role == "1000" || power.indexOf("10003013") != -1) {
            updateShutdown(
              this.ElecDataList.DevData[0].productNumber,
              this.utils,
              userName
            ).then((res) => {
              if (res.status == "true") {
                layer.open({
                  content: res.mess,
                });
                this.$message.success(res.mess);
              } else {
                this.$message.error(res.mess);
              }
            });
          }
          break;
        //下发保险单
        case "11":
          // console.log(6554654);
          // console.log(this.ElecDataList.DevData[0].productNumber, 789789);
          if (role == "1000" || power.indexOf("10003004") != -1) {
            putMessToDevice(
              this.ElecDataList.DevData[0].productNumber,
              this.baoxiandanhao
            ).then((res) => {
              if (res.message == "请求成功") {
                alert("下发保险单号成功");
              } else {
                this.$message.error("请稍后重试");
              }
            });
          }
          // var res = JSON.parse(result);
          // console.log(res);

          break;
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    onSubmit() {
      console.log("submit!");
    },
    // TabS 切换函数
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
  updated() {
    // console.log(123);
    if (this.SElec_DetailElecDevice_List.length > 0) {
      this.$refs.right_one.style.height = "2.34" + "rem";
    }
    // if (this.SElec_DetailElecDevice_List_Copy.length > 0) {
    //   this.$refs.right_one.style.height = "2.34" + "rem";
    // }
  },
};
</script>
<style lang='less' scoped>
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  // background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
// ::-webkit-scrollbar-track {
//   -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.1);
//   border-radius: 10px;
//   background-color: rgb(13, 30, 77);
// }

// /*定义滑块 内阴影+圆角*/
// ::-webkit-scrollbar-thumb {
//   border-radius: 10px;
//   -webkit-box-shadow: inset 0 0 6px #1b6c89;
//   background-color: #1b6c89;
// }

.row-bg {
  padding: 5px 10px;

  // background-color: #f9fafc;
}
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
/deep/.el-textarea__inner {
  width: 90%;
  margin-left: 15px;
}
/deep/.el-dialog__header {
  background: #1071e2;

  /deep/.el-dialog__title {
    color: #fff;
  }
  /deep/.el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
}

// /deep/.el-button--primary {
//   background: #1071e2;
// }
.chakan {
  cursor: pointer;
  color: #1071e2;
}
.shezhi_left {
  // background: #bfa;
  height: 160px;
  box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
  .titleP {
    margin-left: 20px;
    line-height: 40px;
    // text-align: center;
  }
  ul {
    border-top: 1px solid #f3f6fa;
    padding-left: 20px;
    li {
      margin-top: 8px;
    }
  }
}
.shizhi_right {
  .right_one {
    margin-left: 20px;
    height: 265px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    .titleP {
      padding-left: 20px;
      line-height: 40px;
      border-bottom: 1px solid #f3f6fa;
      // text-align: center;
    }
    /deep/.el-button {
      width: 100%;
    }
  }
  .right_two {
    margin-top: 20px;
    margin-left: 20px;
    height: 580px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    .titleP {
      padding-left: 20px;
      line-height: 40px;
      border-bottom: 1px solid #f3f6fa;
      // text-align: center;
    }
    .tabs {
      padding: 10px 30px;
      p {
        margin-bottom: 5px;
        // margin-top: 20px;
      }
      .tabs_one {
        /deep/.el-input__inner {
          margin-bottom: 20px;
        }
      }

      /deep/.el-button {
        width: 100%;
      }
    }
  }
}
.shebeiWapper {
  margin-top: 25px;
  display: flex;
  height: 1600px;
  .shebeiInfo {
    .one {
      width: 300px;
      height: 315px;
      box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
      .titleP {
        margin-left: 20px;
        line-height: 40px;
        // text-align: center;
      }
      ul {
        border-top: 1px solid #f3f6fa;
        padding-left: 20px;
        li {
          margin-top: 8px;
        }
      }
    }
    .two {
      margin-top: 20px;
      width: 300px;
      height: 250px;
      box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
      // background: #bfa;
      .titleP {
        padding-left: 20px;
        line-height: 40px;
        // text-align: center;
        border-bottom: 1px solid #f3f6fa;
      }
      /deep/.el-button--mini {
        margin: 10px 0 0 15px;
      }
    }
  }
  .shebeiEcharts {
    margin-left: 20px;
    width: 750px;
    height: 212px;
    // background: #bfa;
    .imgWapper {
      height: 90px;
      text-align: center;
      background: #1071e2;
      div {
        // line-height: 90px;
        padding-top: 3px;
        p {
          color: #fff;
        }
      }
      ul {
        margin-top: -10px;
        text-align: left;
        span {
          color: red;
        }
      }
    }
    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 4px;
    }
    .bg-purple-dark {
      background: #99a9bf;
    }
    .bg-purple {
      box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    }
    .bg-purple-light {
      background: #e5e9f2;
    }
    .grid-content {
      border-radius: 4px;
      height: 212px;
      ul {
        margin-left: 15px;
        li {
          margin-top: 15px;
        }
      }
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }
    .two_echarts {
      height: 340px;
      // background: #bfa;
      margin-top: 20px;
      box-shadow: 0px 0px 29px 0px rgba(0, 0, 0, 0.1);
      .titleP {
        padding-left: 20px;
        line-height: 40px;
        border-bottom: 1px solid #f3f6fa;
        // text-align: center;
      }
      .echarts_wapper_two_search {
        width: 100%;
        height: 300px;
      }
    }
    .three_echarts {
      height: 340px;
      // background: #bfa;
      margin-top: 20px;
      box-shadow: 0px 0px 29px 0px rgba(0, 0, 0, 0.1);
      .titleP {
        padding-left: 20px;
        line-height: 40px;
        border-bottom: 1px solid #f3f6fa;
        // text-align: center;
      }
      .echarts_wapper_three_search {
        width: 100%;
        height: 300px;
      }
    }
    .four_echarts {
      height: 200px;
      // background: #bfa;
      margin-top: 20px;
      box-shadow: 0px 0px 29px 0px rgba(0, 0, 0, 0.1);
      .titleP {
        padding-left: 20px;
        line-height: 40px;
        border-bottom: 1px solid #f3f6fa;
        // text-align: center;
      }
      .echarts_wapper_four_search {
        width: 100%;
        height: 160px;
      }
    }
    .one_echarts {
      height: 340px;
      // background: #bfa;

      box-shadow: 0px 0px 29px 0px rgba(0, 0, 0, 0.1);
      .titleP {
        padding-left: 20px;
        line-height: 40px;
        border-bottom: 1px solid #f3f6fa;
        // text-align: center;
      }
      .echarts_wapper_one_search {
        width: 100%;
        height: 300px;
      }
    }
  }
}
.rightWapper {
  margin-top: 50px;
  position: absolute;
  z-index: 99;
  right: 20px;
  width: 330px;
  .right_one {
    // background-image: ("../../../assets/images/zhengchangbili.png");
    height: 90px;
    background-size: 100% 450px;
    background-image: url("../../../assets/images/sousuo.png");
    .chaxun {
      padding-top: 20px;
      padding-left: 20px;
      /deep/.el-input__inner {
        background: #021019;
        color: #fff;
        border: 1px solid #3094d5;
        width: 200px;
      }
    }
    .scroll_wapper {
      // padding-left: px;
      // margin-top: 15px;
      // position: relative;

      overflow-y: auto;
      // height: 290px; //高度根据需求自行设定
      max-height: 350px;
      overflow-x: hidden;
      padding-bottom: -10px;
      .right_info {
        padding-left: 1px;
        // margin-top: 5px;
        margin-left: 3px;
        // padding: none;
        width: 99%;
        // height: 100px;
        border-top: 1px solid #3486da;
        box-sizing: border-box;
        .olList {
          padding-left: 18px;
          font-size: 14px;

          background: linear-gradient(-87deg, #3053af, #14295a);
          border-top: 1px solid #3486da;

          // height: 93px;
          &:nth-child(1) {
            border-top: none;
          }
          li {
            padding-bottom: 5px;
          }
        }
      }
    }
  }
}
.FireWaterSystemDialogWapper {
  width: 500px;
  margin: 0 auto;
  .title {
    text-align: center;
  }
  .shuiya_echarts {
    // width: 400px;
    height: 400px;
    margin: 0 auto;
    // background: #bfa;
  }
  .yeya_echarts {
    width: 400px;
    height: 400px;
    margin: 0 auto;
    // background: #bfa;
  }
  /deep/.el-button--small {
    width: 120px;
  }
}
.shuju_echarts {
  width: 95%;
  height: 450px;
  margin: 0 auto;
  // background: #bfa;
  margin-top: 20px;

  box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
  p {
    line-height: 20px;
    padding: 10px 0 10px 20px;
    border-bottom: 1px solid #eaeaea;
  }
  .shuju_echarts_wapper {
    // width: 90%;
    height: 410px;
    // margin: 0 auto;
    // background: #bfa;
    // margin-top: 30px;
  }
}

//火灾报警样式
.FireAlarmSystemDialog {
  // margin: 20px 0 0 20px;
  .one {
    width: 300px;
    height: 200px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    p {
      margin-left: 20px;
      line-height: 40px;
      // text-align: center;
      border-bottom: 1px solid #f3f6fa;
    }
    ul {
      border-top: 1px solid #f3f6fa;
      padding-left: 20px;
      li {
        margin-top: 8px;
      }
    }
  }
  .two {
    margin-top: 20px;
    width: 100%;
    // height: 200px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    p {
      padding-left: 20px;
      line-height: 40px;
      // text-align: center;
      border-bottom: 1px solid #f3f6fa;
    }
  }
  .formList {
    padding-left: 20px;
  }
  .three {
    margin-top: 20px;
    width: 100%;
    height: 200px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    p {
      padding-left: 20px;
      line-height: 40px;
      // text-align: center;
      border-bottom: 1px solid #f3f6fa;
    }
  }
}
//独立烟感样式
.SmartIndependentSmoke {
  .two {
    // margin-top: 20px;
    // width: 300px;
    height: 250px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    // background: #bfa;
    .titleP {
      padding-left: 20px;
      line-height: 40px;
      // text-align: center;
      border-bottom: 1px solid #f3f6fa;
    }
    /deep/.el-button--mini {
      margin: 10px 0 0 15px;
    }
  }
}
.SmartIndependentSmoke_right_wapper {
  .rihgt_one {
    height: 160px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    // background: #bfa;
    .titleP {
      padding-left: 20px;
      line-height: 40px;
      // text-align: center;
      border-bottom: 1px solid #f3f6fa;
    }
    ul {
      // border-top: 1px solid #f3f6fa;
      padding-left: 20px;
      li {
        margin-top: 8px;
      }
    }
  }
  .right_two {
    height: 160px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    // background: #bfa;
    .titleP {
      padding-left: 20px;
      line-height: 40px;
      // text-align: center;
      border-bottom: 1px solid #f3f6fa;
    }
    img {
      margin: 12px 70px;
      width: 50%;
      height: 100%;
    }
  }
  .SmartIndependentSmoke_echars_one {
    margin-top: 20px;
    height: 340px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    .titleP {
      padding-left: 20px;
      line-height: 40px;
      // text-align: center;
      border-bottom: 1px solid #f3f6fa;
    }
    .SmartIndependentSmoke_echars_one_wapper {
      height: 300px;
    }
  }
  .lishibaojing {
    margin-top: 20px;
    height: 340px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    .titleP {
      padding-left: 20px;
      line-height: 40px;
      // text-align: center;
      border-bottom: 1px solid #f3f6fa;
    }
    .formList {
      padding-left: 20px;
    }
  }
}
</style>