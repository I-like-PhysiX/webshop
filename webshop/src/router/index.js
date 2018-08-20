import Vue from 'vue'
import Router from 'vue-router'
import termekek from '@/components/termekek'
import kosar from '@/components/kosar'
import adatok from '@/components/adatok'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
            {
              path: '/',
              component: termekek,
              alias: '/kereses/:search/',
              alias: '/:selected/:sortType/'
            },
           {
              path: '/kosar',
              name: 'kosar',
              component: kosar
           },
           {
              path: '/adatok',
              name: 'adatok',
              component: adatok
           }
         ]
        }
      )
