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
    path: '/blog',
    name: 'blog',
    meta: {
      icon: 'ios-document',
      title: '博客管理'
    },
    component: Main,
    children: [{
      path: 'create_blog_page',
      name: 'create_blog_page',
      meta: {
        icon: 'ios-add-circle',
        title: '创建博客'
      },
      component: () => import('@/view/blog/create/create_blog.vue')
    },
    {
      path: 'blog_list_page',
      name: 'blog_list_page',
      meta: {
        icon: 'ios-list-box',
        title: '博客列表'
      },
      component: () => import('@/view/blog/list/blog_list.vue')
    },
    {
      path: 'view_blog_page/:id',
      name: 'view_blog_page',
      meta: {
        hideInMenu: true,
        title: '阅读博客'
      },
      component: () => import('@/view/blog/list/view_blog.vue')
    },
    {
      path: 'edit_blog_page/:id',
      name: 'edit_blog_page',
      meta: {
        hideInMenu: true,
        title: '编辑博客'
      },
      component: () => import('@/view/blog/list/edit_blog.vue')
    }]
  },
  {
    path: '/todo',
    name: 'todo',
    meta: {
      icon: 'ios-calendar',
      title: '日程管理'
    },
    component: Main,
    children: [
      {
        path: 'todo_list_page',
        name: 'todo_list_page',
        meta: {
          icon: 'ios-list-box',
          title: '日程管理'
        },
        component: () => import('@/view/todo/list/todo_list.vue')
      }]
  }, {
    path: '/material',
    name: 'material',
    meta: {
      icon: 'ios-photos',
      title: '素材管理'
    },
    component: Main,
    children: [{
      path: 'create_material_page',
      name: 'create_material_page',
      meta: {
        icon: 'ios-add-circle',
        title: '创建素材'
      },
      component: () => import('@/view/material/create/create_material.vue')
    },
    {
      path: 'material_list_page',
      name: 'material_list_page',
      meta: {
        icon: 'ios-list-box',
        title: '素材列表'
      },
      component: () => import('@/view/material/list/material_list.vue')
    }]
  },
  {
    path: '',
    name: 'group',
    component: Main,
    children: [
      {
        path: 'group_page',
        name: 'group_page',
        meta: {
          icon: 'ios-basket',
          title: '分组管理'
        },
        component: () => import('@/view/group/group.vue')
      }
    ]
  },
  {
    path: '',
    name: 'setting',
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
