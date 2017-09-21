<template>
  <div class="box">
    <x-header :left-options="{backText: ''}" class="tabBar" style="background: #252525">
      <div class="navTitle" slot="left">
        <span style="color: white">歌单</span>
        <span>编辑推荐：{{bianjiTuijian}}</span>
      </div>
    </x-header>
    <div class="musicLists">
      <!--歌单封面-->
      <div class="musicListsCover" >
        <div class="musicListsImg"><img :src="geDanMsg.coverImgUrl" alt=""></div>
        <p class="musicListsTitle">{{geDanMsg?geDanMsg.name:'歌单名'}}</p>
        <div class="musicListsAur"><img :src="geDanMsg?geDanMsg.creator.avatarUrl:''" alt=""></div>
        <p class="musicListsSign">{{geDanMsg?geDanMsg.creator.nickname:'歌单作者'}}  <span>></span></p>
        <ul>
          <li><i class="iconfont icon-collect"></i><p>{{geDanMsg?geDanMsg.subscribedCount:'0'}}</p></li>
          <li><i class="iconfont icon-comment"></i><p>{{geDanMsg?geDanMsg.commentCount:'0'}}</p></li>
          <li><i class="iconfont icon-share"></i><p>{{geDanMsg?geDanMsg.shareCount:'0'}}</p></li>
          <li><i class="iconfont icon-download"></i><p>下载</p></li>
        </ul>
      </div>
      <!--歌单头部-->
      <div class="title">
        <i class="iconfont icon-play1"></i>
        <span>播放全部</span>
        <span class="num">(共{{playlistNum?playlistNum:'0'}}首)</span>
      </div>
      <!--歌单-->
      <ul>
        <li class="lists" v-for="(item,index) in lists" @click="playMusic(item)">
          <div class="listNum">{{index+1}}</div>
          <div class="listMsg">
            <p class="listNameFrom">
              <span class="listName">{{item.name}}</span>
              <span class="listFrom">{{item.tns?'('+item.tns[0]+')':''}}</span>
            </p>
            <!--<router-link to="/MusicPlayer"></router-link>-->
            <span class="listAuther">{{item.ar[0].name}}-{{item.al.name}}</span>
            <i class="iconfont icon-more" @click.stop="showMask(item)"></i>
          </div>
        </li>
      </ul>
    </div>
    <music-operation ref="musicOperation" class="musicOperation" :music="music"></music-operation>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {XHeader} from 'vux'
  import MusicOperation from './MusicOperation'
  export default {
      name: 'GeDanLists',
      data(){
        return {
          playlistNum: '',
          bianjiTuijian: '',
          maskIsShow: false,
          music: ''
        }
      },
      components:{
        XHeader,
        MusicOperation
      },
      computed:{
        ...mapState(['listId', 'geDanMsg', 'lists', 'geDanMsg']),
        bgImage(){
          return this.playNow?this.playNow.al.pic:''
        }
      },
      methods:{
        showMask(item) {
          document.querySelector('.musicOperation').style.display = 'block';
          this.music = item;
        },
        playMusic(item) {
          this.$store.commit('playMusic',item);
//          this.$store.commit('addPlayLists',item);
        }
      },
      created(){

      },
      watch: {
        geDanMsg(){
          this.playlistNum = this.geDanMsg?this.geDanMsg.tracks.length:'';
          this.bianjiTuijian = this.geDanMsg?this.geDanMsg.description:'';
        }
      },
      destroyed() {
          this.$store.commit('initLists');
      }
  }
</script>

<style scoped>
  .box{
    position: relative;
    overflow: hidden;
  }
  .musicLists{
    /*position: absolute;*/
    /*width: 100%;*/
    top: 0;
    height: 24.6rem;
    overflow: scroll;
  }
  .mask{
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba(0,0,0,0.5);
    bottom: 0;
  }
  .title{
    width: 100%;
    height: 2rem;
    border-bottom: 1px solid #ccc;
    line-height: 2rem;
  }
  .icon-play1{
    margin-left: 0.7rem;
    font-size: 1rem;
  }
  span{
    font-size: 0.7rem;
  }
  .num{
    font-size: 0.5rem;
    color: #ccc;
  }
  .lists{
    position: relative;
    height: 3rem;
    line-height: 3rem;
  }
  .listNum{
    width: 3rem;
    height: 3rem;
    position: absolute;
    left: 0;
    top: 0;
    text-align: center;
    font-size: 1rem;
    color: #8a8a8a;
  }
  .listMsg{
    position: absolute;
    left: 3rem;
    height: 3rem;
    top: 0;
    border-bottom: 1px solid #ccc;
    width: 13rem;
  }
  .listMsg span{
    width: 11rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .listNameFrom{
    bottom: 0.5rem;
    font-size: 0.7rem;
    height: 2rem;
    line-height: 2rem;
    width: 11rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .listName{
  }
  .listFrom{
    color: #8a8a8a;
  }
  .listAuther{
    position: absolute;
    top: 0.5rem;
    font-size: 0.5rem;
    color: #8a8a8a;
  }
  .icon-more{
    position: absolute;
    left: 11.5rem;
    font-size: 1.1rem;
    top: 0.2rem;
  }
  .tabBar{
    color: yellow;
    /*background: rgba(0,0,0,0);*/
  }
  .tabBar .navTitle{
    position: relative;
    left: 1.5rem;
  }
  .navTitle span{
    position: absolute;
  }
  .navTitle span:first-of-type{
    top: -0.4rem;
    width: 3rem;
  }
  .navTitle span:last-of-type{
    top: 0.4rem;
    font-size: 0.1rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    width: 10rem;
  }
  .musicOperation{
    position: absolute;
    top: 0;
    display: none;
  }


  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }

  .musicListsCover {
    height: 10rem;
    width: 100%;
    background: #252525;
    position: relative;
  }
  .musicListsImg {
    width: 5rem;
    height: 5rem;
    position: absolute;
    left: 1.5rem;
    top: 1rem;
  }
  .musicListsImg img {
    width: 5rem;
    height: 5rem;
  }
  .musicListsTitle {
    position: absolute;
    left: 7rem;
    top: 1.5rem;
    width: 8rem;
    font-size: 0.8rem;
    color: white;
  }
  .musicListsAur {
    width: 1.5rem;
    height: 1.5rem;
    border: 1px solid white;
    border-radius: 50%;
    position: absolute;
    top: 4rem;
    left: 7rem;
  }
  .musicListsAur img {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
  }
  .musicListsSign {
    width: 6rem;
    position: absolute;
    font-size: 0.4rem;
    top: 4.2rem;
    left: 9rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    color: white;
  }
  .musicListsCover ul {
    position: absolute;
    width: 100%;
    height: 3rem;
    bottom: 0;
    text-align: center;
    color: white;
  }
  .musicListsCover li {
    display: inline-block;
    margin: 0 1rem;
  }
  .musicListsCover li p {
    font-size: 0.5rem;
  }
  .musicListsCover .iconfont {
    font-size: 1.2rem;
  }
</style>
