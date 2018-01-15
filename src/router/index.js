import Vue from 'vue'
import Router from 'vue-router'
import Rank from 'components/rank/rank.vue'
import Singer from 'components/singer/singer.vue'
import Search from 'components/search/search.vue'
import Recommend from 'components/recommend/recommend.vue'
import SingerDetail from 'components/singerDetail/singerDetail.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend',
    },
    {
      path: '/rank',
      component:Rank
    },
    {
      path: '/recommend',
      component:Recommend
    },
    {
      path: '/search',
      component:Search
    },
    {
      path: '/singer',
      component:Singer,
      children: [
        {
          path:':id',
          component:SingerDetail
        }
     ]
    },
    {
      path: '/SingerDetail',
      component:SingerDetail
    }
  ]
})
