<template>
  <div style="background: #f2f4f5">
    <banner :banners="banners"></banner>
    <div class="middle">
      <div class="fm">
        <div class="rule">
          <i class="iconfont icon-radio"></i>
        </div>
        <p class="p">私人FM</p>
      </div>
      <div class="fm">
        <div class="rule">
          <i class="iconfont icon-calender"></i>
        </div>
        <p class="p">每日歌曲推荐</p>
      </div>
      <div class="fm">
        <div class="rule">
          <i class="iconfont icon-bar-graph"></i>
        </div>
        <p class="p">云音乐热搜榜</p>
      </div>
    </div>
    <div class="lanmu">
      <lan-mu :type="item.type" :name="item.title" :src="item.msg" v-for="(item,index) in lanmu" :key="index"></lan-mu>
    </div>
  </div>
</template>

<script>
  import Banner from './banner'
  import LanMu from './LanMu'
  export default{
      name: 'GeXing',
      data(){
          return {
            lanmu:[
                {
                    title: '推荐歌单',
                    type: 'GeDan',
                    msg: [],
                },
                {
                    title: '独家放送',
                    type: 'other',
                    msg: [],
                },
                {
                    title: '推荐MV',
                    type: 'other',
                    msg: []
                },
                {
                    title: '主播电台',
                    type: 'other',
                    msg: []
                }
            ],
            banners: []
          }
      },

      created(){
          fetch('/api/personalized').then( response => {
              return response.json();
          } ).then( data => {
              this.lanmu[0].msg = data.result
          } );

        fetch('/api/personalized/privatecontent').then( response => {
          return response.json();
        } ).then( data => {
          this.lanmu[1].msg = data.result
        } );

        fetch('/api/personalized/mv').then( response => {
          return response.json();
        } ).then( data => {
          this.lanmu[2].msg = data.result
        } );

        fetch('/api/personalized/djprogram').then( response => {
          return response.json();
        } ).then( data => {
          this.lanmu[3].msg = data.result
        } );

        fetch('/api/banner').then( response => {
          return response.json();
        } ).then( msg => {
          this.banners = msg.banners;
        } );
    },
      components: {
          Banner,
          LanMu
      }
  }
</script>

<style scoped>
  .middle{
    border-bottom: 1px solid #f1f1f1;
  }
  .fm{
    /*width: 52px;*/
    width: 32%;
    text-align: center;
    display: inline-block;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .rule{
    border: 1px solid #e31e10;
    width: 46px;
    height: 46px;
    border-radius: 23px;
    line-height: 46px;
    display: inline-block;
  }
  .iconfont{
    font-size: 30px;
    color: #e31e10;
  }
  .p{
    font-size: 0.1rem !important;
    margin-top: 5px;
  }
  .lanmu{
    margin-top: 1rem;
  }
</style>
