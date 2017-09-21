<template>
  <div class="box">
    <swiper :show-desc-mask="false" loop auto :list="demo06_list" :index="index" @on-index-change="demo06_onIndexChange" dots-position="center" dots-class="dot"></swiper>
    <p :style="{background : titlecolor[index]}">{{text[index]}}</p>
  </div>
</template>

<script>
  import { Swiper } from 'vux'

  export default{
      name: 'Banner',
      components: {
          Swiper
      },
      props: ['banners'],
      data(){
          return {
            index: 0,
            color: [],
          }
      },
      computed: {
        demo06_list(){
            let a = this.banners.map((item, index) => ({
                url: '',
                img: item.pic,
            }));
          return a;
        },
        text(){
          let arr = [];
          this.banners.forEach(item => {
              arr.push(item.typeTitle);
          });
          return arr;
        },
        titlecolor(){
          let arr = [];
          this.banners.forEach(item => {
            arr.push(item.titleColor);
          });
          return arr;
        }
      },
      methods: {
        demo06_onIndexChange (index) {
          this.index = index
        },
      }
  }
</script>

<style scoped>
  .vux-icon-dot .active .dot{
    background: #e31e10 !important;
  }
  .box{
    position: relative;
  }
  p{
    position: absolute;
    bottom: 0.2rem;
    right: 0;
    color: white;
    font-size: 0.5rem;
    height: 1rem;
    padding: 0.1rem 0.3rem 0.1rem 0.8rem;
    border-radius: 0.6rem 0 0 0.6rem;
    line-height: 1rem;
    opacity: 0.5;
  }
</style>
