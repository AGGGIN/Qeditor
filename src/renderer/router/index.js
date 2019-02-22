import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: require('@/views/index').default
    },
    // {
    //   path: '/',
    //   name: index,
    //   component: require('@/views/project').default
    // },
    {
      path: '/content',
      name: 'index',
      component: require('@/views/content').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
