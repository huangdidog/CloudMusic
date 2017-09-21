<template>
  <div class="box">
    <checker
      style="text-align: center; font-size: 0.8rem"
      v-model="fengeChoosed"
      default-item-class="demo5-item"
      selected-item-class="demo5-item-selected"
    >
      <div class="mixBox">
        <checker-item :value="'全部歌单'" style="width: 90%;height: 2rem;line-height: 2rem; margin: 0 auto">全部歌单</checker-item>
      </div>
      <div class="minBox">
        <div class="type" style="float: left">语种</div>
        <checker-item v-for="(item,index) in yuzhong" :key="index" :value="item" class="checkedBox" style="float: left">{{item}}</checker-item>
      </div>
      <div class="minBox">
        <div class="type" style="float: left">风格</div>
        <checker-item v-for="(item,index) in fengge" :key="index" :value="item" class="checkedBox" style="float: left">{{item}}</checker-item>
      </div>
      <div class="minBox">
        <div class="type" style="float: left">场景</div>
        <checker-item v-for="(item,index) in changjing" :key="index" :value="item" class="checkedBox" style="float: left">{{item}}</checker-item>
      </div>
      <div class="minBox">
        <div class="type" style="float: left">情感</div>
        <checker-item v-for="(item,index) in qinggan" :key="index" :value="item" class="checkedBox" style="float: left">{{item}}</checker-item>
      </div>
      <div class="minBox">
        <div class="type" style="float: left">主题</div>
        <checker-item v-for="(item,index) in zhuti" :key="index" :value="item" class="checkedBox" style="float: left">{{item}}</checker-item>
      </div>
    </checker>
  </div>
</template>

<script>
  import { Checker, CheckerItem } from 'vux'
  import {mapState} from 'vuex'
  export default {
    name: 'ChooseFenLei',
    components: {
      Checker,
      CheckerItem
    },
    data() {
        return {
          fengeChoosed: '全部歌单',
          yuzhong: ['华语', '欧美', '日语', '韩语', '粤语', '小语种'],
          fengge: ['流行', '摇滚', '民谣', '电子', '舞曲', '说唱', '轻音乐', '爵士', '乡村', 'R&B/Soul', '古典', '民族', '英伦', '金属', '朋克', '蓝调', '雷鬼', '世界音乐', '拉丁', '另类/独特', 'New Age', '古风', '后摇', 'Bossa Nova'],
          changjing: ['清晨', '夜晚', '学习', '工作', '午休', '下午茶', '地铁', '驾车', '运动', '旅行', '散步', '酒吧'],
          qinggan: ['怀旧', '清新', '浪漫', '性感', '伤感', '治愈', '放松', '孤独', '感动', '兴奋', '快乐', '安静', '思念'],
          zhuti: ['影视原声', 'ACG', '校园', '游戏', '70后', '80后', '90后', '网络歌曲', 'KTV', '经典', '翻唱', '吉他', '钢琴', '器乐', '儿童', '榜单', '00后'],
        }
    },
    watch: {
      fengeChoosed (newValue) {
          this.$store.commit('chooseType',newValue)
      }
    },
    computed: {
      ...mapState(['choosedType'])
    },
    created() {
        this.fengeChoosed = this.choosedType;
    }
  }
</script>

<style scoped="">
  .box {
    background: #f2f4f5;
    width: 100%;
    height: 23.5rem;
    overflow: scroll;
  }
  .demo5-item {
    width: 100px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    /*border-radius: 3px;*/
    border: 1px solid white;
    background-color: #fff;
    margin-right: 6px;
  }
  .demo5-item-selected {
    background: #ffffff url(../assets/choosed.png) no-repeat right bottom;
    border: 1px solid #ff4a00 !important;
    /*border-color: #ff4a00;*/
  }
  .mixBox {
    width: 100%;
    height: 2.5rem;
    margin-bottom: 0.5rem;
    background: white;
    line-height: 2.5rem;
  }
  .minBox {
    margin-bottom: 0.5rem;
    font-size: 0.7rem;
    /*height: 3.82rem;*/
    clear: left;
    overflow: hidden;
  }
  .type {
    width: 3.9rem;
    height: 3.82rem;
    text-align: center;
    line-height: 3.82rem;
    display: inline-block;
    background: white;
    margin: 1px;
  }
  .checkedBox {
    width: 3.8rem;
    height: 1.761rem;
    line-height: 1.75rem;
    text-align: center;
    margin: 1px;
    display: block !important;
  }
</style>
