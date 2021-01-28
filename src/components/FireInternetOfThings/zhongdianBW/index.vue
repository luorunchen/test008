<template>
  <div id="huozaibaojing">
    <div class="leftWapper">
      <div class="left_one">
        <p>今日报警项目</p>
        <div class="title">
          <ul>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
          </ul>
        </div>

        <ul class="ulList">
          <li><span>报警XXXX</span><span>共X条未处理></span></li>
          <li>2</li>
          <li>2</li>
        </ul>
      </div>
      <div class="left_two">
        <p>接入电气火灾探测器</p>
        <div class="title">
          <ul>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
            <li>2</li>
          </ul>
        </div>

        <Translate />
      </div>
    </div>
    <SearchTranslate />
  </div>
</template>

<script>
import Translate from "../translate/baojingTranslate.vue";
import SearchTranslate from "../translate/searchTranslate.vue";
export default {
  data() {
    return {
      formInline: {
        user: "",
      },
    };
  },
  components: {
    Translate,
    SearchTranslate,
  },
};
</script>
<style lang='less' scoped>
#huozaibaojing {
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
      background-image: url("../../images/zhengchangbili.png");
      height: 450px;
      background-size: 100% 100%;
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
      background-image: url("../../images/椭圆 6 拷贝 8@2x.png");
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
      // background-image: ("../../images/zhengchangbili.png");
      height: 400px;
      background-size: 100% 100%;
      background-image: url("../../images/矩形 10 拷贝 9@2x.png");
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