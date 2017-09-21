import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import RecommendPage from '@/components/RecommendPage'
import GeXing from '@/components/GeXing'
import GeDan from '@/components/GeDanPage'
import ZhuBoDianTai from '@/components/ZhuBoDianTai'
import PaiHangBang from '@/components/PaiHangBang'
import GeDanLists from '@/components/GeDanLists'
import MusicOperation from '@/components/MusicOperation'
import MusicPlayer from '@/components/MusicPlayer'
import ChooseFenLei from '@/components/ChooseFenLei'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage,
      children:[
        {
          path: '/main/recommend',
          name: 'RecommendPage',
          component: RecommendPage,
          children: [
            {
              path: '/main/recommend/GeXing',
              name: 'GeXing',
              component: GeXing
            },
            {
              path: '/main/recommend/GeDan',
              name: 'GeDan',
              component: GeDan
            },
            {
              path: '/main/recommend/ZhuBoDianTai',
              name: 'ZhuBoDianTai',
              component: ZhuBoDianTai
            },
            {
              path: '/main/recommend/PaiHangBang',
              name: 'PaiHangBang',
              component: PaiHangBang
            },
          ]
        },
        {
          path: '/main/ChooseFenLei',
          name: 'ChooseFenLei',
          component: ChooseFenLei,
        }
      ]
    },
    {
      path: '/GeDanLists',
      name: 'GeDanLists',
      component: GeDanLists,
    },
    {
      path: '/MusicPlayer',
      name: 'MusicPlayer',
      component: MusicPlayer,
    }
  ]
})
