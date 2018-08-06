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
              path: '/:pageNumber',
              name: 'fooldal',
              component: termekek
            },
            {
              path: '/kereses/:search/:pageNumber',
              name: 'kereses',
              component: termekek
           },
           {
              path: '/:selected/:sortType/:pageNumber',
              name: 'kategoria',
              component: termekek
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
