import Vue from 'vue'
import Router from 'vue-router'

const TheContainer = () => import('@/containers/TheContainer')
const Dashboard = () => import('@/views/Dashboard')
const Login = () => import('@/views/Login')


Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

function configRoutes () {
  return [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: TheContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
      ] 
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
  ]
}

