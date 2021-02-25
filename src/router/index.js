import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [

  //登录进入的首页
  {
    path: '/',
    name: 'home',
    component: () => import('@/components/home/index.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/login')
  },
  {
    path: '/SystemSettings',
    name: 'SystemSettings',
    component: () => import('../components/SystemSettings')
  },
  {
    path: '/FireManagement',
    name: 'FireManagement',
    component: () => import('../components/FireManagement')
  },
  {
    //隐患进度整改
    path: '/FireInternetOfThings',
    name: 'FireInternetOfThings',
    component: () => import('@/components/FireInternetOfThings'),

    children: [
      //电气火灾隐患
      {
        path: 'electricalFire',
        name: 'electricalFire',
        component: () => import('@/components/FireInternetOfThings/dianqiHZ'),
      },

      //消防水系统
      {
        path: 'FireWaterSystem',
        name: 'FireWaterSystem',
        component: () => import('@/components/FireInternetOfThings/xiaofangshui'),
      },
      //火灾报警系统
      {
        path: 'FireAlarmSystem',
        name: 'FireAlarmSystem',
        component: () => import('@/components/FireInternetOfThings/huozaiBJ'),
      },
      //重点部位
      {
        path: 'KeyParts',
        name: 'KeyParts',
        component: () => import('@/components/FireInternetOfThings/zhongdianBW'),
      },
      //智慧独立烟感
      {
        path: 'SmartIndependentSmoke',
        name: 'SmartIndependentSmoke',
        component: () => import('@/components/FireInternetOfThings/yanganDL'),
      },
      // 燃气探测器
      {
        path: 'GasDetector',
        name: 'GasDetector',
        component: () => import('@/components/FireInternetOfThings/ranqiTC'),
      },
      // 应急处理
      {
        path: 'EmergencyManagement',
        name: 'EmergencyManagement',
        component: () => import('@/components/FireInternetOfThings/yinjiCL'),
      },
      //智慧消防报警
      {
        path: 'IntelligentFireAlarm',
        name: 'IntelligentFireAlarm',
        component: () => import('@/components/FireInternetOfThings/xiaofangBJ'),
      },
      //灭火器
      {
        path: 'FireExtinguisher',
        name: 'FireExtinguisher',
        component: () => import('@/components/FireInternetOfThings/meihuoqi'),
      },
      //电力检测
      {
        path: 'PowerDetection',
        name: 'PowerDetection',
        component: () => import('@/components/FireInternetOfThings/dianliJC'),
      },
      {
        path: 'Panorama',
        name: 'Panorama',
        component: () => import('@/components/FireInternetOfThings/shebeidingwei'),
      },

    ],


  },


]

const router = new VueRouter({
  routes,
  mode: 'history'
})
router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem("userName");
  // console.log(token, 987654321)
  // console.log(to.name, 990, from, 6545, next)
  if (token) {
    next()
  } else {
    //如果没有登录你访问的不是login就让你强制跳转到login页面
    if (to.path !== "/login") {
      // this.$message.error('您还未登录账号')
      next({ path: "/login" });
    } else {
      next();
    }
  }

});
export default router
