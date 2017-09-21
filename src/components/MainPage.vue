<template>
  <div>
    <nav-bar></nav-bar>
    <router-view></router-view>
    <!--abc-->
  </div>
</template>

<script>
  import NavBar from './NavBar'
  export default {
      name: 'MainPage',
      components:{
          NavBar
      }
  }
</script>

<style>

</style>
