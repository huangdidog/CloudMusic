<template>
  <div id="app">
    <router-view></router-view>
    <music-player class="my-player"></music-player>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import MusicPlayer from './components/MusicPlayer'
export default {
  name: 'app',
  components: {
    MusicPlayer
  },
  computed:{
    ...mapState(['playNow'])
  },
  data() {
      return {
        play: false,
    }
  },
  methods: {

  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
  #app {
    position: relative;
  }
  a {
    color: black;
  }
</style>
