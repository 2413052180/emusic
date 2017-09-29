import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index/index'

import rangkingList from '@/components/rankingList/rangking-list';
import songList from '@/components/songList/song-list';
import station from '@/components/station/station';
import recommend from '@/components/recommend/recommend';
import music from '@/components/music/music';
import singList from '@/components/singList/sing-list';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index/recommend'
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [
        {
          path: 'rangkingList',
          name: 'rangkingList',
          component: rangkingList
        },
        {
          path: 'recommend',
          name: 'recommend',
          component: recommend
        },
        {
          path: 'station',
          name: 'station',
          component: station
        },
        {
          path: 'songList',
          name: 'songList',
          component: songList
        }
      ]
    },
    {
      path: '/music/:id',
      name: 'music',
      component: music
    },
    {
      path: '/singList/:id',
      name: 'singList',
      component: singList
    }
  ]
})
