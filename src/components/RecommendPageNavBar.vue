<template>
  <div class="box">
    <tab :line-width=2 active-color='#e31e10' v-model="index" bar-active-color="#e31e10">
      <tab-item @on-item-click="selecter(index)" :active-class="choosed" class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index"><router-link class="a" :to='link[index]'>{{item}}</router-link></tab-item>
    </tab>
    <router-view></router-view>
  </div>
</template>

<script>
  import { Tab, TabItem } from 'vux'
  import {mapState} from 'vuex'
  const list = () => ['个性推荐', '歌单', '主播电台', '排行榜'];
  export default{
    name:'RecommendPageNavBar',
    data(){
      return {
        list2: list(),
        index: 0,
        demo2: '美食',
        choosed: 'choosed',
        link: ['/main/recommend/GeXing','/main/recommend/GeDan','/main/recommend/ZhuBoDianTai','/main/recommend/PaiHangBang']
      }
    },
    created(){
      this.index = this.mainPageSelecter;
      console.log('wo'+this.mainPageSelecter);
    },
    beforeUpdate(){
      console.log(1+':'+this.mainPageSelecter)
//      this.index = this.mainPageSelecter;
//      console.log(this.index)
    },
    updated(){
      console.log(2+':'+this.mainPageSelecter)
//      this.index = this.mainPageSelecter;
    },
    computed:{
      ...mapState(['mainPageSelecter']),
    },
    components:{
      Tab,
      TabItem,
    },
    methods:{
      handler(index){
//          console.log(index)
      },
      selecter(index){
        this.$store.commit('pageSelecter',{index:this.index});
      }
    }
  }
</script>

<style scoped>
  .box {
    height: 23.8rem;
    overflow: scroll;
  }
  .choosed a{
    color: #e31e10 !important;
  }
  .a{
    width: 100%;
    height: 100%;
    display: block;
  }
  .bar{
    background: red;
  }
</style>
