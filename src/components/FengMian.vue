<template>
  <div class="box" :style="{width : mywidth, margin : mymargin }" @click="click">
    <router-link :to="src">
      <img v-lazy="lists.item.picUrl" class="img">
      <p class="list">
        <span class="listname">{{lists.item.name}}</span>
        <span class="listartist" v-if="lists.item.artistName">{{lists.item.artistName}}</span>
      </p>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'FengMian',
    components: {

    },
    props: ['lists','length','type'],
    methods: {
      click(){
        this.$store.commit('geDan',{id:this.lists.item.id});
      }
    },
    data () {
      return {
          a:'/main'
      }
    },
    computed: {
      mywidth(){
          if (this.length == 6) {
              return '32.5%';
          } else if (this.length == 3) {
              if (this.lists.index == 0 || this.lists.index == 1) {
                return '49.3%'
              } else {
                return '100%'
              }
          } else {
              return '49.3%'
          }
      },
      mymargin(){
          if (this.length == 6){
              if (this.lists.index == 0 || this.lists.index == 3) {
                return '0 0.1rem 1rem 0'
              } else if (this.lists.index == 1 || this.lists.index == 4) {
                return '0 0.1rem 1rem 0.1rem'
              } else {
                return '0 0 1rem 0.1rem'
              }
          } else if (this.length == 4 || this.length == 2){
              if (this.lists.index == 0 || this.lists.index == 2) {
                return '0 0.1rem 1rem 0'
              } else {
                return '0 0 1rem 0.1rem'
              }
          } else if(this.length == 3) {
              if (this.lists.index == 0) {
                return '0 0.1rem 1rem 0'
              } else if (this.lists.index == 1) {
                return '0 0 1rem 0.1rem'
              } else {
                  return '0 0 1rem 0'
              }
          }
      },
      src(){
        if(this.type == 'GeDan'){
          return '/GeDanLists'
        }else {
            return '/main/recommend'
        }
      }
    }
  }
</script>

<style scoped>
  .box{
    float: left;
  }
  .list{
    height: 1.5rem;
  }
  .list span{
    text-align: left;
    font-size: 0.5rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    word-break: break-all;
  }
  .listname{
    margin-top: -0.3rem;
  }
  .listartist{
    color: #9d9d9d;
  }
  img[lazy=loading] {
    background: red;
    margin: auto;
    background: url("../assets/logo.png");
  }
  img[lazy=error] {
    background: yellow;
    margin: auto;
  }
  .img{
    width: 100%;
    height: 5.2rem;
  }
</style>
