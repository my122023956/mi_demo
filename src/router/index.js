import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index'
import detail from '../components/detail'
import cart from '../components/cart'
import myhome from '../components/myhome'
import search from '../components/search'
import login from '../components/login'
import category from '../components/category'
import city from '../components/city'
import address from '../components/address'
import order from '../components/order'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: index,
    },
    {
      name:'miindex',
      path: '/index/:id',
      component: index,
    },
    {
      path: '/detail/:id',
      component: detail
    },
    {
      path:'/cart',
      component:cart
    },{
      path:'/myhome',
      component:myhome
    },
    {
      path:'/search',
      component:search
    },
    {
      path:'/login',
      component:login
    },
    {
      path:'/category',
      component:category
    },
    {
      path:'/city',
      component:city
    },
    {
      path:'/address',
      component:address
    },
    {
      path:'/order',
      component:order
    }

  ]
})
