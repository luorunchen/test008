<template>
  <div>
    <!-- <p @click="www">12321</p> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Home from "@/components/FireInternetOfThings";
export default {
  components: {
    Home,
  },
};
</script>
<style lang='less'>
* {
  padding: 0;
  margin: 0;
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