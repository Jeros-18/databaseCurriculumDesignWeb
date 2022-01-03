import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/employee',
    component: Layout,
    redirect: '/example/table',
    name: '员工管理',
    meta: { title: '员工管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '员工列表',
        component: () => import('@/views/employee/list'),
        meta: { title: '员工列表', icon: 'table' }
      },
      {
        path: 'add',
        name: '添加员工',
        component: () => import('@/views/employee/add'),
        meta: { title: '添加员工', icon: 'tree' }
      },
      {
        path: 'add/:id',
        name: 'EduTeacherEdit',
        component: () => import('@/views/employee/add'),
        meta: { title: '编辑员工', noCache: true },
        hidden: true
      }
    ]
  },

  {
    path: '/store',
    component: Layout,
    redirect: '/example/table',
    name: '仓库管理',
    meta: { title: '仓库管理', icon: 'form' },
    children: [
      {
        path: 'list',
        name: '仓库列表',
        component: () => import('@/views/store/list'),
        meta: { title: '仓库列表', icon: 'table' }
      },
      {
        path: 'add',
        name: '添加仓库',
        component: () => import('@/views/store/add'),
        meta: { title: '添加仓库', icon: 'tree' }
      },
      {
        path: 'add/:id',
        name: 'StoreEdit',
        component: () => import('@/views/store/add'),
        meta: { title: '编辑仓库', noCache: true },
        hidden: true
      }
    ]
  },

  {
    path: '/shop',
    component: Layout,
    redirect: '/example/table',
    name: '车间管理',
    meta: { title: '车间管理', icon: 'link' },
    children: [
      {
        path: 'list',
        name: '车间列表',
        component: () => import('@/views/shop/list'),
        meta: { title: '车间列表', icon: 'table' }
      },
      {
        path: 'add',
        name: '添加车间',
        component: () => import('@/views/shop/add'),
        meta: { title: '添加车间', icon: 'tree' }
      },
      {
        path: 'add/:id',
        name: 'StoreEdit',
        component: () => import('@/views/shop/add'),
        meta: { title: '编辑车间', noCache: true },
        hidden: true
      }
    ]
  },

  {
    path: '/production',
    component: Layout,
    redirect: '/example/table',
    name: '产品管理',
    meta: { title: '产品管理', icon: 'form' },
    children: [
      {
        path: 'list',
        name: '产品列表',
        component: () => import('@/views/production/list'),
        meta: { title: '产品列表', icon: 'table' }
      },
      {
        path: 'add',
        name: '添加产品',
        component: () => import('@/views/production/add'),
        meta: { title: '添加产品', icon: 'tree' }
      },
      {
        path: 'add/:id',
        name: 'productionEdit',
        component: () => import('@/views/production/add'),
        meta: { title: '编辑仓库', noCache: true },
        hidden: true
      }
    ]
  },

  {
    path: '/factory',
    component: Layout,
    redirect: '/example/table',
    name: '工厂管理',
    meta: { title: '工厂管理', icon: 'form' },
    children: [
      {
        path: 'list',
        name: '工厂列表',
        component: () => import('@/views/factory/list'),
        meta: { title: '工厂列表', icon: 'table' }
      },
      {
        path: 'add',
        name: '添加工厂',
        component: () => import('@/views/factory/add'),
        meta: { title: '添加工厂', icon: 'tree' }
      },
      {
        path: 'add/:id',
        name: 'StoreEdit',
        component: () => import('@/views/factory/add'),
        meta: { title: '编辑工厂', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/storeAdmin',
    component: Layout,
    redirect: '/example/table',
    name: '仓库管理员管理',
    meta: { title: '仓库管理员管理', icon: 'nested' },
    children: [
      {
        path: 'list',
        name: '仓库管理员列表',
        component: () => import('@/views/storeAdmin/list'),
        meta: { title: '仓库管理员列表', icon: 'table' }
      },
      {
        path: 'add',
        name: '添加仓库管理员',
        component: () => import('@/views/storeAdmin/add'),
        meta: { title: '添加仓库管理员', icon: 'tree' }
      },
      {
        path: 'add/:id',
        name: 'StoreEdit',
        component: () => import('@/views/storeAdmin/add'),
        meta: { title: '编辑仓库', noCache: true },
        hidden: true
      }
    ]
  },
  

  

  

  
 
  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
