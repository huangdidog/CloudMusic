<template>
  <div>
    <audio id="audio" width="100" height="200" ref="audio" :src="audioSrc" type="audio/mpeg"></audio>
    <transition name="fade">
      <div class="play" @click="closed" v-show="isShow">
        <img :src="playNow?playNow.al.picUrl:''"  alt="" class="play-img">
        <p class="play-name">{{playNow?playNow.name:''}}</p>
        <div class="played" @click.stop="aaa">
          <i class="iconfont icon-earphone" v-if="play"></i>
          <i class="iconfont icon-play1" v-else></i>
        </div>
        <div class="played-lists">
          <i class="iconfont icon-play-list"></i>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div :style="{'background': 'url(http://music.163.com/api/img/blur/' + bgImage + ') no-repeat'}" class="box" v-show="!isShow">
        <!--<span style="color: white;">{{playLists?playLists[0].url:''}}</span>-->
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
            <span class="all-time">{{timeLength}}</span>
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
            <div class="play-not" @click="playornot">
              <i class="iconfont icon-earphone" v-if="play"></i>
              <i class="iconfont icon-play1" v-else></i>
            </div>
            <div class="play-next" @click="playNext">
              <i class="iconfont icon-next"></i>
            </div>
            <div class="play-lists">
              <i class="iconfont icon-play-list"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>

  </div>

</template>

<script>
  import {mapState} from 'vuex'
  import {XHeader} from 'vux'
  import Radio from "../../node_modules/vux/src/components/radio/index";
  export default {
    components: {Radio},
    name: 'MusicPlayer',
    methods:{
      comeBack(){
//        history.back();
        this.isShow = !this.isShow;
      },
      closed(){
          this.isShow = !this.isShow;
      },
      aaa(){

      },
      playornot(){
        if(this.$refs.audio.paused){
          this.$refs.audio.play();
          this.play = !this.play;
        } else {
          this.$refs.audio.pause();
          this.play = !this.play;
        }
      },
      playNext(){
        this.$store.commit('nextPlay');
      }
    },
    data() {
        return {
            mode: 'list',
            play: false,
            isShow: true,
            timeLength: '',
            audioSrc: '',
        }
    },
    computed: {
      ...mapState(['playNow', 'playLists', 'playIndex']),
      bgImage(){
          return this.playNow?this.playNow.al.pic:''
      }
    },
    created() {

    },
    updated() {
      this.timeLength = timeChange(Math.ceil(this.$refs.audio.duration));
    },
    mounted() {

    },
    watch: {
        playIndex() {
           fetch('/api/music/url?id='+this.playLists[this.playIndex].id).then( response => {
             return response.json();
           } ).then( a => {
             console.log(a.data[0].url);
             this.audioSrc = a.data[0].url;
             this.$refs.audio.play();
             this.play = !this.play;
           } );
        },
        playLists() {
          fetch('/api/music/url?id='+this.playLists[this.playIndex].id).then( response => {
            return response.json();
          } ).then( a => {
            console.log(a.data[0].url);
            this.audioSrc = a.data[0].url;
            this.$refs.audio.play();
            this.play = !this.play;
          } );
        }
    }
  }
  function timeChange(s) {
    let t = '';
    if(s > -1){
      let hour = Math.floor(s/3600);
      let min = Math.floor(s/60) % 60;
      let sec = s % 60;
      if(hour < 10 && hour >0) {
        t = '0'+ hour + ":";
      } else {
        t = '';
      }

      if(min < 10){t += "0";}
      t += min + ":";
      if(sec < 10){t += "0";}
      t += sec;
    }
    return t;
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
    position: absolute;
    top: 0;

    border-bottom: 1px solid;
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

  .music-msg {
    position: relative;
    z-index: 9999;
  }

  .music-msg .icon-loop-list, .icon-loop-this, .icon-random, .icon-play-list {
    font-size: 1.2rem;
    color: #dcdcdc;
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
  .played-lists .icon-play-list {
    color: black !important;
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
