import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import VueRouter from "vue-router";
import VueResource from 'vue-resource'
import api from './api/redis.js'
import axios from 'axios'


Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VueResource);

Vue.config.debug = true;
Vue.prototype.api = api
Vue.prototype.axios = axios

{
  axios.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    let pathname = location.pathname;
    if (localStorage.getItem('token')) {
      if (pathname != '/login') {
        config.headers.common['Token'] = localStorage.getItem('token');
      }
    }
    return config;
  }, error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  // http response 响应拦截器
  axios.interceptors.response.use(response => {
    return response;
  }, error => {
    if (error.response) {
      switch (error.response.status) {
        // 返回401，清除token信息并跳转到登录页面
        case 401:
          // alert("登录信息失效，请重新登录")
          localStorage.removeItem('token');
          router.push("/login").then()
      }
      // 返回接口返回的错误信息
      return Promise.reject(error.response.data);
    }
  });

}

import index from './component/Index.vue'
import string from './component/String.vue'
import list from './component/List.vue'

import config from './component/Config.vue'
import info from './component/Info.vue'
import login from './component/Login.vue'
import logs from './component/Logs.vue'
import set from './component/Set.vue'
import hash from './component/Hash.vue'
import sortedSet from './component/SortedSet.vue'
import excel from './component/Excel.vue'
import mysql from './component/Mysql.vue'
import geo from './component/GEO.vue'


const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: "index",
      component: (index),
      meta: {
        title: '管理系统主页'
      }
    }
    , {
      path: '/string',
      name: "string",
      component: string,
      meta: {
        title: 'String管理'
      }
    }, {
      path: '/list',
      name: "list",
      component: list,
      meta: {
        title: 'List管理'
      }
    }, {
      path: '/hash',
      name: "hash",
      component: hash,
      meta: {
        title: 'Hash管理'
      }
    }, {
      path: '/set',
      name: "set",
      component: set,
      meta: {
        title: 'Set管理'
      }
    }, {
      path: '/sorted-set',
      name: "sorted-set",
      component: sortedSet,
      meta: {
        title: 'SortedSet管理'
      }
    }, {
      path: '/GEO',
      name: "GEO",
      component: geo,
      meta: {
        title: 'GEO管理'
      }
    },
    {
      path: '/config',
      name: "config",
      component: config,
      meta: {
        title: '配置管理'
      }
    },
    {
      path: '/info',
      name: "info",
      component: info,
      meta: {
        title: 'redis信息'
      }
    },{
      path: '/exportToExcel',
      name: "excel",
      component: excel,
      meta: {
        title: '导出到Excel配置'
      }
    },{
      path: '/exportToMysql',
      name: "mysql",
      component: mysql,
      meta: {
        title: '导出到MySql配置'
      }
    },
    {
      path: '/login',
      name: "login",
      component: login,
      meta: {
        title: '登陆界面',
        showOnly: true,
      }
    }, {
      path: '/logs',
      name: "logs",
      component: logs,
      meta: {
        title: '账户日志',
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  el: '#app',
  render: h => h(App),
  router: router,

})
