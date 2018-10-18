import Main from '@/view/main'
/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/goods',
    name: '商品管理',
    meta: {
      icon: 'ios-apps',
      title: '商品管理'
    },
    component: Main,
    children: [{
      path: 'create_goods_page',
      name: 'create_goods_page',
      meta: {
        icon: 'ios-add-circle',
        title: '添加商品'
      },
      component: () => import('@/view/goods/create_goods.vue')
    },
    {
      path: 'goods_list_page',
      name: 'goods_list_page',
      meta: {
        icon: 'ios-list-box',
        title: '商品列表'
      },
      component: () => import('@/view/goods/goods_list.vue')
    },
    {
      path: 'edit_goods_page/:id',
      name: 'edit_goods_page',
      meta: {
        hideInMenu: true,
        title: '编辑商品'
      },
      component: () => import('@/view/goods/edit_goods.vue')
    }]
  },
  {
    path: '/store',
    name: '商家管理',
    meta: {
      icon: 'md-appstore',
      title: '商家管理'
    },
    component: Main,
    children: [
      {
        path: 'create_store_page',
        name: 'create_store_page',
        meta: {
          icon: 'ios-add-circle',
          title: '添加商家'
        },
        component: () => import('@/view/store/create_store.vue')
      },
      {
        path: 'store_list_page',
        name: 'store_list_page',
        meta: {
          icon: 'ios-list-box',
          title: '商家列表'
        },
        component: () => import('@/view/store/store_list.vue')
      },
      {
        path: 'edit_store_page/:id',
        name: 'edit_store_page',
        meta: {
          hideInMenu: true,
          title: '编辑商家'
        },
        component: () => import('@/view/store/edit_store.vue')
      }]
  },
  {
    path: '/basedata',
    name: '基础数据管理',
    meta: {
      icon: 'md-analytics',
      title: '基础数据管理'
    },
    component: Main,
    children: [{
      path: 'goods_type_list_page',
      name: 'goods_type_list_page',
      meta: {
        icon: 'ios-cart',
        title: '商品分类列表'
      },
      component: () => import('@/view/basedata/goods_type_list.vue')
    },
    {
      path: 'store_type_list_page',
      name: 'store_type_list_page',
      meta: {
        icon: 'ios-body',
        title: '商家分类列表'
      },
      component: () => import('@/view/basedata/goods_type_list.vue')
    }]
  },
  {
    path: '/money',
    name: '财务管理',
    meta: {
      icon: 'logo-yen',
      title: '财务管理'
    },
    component: Main,
    children: [{
      path: 'report_page',
      name: 'report_page',
      meta: {
        icon: 'ios-stats',
        title: '报表中心'
      },
      component: () => import('@/view/money/report_center.vue')
    },
    {
      path: 'income_list_page',
      name: 'income_list_page',
      meta: {
        icon: 'md-repeat',
        title: '收支记录列表'
      },
      component: () => import('@/view/money/income_list.vue')
    }]
  },

  {
    path: '',
    name: '营销中心',
    component: Main,
    meta: {
      icon: 'ios-cube',
      title: '营销中心'
    },
    children: [
      {
        path: 'discount_list_page',
        name: 'discount_list_page',
        meta: {
          icon: 'md-paper',
          title: '优惠券列表'
        },
        component: () => import('@/view/marketing/discount_list.vue')
      },
      {
        path: 'promote_list_page',
        name: 'promote_list_page',
        meta: {
          icon: 'ios-navigate',
          title: '推广活动列表'
        },
        component: () => import('@/view/marketing/promote_list.vue')
      },
      {
        path: 'datas_page',
        name: 'datas_page',
        meta: {
          icon: 'ios-analytics',
          title: '运营分析'
        },
        component: () => import('@/view/marketing/ruing_analytics.vue')
      }
    ]
  },
  {
    path: '',
    name: '订单管理',
    component: Main,
    children: [
      {
        path: 'order_list_page',
        name: 'order_list_page',
        meta: {
          icon: 'md-list',
          title: '订单列表'
        },
        component: () => import('@/view/order/order_list.vue')
      }
    ]
  },
  {
    path: '',
    name: '代办事项管理',
    component: Main,
    children: [
      {
        path: 'todo_page',
        name: 'todo_page',
        meta: {
          icon: 'md-time',
          title: '待办事项'
        },
        component: () => import('@/view/todo/todo_list.vue')
      }
    ]
  },
  {
    path: '',
    name: '通知管理',
    component: Main,
    children: [
      {
        path: 'notice_page',
        name: 'notice_page',
        meta: {
          icon: 'ios-notifications',
          title: '通知列表'
        },
        component: () => import('@/view/notice/notice_list.vue')
      }
    ]
  },
  {
    path: '',
    name: '设置',
    component: Main,
    children: [
      {
        path: 'setting_page',
        name: 'setting_page',
        meta: {
          icon: 'ios-settings',
          title: '个人设置'
        },
        component: () => import('@/view/setting/setting_page.vue')
      }
    ]
  }
]
