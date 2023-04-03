export const constantRoutes = [
  {
    path: '/',
    name: 'test',
    component: () => import('@/views/test/index.vue'),
    meta: {
      title: '测试',
      showTab: true
    }
  }
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: () => import('@/views/home/index.vue'),
  //   meta: {
  //     title: '首页',
  //     showTab: true
  //   }
  // }
  // {
  //   path: '/my',
  //   name: 'my',
  //   component: () => import('@/views/my/index.vue'),
  //   meta: {
  //     title: '我的',
  //     showTab: true
  //   }
  // },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import('@/views/login/index.vue'),
  //   meta: {
  //     title: '登录',
  //     showTab: false
  //   }
  // },
  // {
  //   path: '/classify',
  //   name: 'classify',
  //   component: () => import('@/views/classify/index.vue'),
  //   meta: {
  //     title: '分类',
  //     showTab: true,
  //     keepAlive: true
  //   }
  // },
  // {
  //   path: '/search',
  //   name: 'search',
  //   component: () => import('@/views/search/index.vue'),
  //   meta: {
  //     title: '搜索',
  //     showTab: false
  //   }
  // },
  // {
  //   path: '/meetingList',
  //   name: 'meetingList',
  //   component: () => import('@/views/home/components/meetingList.vue'),
  //   meta: {
  //     title: '会议列表'
  //     // showTab: true
  //   }
  // },
  // {
  //   path: '/details',
  //   name: 'details',
  //   component: () => import('@/views/home/components/Details.vue'),
  //   meta: {
  //     title: '详情'
  //     // showTab: true
  //   }
  // },
  // {
  //   path: '/expertDetail',
  //   name: 'expertDetail',
  //   component: () => import('@/views/classify/subView/expertDetail.vue'),
  //   meta: {
  //     title: '学术专家详情'
  //   }
  // },
  // {
  //   path: '/overviewDetail',
  //   name: 'overviewDetail',
  //   component: () => import('@/views/classify/subView/overviewDetail.vue'),
  //   meta: {
  //     title: '学术综述详情'
  //   }
  // },
  // {
  //   path: '/profileEdit',
  //   name: 'profileEdit',
  //   component: () => import('@/views/my/subViews/profileEdit.vue'),
  //   meta: {
  //     title: '个人资料'
  //   }
  // },
  // {
  //   path: '/history',
  //   name: 'history',
  //   component: () => import('@/views/my/subViews/history.vue'),
  //   meta: {
  //     title: '浏览记录'
  //   }
  // },
  // {
  //   path: '/advice',
  //   name: 'advice',
  //   component: () => import('@/views/my/subViews/advice.vue'),
  //   meta: {
  //     title: '意见反馈'
  //   }
  // },
  // {
  //   path: '/document',
  //   name: 'document',
  //   component: () => import('@/views/login/components/UserInfo.vue'),
  //   meta: {
  //     title: '用户手册'
  //   }
  // },
  // {
  //   path: '/pdfPreview/:url',
  //   name: 'pdfPreview',
  //   component: () => import('@/components/PptItem/previewPdf.vue'),
  //   props: true,
  //   meta: {
  //     title: '预览'
  //   }
  // },
  // {
  //   path: '/test',
  //   name: 'test',
  //   component: () => import('@/views/test/index.vue'),
  //   meta: {
  //     title: '测试'
  //   }
  // }
]
