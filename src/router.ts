import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'


// 定义一些路由
// 每个路由都需要映射到一个组件。
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/main/index.vue'),
    redirect: 'home',
    children:[
      {
        path: '/',
        component: () => import('@/views/home/index.vue'),
      },
      {
        path: '/php',
        redirect: '/php/phpinfo',
        children:[
          {
            path: '/php/:name',
            component: () => import('@/views/php/index.vue'),
          },
        ]
      },
      {
        path: '/mysql',
        redirect: '/mysql/phpmyadmin',
        children:[
          {
            path: '/mysql/:name',
            component: () => import('@/views/mysql/index.vue'),
          },
        ]
      },
      {
        path: '/tool',
        redirect: '/tool/ip',
        children:[
          {
            path: '/tool/ip',
            component: () => import('@/views/tool/ip.vue'),
          },
        ]
      },
      {
        path: '/develop',
        redirect: '/develop/json',
        children:[
          {
            path: '/develop/json',
            component: () => import('@/views/develop/json.vue'),
          },
        ]
      },
      {
        path: '/note',
        component: () => import('@/views/note/index.vue'),
      },
      {
        path: '/note/edit',
        component: () => import('@/views/note/edit.vue'),
      },
      {
        path: '/note/cate/:id',
        component: () => import('@/views/note/cate.vue'),
      },
      {
        path: '/note/:id',
        component: () => import('@/views/note/content.vue'),
      },
      {
        path: '/note',
        component: () => import('@/views/note/index.vue'),
      },
    ]
  },
]



const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//导出router
export default router;