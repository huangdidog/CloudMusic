<template>
  <div :style="{'background': 'url(http://music.163.com/api/img/blur/' + bgImage + ') no-repeat'}" class="box">
    <div style="width: 100%;height: 28.4rem;background: rgba(0,0,0,0.4);position: absolute"></div>
    <div class="die">
      <div class="bg-role"></div>
      <div class="move-box">
        <div class="move-img">
          <img :src="playNow?playNow.al.picUrl:''"  alt="">
        </div>
      </div>
    </div>

    <div class="tabBar">
      <div class="left-arrow" @click="comeBack"></div>
      <p class="music">
        <span class="music-name">{{playNow?playNow.name:''}}</span>
        <span class="music-aur">{{playNow?playNow.ar[0].name:''}}</span>
      </p>
    </div>

    <div class="music-msg">
      <ul>
        <li><i class="iconfont icon-heart"></i></li>
        <li><i class="iconfont icon-download"></i></li>
        <li><i class="iconfont icon-comment"></i></li>
        <li><i class="iconfont icon-more"></i></li>
      </ul>
      <div class="time-ctrol">
        <span class="now-time">00:00</span>
        <div class="time-ctrol-role">
          <div class="ctrol-btn"></div>
        </div>
        <span class="all-time">04.43</span>
      </div>
      <div class="play-box">
        <div class="play-mode">
          <i class="iconfont icon-loop-list" v-if="mode == 'list'"></i>
          <i class="iconfont icon-loop-this" v-else-if="mode == 'this'"></i>
          <i class="iconfont icon-random" v-else-if="'random'"></i>
        </div>
        <div class="play-pref">
          <i class="iconfont icon-preMusic"></i>
        </div>
        <div class="play-not">
          <i class="iconfont icon-earphone" v-if="play"></i>
          <i class="iconfont icon-play1" v-else></i>
        </div>
        <div class="play-next">
          <i class="iconfont icon-next"></i>
        </div>
        <div class="play-lists">
          <i class="iconfont icon-play-list"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {XHeader} from 'vux'
  export default {
    name: 'MusicPlayer',
    methods:{
      comeBack(){
//        history.back();
        this.$emit('up','block')
      }
    },
    data() {
        return {
            mode: 'list',
            play: false,
        }
    },
    computed: {
      ...mapState(['playNow']),
      bgImage(){
          return this.playNow?this.playNow.al.pic:''
      }
    },
    created() {
//      fetch('/api/img/blur/'+this.playNow.al.pic).then( response => {
//        return response.json();
//      } ).then( data => {
//        console.log(data);
////        this.playlistNum = data.playlist.tracks.length;
////        this.lists = data.playlist.tracks;
////        this.bianjiTuijian = data.playlist.description;
//      } );
    }
  }
</script>

<style scoped="">
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .box {
    background-size: cover !important;
    position: relative;
    height: 28.4rem;
    background-color: black !important;
  }
  .tabBar {
    width: 100%;
    height: 2.5rem;
    /*background: #000000;*/
    position: absolute;
    top: 0;
    /*border-bottom: 1px solid #dcdcdc;*/

    border-bottom: 1px solid;
    /*border-image: -webkit-linear-gradient( red, blue) 30 30;*/
    /*border-image: -moz-linear-gradient( red, blue) 30 30;*/
    border-image: linear-gradient( to left, rgba(0,0,0,0), rgba(255,255,255,0.7), rgba(0,0,0,0)) 30 30;
  }
  .left-arrow {
    position: absolute;
    width: 2.5rem;
    height: 2.5rem;
  }
  .left-arrow:before {
    content: "";
    position: absolute;
    width: 0.7rem;
    height: 0.7rem;
    border: 1px solid white;
    border-width: 1px 0 0 1px;
    -webkit-transform: rotate(315deg);
    transform: rotate(315deg);
    top: 0.9rem;
    left: 1rem;
  }
  .music {
    position: absolute;
    left: 2.5rem;
    height: 2.5rem;
    width: 13.5rem;
  }
  .music-name {
    position: absolute;
    left: .3rem;
    bottom: 1rem;
    font-size: 0.7rem;
    font-weight: 400;
    color: white;
  }
  .music-aur {
    position: absolute;
    left: 0.3rem;
    top: 1.3rem;
    font-size: 0.6rem;
    font-weight: 300;
    color: #bdbdbd;
  }

  .die {
    /*background: red;*/
    width: 100%;
    height: 19.5rem;
    position: relative;
  }
  .bg-role {
    position: absolute;
    width: 12rem;
    height: 12rem;
    top: 4.8rem;
    left: 2rem;
    background: rgba(255,255,255,0.4);
    border-radius: 6rem;
  }
  .move-box {
    position: absolute;
    width: 11.4rem;
    height: 11.4rem;
    top: 5.1rem;
    left: 2.3rem;
    background: black;
    border-radius: 5.7rem;
  }
  .move-img {
    background: blue;
    width: 8.4rem;
    height: 8.4rem;
    border-radius: 4.2rem;
    margin: 1.5rem auto;
  }
  ul {
    text-align: center;
    margin: 0.7rem 0;
    /*background: red;*/
  }
  li {
    display: inline-block;
    margin: 0 0.5rem;
    color: white;
  }
  .iconfont {
    font-size: 1.3rem;
  }
  .time-ctrol {
    /*background: red;*/
    position: relative;
    height: 1rem;
  }
  .time-ctrol span {
    font-size: 0.5rem;
    color: white;
  }
  .all-time {
    position: absolute;
    top: 0.1rem;
    right: 1rem;
  }
  .now-time {
    position: absolute;
    top: 0.1rem;
    left: 1rem;
  }
  .time-ctrol-role {
    line-height: 2rem;
    width: 10rem;
    height: 0.1rem;
    background: rgba(0,0,0,0.4);
    position: absolute;
    left: 3rem;
    top: 0.5rem;
  }
  .ctrol-btn{
    width: 0.8rem;
    height: 0.8rem;
    background: white;
    border-radius: 0.4rem;
    position: absolute;
    left: 0;
    top: -0.4rem;
  }
  .play-box {
    width: 100%;
    height: 4.4rem;
    /*background: red;*/
    text-align: center;
  }
  .play-box div {
    display: inline-block;
    margin: 0 0.7rem;
    line-height: 4rem;
    color: white;
  }
  .icon-earphone, .icon-play1 {
    font-size: 1.6rem;
  }
  .icon-loop-list, .icon-loop-this, .icon-random, .icon-play-list {
    font-size: 1.2rem;
    color: #dcdcdc;
  }
</style>
