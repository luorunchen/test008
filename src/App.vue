<template>
  <div id="baoj">
    <audio src="./assets/6709.mp3" id="audio" loop></audio>
    <div class="weiyi">
      <el-dialog
        :close-on-click-modal="false"
        :before-close="handleClose"
        title="报警信息"
        :visible.sync="dialogVisible"
        width="20%"
        :modal="false"
      >
        <p>项目名称:{{ arlme.name }}</p>
        <p>报警内容: {{ arlme.type }}</p>
        <p>报警地址:{{ arlme.address }}</p>
        <p>设备号:{{ arlme.imei }}</p>
        <el-button type="danger" size="mini" style="width: 100%" @click="handle"
          >查看详情</el-button
        >
        <el-button
          type="danger"
          size="mini"
          style="width: 100%; margin: 5px 0 0 0"
          @click="handleVideo"
          >查看视频</el-button
        >
        <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span> -->
      </el-dialog>
    </div>
    <PublicPopUps ref="publicPopUps" :pagetype="pagetype" />
    <IntelligentReclosing ref="intelligentReclosing" :pagetype="pagetype" />
    <!-- <p @click="www">12321</p> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Home from "@/components/FireInternetOfThings";
import PublicPopUps from "@/components/FireInternetOfThings/translate/publicPopUps";
import IntelligentReclosing from "@/components/FireInternetOfThings/translate/intelligentReclosing";
import { getvideoBydevno } from "@/api/index.js";
export default {
  data() {
    return {
      dialogVisible: false,
      username: "",
      arlme: {
        name: "",
        type: "",
        address: "",
        imei: "",
        pid: "48",
        videoImei: "",
        videochanle: "",
      },
      pagetype: "",
    };
  },
  components: {
    Home,
    PublicPopUps,
    IntelligentReclosing,
  },
  watch: {
    username(val) {
      this.goEasyFun();
      // console.log(val, 9999999999);
    },
    dialogVisible(val) {
      // console.log(val, "playState");
      // console.log(this.listData, "playState");
      if (val == true && this.listData == "开") {
        this.$nextTick(() => {
          this.audo = document.getElementById("audio");
          // console.log(this.audo);
          this.audo.play();
        });
      }
      // if()
    },
  },
  computed: {
    listData() {
      return this.$store.state.SoundSwitch;
    },
  },
  methods: {
    handleVideo() {
      if (this.arlme.pid == 48) {
        this.$refs.publicPopUps.getvideoFun(this.arlme.videoImei, 99, {
          channle: this.arlme.videochanle,
        });
      } else {
        getvideoBydevno(this.arlme.imei).then((res) => {
          if (res.data.mess == "0") {
            return this.$message({
              showClose: true,
              message: "该设备的项目中没有摄像设备",
              type: "warning",
            });
          } else {
            this.$refs.publicPopUps.getvideoFun(
              res.data.mess[0],
              this.arlme.pid
            );
          }
        });
      }
    },
    handle() {
      // console.log(this.arlme.pid == (23 || 22 || "25" || 26), 666);
      if (
        this.arlme.pid == 23 ||
        this.arlme.pid == 22 ||
        this.arlme.pid == 25 ||
        this.arlme.pid == 26
      ) {
        this.$refs.intelligentReclosing.see(this.arlme.did, this.arlme.imei);
      } else {
        this.$refs.publicPopUps.openTypeFun(
          this.arlme.did,
          this.arlme.imei,
          this.arlme.pid
        );
      }
    },
    handleClose(done) {
      if (this.listData == "开") {
        this.audo.pause();
      }

      done();
    },
    goEasyFun() {
      let goEasy = GoEasy.getInstance({
        host: "hangzhou.goeasy.io", //应用所在的区域地址: 【hangzhou.goeasy.io |singapore.goeasy.io】
        appkey: "BC-3937ef16a69a451088d004bb70a22c7c", //替换为您的应用appkey
      });

      goEasy.connect({
        onSuccess: function () {
          //连接成功
          console.log("GoEasy connect successfully."); //连接成功
        },
        onFailed: function (error) {
          //连接失败
          console.log(
            "Failed to connect GoEasy, code:" +
              error.code +
              ",error:" +
              error.content
          );
        },
        onProgress: function (attempts) {
          //连接或自动重连中
          console.log("GoEasy is connecting", attempts);
        },
      });
      const _that = this;
      goEasy.subscribe({
        channel: this.utils.userName, //替换为您自己的channel

        onMessage: function (message) {
          const res = message.content;
          const arr = res.split(",");
          console.log(res);
          _that.arlme.name = arr[2];
          _that.arlme.imei = arr[0];
          _that.arlme.type = arr[4];
          _that.arlme.address = arr[3];
          _that.arlme.pid = arr[5];
          _that.arlme.did = arr[1];

          _that.dialogVisible = true;

          switch (_that.arlme.pid) {
            case "45":
              _that.pagetype = 6;
              break;
            case "2":
              _that.pagetype = 6;
              break;
            case "48":
              _that.arlme.videoImei = arr[6];
              _that.arlme.videochanle = arr[7];
              break;
          }
        },
        onSuccess: function (message) {
          console.log("Channel订阅成功。");
          // this.dialogVisible = true;
        },
        onFailed: function (error) {
          console.log(
            "Channel订阅失败, 错误编码：" +
              error.code +
              " 错误信息：" +
              error.content
          );
        },
      });
    },
  },
  mounted() {
    // setInterval(() => {
    //   this.dialogVisible = true;
    // }, 5000);
    this.goEasyFun();
  },
  updated() {
    console.log(111111);
    this.username = this.utils.userName;
  },
};
</script>
<style lang='less'>
* {
  padding: 0;
  margin: 0;
}
#baoj {
  .weiyi {
    .el-dialog__header {
      padding: 0;
      background: #4c0e25;
      border: #b81c7f 1px solid;
      border-bottom: none;
    }
    .el-dialog__body {
      background: #4c0e25;
      color: #fff;
      padding: 10px 20px;
      border: #b81c7f 1px solid;
      border-top: none;
      p {
        margin-bottom: 10px;
      }
    }
    .el-dialog__title {
      width: 255px;
      height: 30px;
      background: linear-gradient(90deg, #812145, #4c0e25);
      color: #fff;
      margin: 15px 0 0 15px;
      display: inline-block;
      padding-left: 10px;
      line-height: 30px;
    }
  }
}
/*去除a标签下划线*/
a {
  color: #fff;
  text-decoration: none;
}
/*去除未被访问的a标签的下划线*/
a:link {
  text-decoration: none;
}
/*去除已经被访问过的a标签的下划线*/
a:visited {
  text-decoration: none;
}
/*去除鼠标悬停时的a标签的下划线*/
a:hover {
  text-decoration: none;
}
/*去除正在点击的a标签的下划线（鼠标按下，尚未松开）*/
a:active {
  text-decoration: none;
}
/*去除获得焦点的a标签的下划线（被鼠标点击过）*/
a:focus {
  text-decoration: none;
}
ul {
  li {
    list-style: none;
  }
}
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  // background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  background-color: rgb(13, 30, 77);
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px #1b6c89;
  background-color: #1b6c89;
}
</style>