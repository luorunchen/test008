<template>
  <div id="dianqiHZ">
    <div class="title2"></div>
    <div class="leftWapper">
      <div class="left_one" ref="leftOne">
        <p>今日报警项目</p>
        <div class="title">
          <ul v-for="(item, index) in baojingNum" :key="index">
            <li>{{ item }}</li>
          </ul>
        </div>

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
      <div class="left_two">
        <p>接入电气火灾探测器</p>

        <Translate :name="name" />
      </div>
    </div>
    <SearchTranslate
      :SElec_DetailElecDevice_List="SElec_DetailElecDevice_List"
      :pagetype="pagetype"
      :DeviceProjectNewData="DeviceProjectNewData"
    />
    <PublicPopUps ref="publicPopUps" :pagetype="pagetype" />
  </div>
</template>

<script>
import {
  DeviceAlarm,
  SElec_DetailElecDevice,
  DeviceProjectNew,
} from "@/api/index.js";
import Translate from "../../FireInternetOfThings/translate/baojingTranslate.vue";
import SearchTranslate from "../../FireInternetOfThings/translate/searchTranslate.vue";
import PublicPopUps from "../../FireInternetOfThings/translate/publicPopUps";
export default {
  data() {
    return {
      SElec_DetailElecDevice_List: "",
      baojingNum: "",
      DeviceAlarmList: "",
      pagetype: 2,
      type: 3,
      name: "电气火灾",
      DeviceProjectNewData: "",
      // DeviceNumList: "",
    };
  },
  watch: {
    contractFile(val, lav) {
      console.log(val);
      // let map;
      // if (lav == null || lav == undefined) {
      //   map = val.split(",");
      // } else {
      //   map = lav.split(",");
      // }

      // console.log(map.reverse());
      this.map.setZoomAndCenter(7, val);
    },
  },
  computed: {
    contractFile() {
      return this.$store.state.map_lnglat;
    },
  },
  mounted() {
    this.DeviceAlarm();
    this.map();
    this.stop();
  },
  methods: {
    stop() {
      var mo = function (e) {
        e.preventDefault();
      };
      document.body.style.overflow = "hidden";
      document.addEventListener("touchmove", mo, false); //禁止页面滑动
    },
    map() {
      this.map = new AMap.Map("dianqiHZ", {
        center: [116.397428, 39.90923],
        resizeEnable: true,
        zoom: 10,
        mapStyle: "amap://styles/dcb78e5f043e25116ab6bdeaa6813234",
      });
      this.map.setZoomAndCenter(4, [116.397428, 39.90923]);
      DeviceProjectNew(this.utils.userName, 3, 1).then((res) => {
        // this.DeviceProjectNewData = res.data.Company;

        if (res.data == [] || res.data == "") {
          return (this.loading_map = false);
        }

        let a = [];
        let b = [];
        for (let i = 0; i < res.data.Company.length; i++) {
          if (res.data.Company[i].style == 1) {
            b.push(res.data.Company[i]);
          } else {
            a.push(res.data.Company[i]);
          }
        }

        this.DeviceProjectNewData = [...a, ...b];
        // console.log(c, "我是aa,b");
        this.$nextTick(() => {
          const style = [
            {
              url: "https://a.amap.com/jsapi_demos/static/images/mass2.png",
              anchor: new AMap.Pixel(4, 4),
              size: new AMap.Size(20, 20),
            },
            {
              url: "https://a.amap.com/jsapi_demos/static/images/mass0.png",
              anchor: new AMap.Pixel(6, 6),
              size: new AMap.Size(23, 23),
            },
          ];
          // console.log(this.DeviceProjectNewData, 987987);

          this.mass = new AMap.MassMarks(this.DeviceProjectNewData, {
            opacity: 0.8,
            zIndex: 111,
            cursor: "pointer",
            style: style,
          });
          // this.DeviceProjectNewData = [];
          const marker = new AMap.Marker({ content: " ", map: this.map });
          this.mass.setMap(this.map);

          this.loading_map = false;
          // 保存this
          var _that = this;
          //绑定事件模块
          this.mass.on("click", function (e) {
            console.log("asdasd");

            // this.$refs.publicPopUps.initOff();

            _that.$refs.publicPopUps.initOff();
            _that.$refs.publicPopUps.echart_wapper(e.data.pid);
          });
        });
      });
    },
    callPolice(pid) {
      SElec_DetailElecDevice(pid).then((res) => {
        this.SElec_DetailElecDevice_List = res.data;
      });
    },

    DeviceAlarm() {
      const region = sessionStorage.getItem("region");
      DeviceAlarm(this.utils.userName, 3, region).then((res) => {
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
    PublicPopUps,
  },
};
</script>
<style lang='less' scoped>
#dianqiHZ {
  height: 800px;
  .title2 {
    position: relative;
    z-index: 999;
    width: 100%;
    height: 20px;
    background-image: linear-gradient(to top, rgba(8, 48, 74, 0.5), #030542);
  }
  // /deep/.el-input__inner {
  //   background: #021019;
  //   color: #fff;
  //   border: 1px solid #3094d5;
  // }
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
      width: 100%;
      height: 450px;
      background-image: url("../../../assets//images/zhengchangbili.png");

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
        // padding-bottom: 10px;
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
        // padding-bottom: 20px;
        margin-left: 30px;
        li {
          cursor: pointer;
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
          margin-top: 15px;
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
}
</style>