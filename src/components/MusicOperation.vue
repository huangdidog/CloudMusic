<template>
  <div class="box" ref="box">
    <div class="mask" ref="mask"></div>
    <div  ref="listbox" class="listbox">
      <div class="title">
        <span>歌曲:</span>
        <span class="name">{{music?music.name:''}}</span>
      </div>
      <ul>
        <li class="lists">
          <div class="listNum"><i class="iconfont icon-play1"></i></div>
          <div class="listMsg">下一首播放</div>
        </li>
        <li class="lists">
          <div class="listNum"><i class="iconfont icon-collect"></i></div>
          <div class="listMsg">收藏到歌单</div>
        </li>
        <li class="lists">
          <div class="listNum"><i class="iconfont icon-download"></i></div>
          <div class="listMsg">下载</div>
        </li>
        <li class="lists">
          <div class="listNum"><i class="iconfont icon-comment"></i></div>
          <div class="listMsg">评论({{total}})</div>
        </li>
        <li class="lists">
          <div class="listNum"><i class="iconfont icon-member"></i></div>
          <div class="listMsg">歌手：{{music.ar?music.ar[0].name:''}}</div>
        </li>
        <li class="lists">
          <div class="listNum"><i class="iconfont icon-ranking"></i></div>
          <div class="listMsg">专辑：{{music?music.al.name:''}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default{
      name:'MusicOperation',
      props:['music'],
      data(){
        return {
          total : '',
        }
      },
      mounted() {
        let el = this.$refs.listbox;
        let mask = this.$refs.mask;
        let box = this.$refs.box;
        mask.onclick = function () {
            box.style.display = 'none';
        };
        el.addEventListener('touchstart',function (e) {
          let touchY = e.changedTouches[0].pageY;
          let top = el.offsetTop;
          el.addEventListener('touchmove',move);
          function move (e) {
            let nowTouchY = e.changedTouches[0].pageY;
            el.style.top = top + (nowTouchY-touchY) + 'px';
            if (el.offsetTop <= top){
              el.style.top = top+'px';
            }
          };
          el.addEventListener('touchend',end);
          function end (e) {
            let range = e.changedTouches[0].pageY - touchY;
            let a = 10;
            let timer = 0;
            if (range >= el.clientHeight/2){
              clearInterval(timer);
              timer = setInterval(function () {
                el.style.top = el.offsetTop + a + 'px';
                if (el.offsetTop >= document.body.clientHeight) {
                  el.style.top = top + 'px';
                  box.style.display = 'none';
                  clearInterval(timer);
                }
              },20)
            } else if (range < el.clientHeight/2) {
              clearInterval(timer);
              timer = setInterval(function () {
                el.style.top = el.offsetTop - a + 'px';
                if (el.offsetTop <= top) {
                  el.style.top = top + 'px';
                  clearInterval(timer);
                }
              },20)
            }
            el.removeEventListener('touchmove',move);
            el.removeEventListener('touchend',end);
          }
        })
      },
      updated(){
        fetch('/api/comment/music?id='+this.music.id+'&limit=1').then( response => {
          return response.json();
        } ).then( data => {
          this.total = data.total;
        } );
      },
  }
</script>

<style scoped>
  .box{
    width: 100%;
    height: 28.5rem;
    /*position: relative;*/
  }
  .title{
    height: 1.5rem;
    line-height: 1.5rem;
    margin-left: 1rem;
    color: #656565;
    font-size: 0.5rem;
    padding-top: 0.5rem;
  }
  .iconfont{
    color: #e31e10;
    font-size: 0.8rem;
    font-weight: 700;
  }
  span{
    font-size: 0.7rem;
  }
  .name{
    font-size: 0.7rem;
  }
  .lists{
    position: relative;
    height: 2rem;
    line-height: 2rem;
  }
  .listNum{
    width: 2rem;
    height: 2rem;
    position: absolute;
    left: 0;
    top: 0;
    text-align: center;
    font-size: 1rem;
    color: #8a8a8a;
  }
  .listMsg{
    position: absolute;
    left: 2rem;
    height: 2rem;
    font-size: 0.6rem;
    top: 0;
    border-bottom: 1px solid #ccc;
    width: 14rem;
    font-weight: 400;
    line-height: 2rem;
  }
  .mask{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    position: absolute;
    top: 0;
  }
  .listbox{
    width: 100%;
    background: white;
    position: absolute;
    /*top: 0;*/
    bottom: 0;
  }
</style>
