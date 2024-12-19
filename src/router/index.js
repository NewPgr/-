import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/home.vue'
import Talk from '../views/chat.vue'
import Mileage from '../views/information.vue'
import Test from '../views/test.vue'
import Login from '../views/login.vue'
import Registered from '../views/registered.vue'
import Testfy from '../views/testfy.vue'

Vue.use(VueRouter)

// 定义路由配置
const routes = [
  {
    path: '/registered',
    name: 'registered',
    component: Registered,
    meta: { requiresAuth: false } // 不需要登录
  },
  {
    path: '/',
    name: 'login',
    component: Login,
    meta: { requiresAuth: false } // 不需要登录
  },
  {
    path: '/zhuye',
    name: 'zhuye',
    component: HomeView,
    redirect: '/聊天', // 直接跳转到子页面
    meta: { requiresAuth: true }, // 需要登录
    children: [
      {
        path: '/聊天',
        name: '聊天',
        component: Talk,
        meta: { requiresAuth: true } // 需要登录
      },
      {
        path: '/查看信息',
        name: '查看信息',
        component: Mileage,
        meta: { requiresAuth: true } // 需要登录
      },
      {
        path: '/测试',
        name: '测试',
        component: Test,
        meta: { requiresAuth: true } // 需要登录
      },
      {
        path: '/测试图片',
        name: '测试图片',
        component: Testfy,
        meta: { requiresAuth: true } // 需要登录
      },
    ]
  }
]

// 实例化 VueRouter
const router = new VueRouter({
  routes
})

// 路由守卫：检查用户是否登录
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = localStorage.getItem('isAuthenticated'); // 获取登录状态

  if (requiresAuth && !isAuthenticated) {
    // 如果需要登录且未登录，则跳转到登录页面
    next({ path: '/' });
  } else {
    next(); // 否则，继续访问目标页面
  }
});

// 导出实例化的 router
export default router
