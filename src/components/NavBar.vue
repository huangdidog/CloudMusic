<template>
  <div class="box">
    <x-header class="x-header">
      <span class="title">
        <ul>
          <li><router-link to="/main/ChooseFenLei"><i class="iconfont icon-music"></i></router-link></li>
          <li @click="selecter(0)"><router-link to="/main/recommend/GeXing"><i class="iconfont icon-ntes-music"></i></router-link></li>
          <li><router-link to="/c"><i class="iconfont icon-friends"></i></router-link></li>
        </ul>
      </span>

      <x-icon slot="overwrite-left" type="navicon" size="35" style="fill:#fff;position:relative;top:-5px;left:-13px;"></x-icon>

      <span slot="right"><router-link to="/search"><i class="iconfont icon-search"></i></router-link></span>
    </x-header>
  </div>
</template>

<script>
  import { XHeader } from 'vux'
  export default{
      name:'NavBar',
      data(){
          return {

          }
      },
      components:{
        XHeader,
      },
      methods:{
        selecter(index){
          this.$store.commit('pageSelecter',{index:index});
        }
      }
  }
</script>

<style scoped>
  ul{
    position:relative;
    top:4px;
  }
  i{
    font-size: 24px;
    color: white;
  }
  .icon-ntes-music{
    font-size: 28px !important;
  }
  .icon-friends{
    font-size: 26px !important;
  }
  .icon-search{
    font-size: 28px !important;
  }
  li{
    display: inline-block;
    margin-right: 15px;
  }
  .x-header{
    background: #e31e10;
    height: 50px;
  }
  .title{
    width: 100%;
  }
</style>
