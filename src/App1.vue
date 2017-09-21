<template>
  <div id="app">
    <router-view></router-view>
    <!--<div class="play" @click="closed" v-show="bottomshow">-->
      <!--<img :src="playNow?playNow.al.picUrl:''"  alt="" class="play-img">-->
      <!--<p class="play-name">{{playNow?playNow.name:''}}</p>-->
      <!--<div class="played" @click.stop="aaa">-->
        <!--<i class="iconfont icon-earphone" v-if="play"></i>-->
        <!--<i class="iconfont icon-play1" v-else></i>-->
      <!--</div>-->
      <!--<div class="played-lists">-->
        <!--<i class="iconfont icon-play-list"></i>-->
      <!--</div>-->
    <!--</div>-->
    <transition name="fade">
      <music-player class="my-player" v-show="playershow" @up='get'></music-player>
    </transition>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import MusicPlayer from './components/MusicPlayer'
export default {
  name: 'app',
  components: {
    MusicPlayer
  },
  computed:{
    ...mapState(['playNow'])
  },
  data() {
      return {
        play: false,
        bottomshow: true,
        playershow: false
    }
  },
  methods: {
      closed() {
          this.bottomshow = !this.bottomshow;
          this.playershow = !this.playershow;
      },
      get(msg) {
          console.log(msg);
          if (msg == 'block'){
            this.bottomshow = !this.bottomshow;
            this.playershow = !this.playershow;
          }
      },
    aaa(){
          console.log(123123)
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
  #app {
    position: relative;
  }
  .play {
    position: absolute;
    top: 26.3rem;
    background: white;
    width:100%;
    height: 2rem;
    display: block;
  }
  .play-img {
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    top: 0.25rem;
    left: 0.25rem;
  }
  .play-name {
    font-size: 0.6rem;
    position: absolute;
    left: 2.3rem;
    top: 0.5rem;
  }
  .played {
    position: absolute;
    right: 3rem;
  }
  .played-lists {
    position: absolute;
    right: 1rem;
  }
  .play .iconfont {
    font-size: 1.3rem !important;
  }
  .my-player {
    position: absolute !important;
    top: 0;
    width: 100%;
  }

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}
</style>
