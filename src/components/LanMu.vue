<template>
  <div>
    <span class="out">
      {{name}}
      <x-icon type="ios-arrow-right" size="23" class="icon"></x-icon>
    </span>
    <div>
      <feng-mian :type="type" :lists="{ item, index}" :length="src.length" v-for="(item,index) in src" :key="index"></feng-mian>
    </div>
  </div>
</template>

<script>
  import FengMian from './FengMian'
  export default{
      name: 'LanMu',
      props: ['name','src', 'type'],
      data(){
          return {

          }
      },
      components: {
        FengMian
      }
  }
</script>

<style scoped>
  .out{
    font-size: 0.7rem;
    border-left: 0.1rem solid #e31e10;
    padding-left: 0.6rem;
    display: inline-block;
    height: 1.2rem;
    width: 10rem;
    line-height: 1.2rem;
    vertical-align: top;
  }
  .icon{
    vertical-align: top;
    fill: #a5a5a5;
  }
</style>
