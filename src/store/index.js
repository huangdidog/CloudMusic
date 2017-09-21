import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state:{
      mainPageSelecter: 0,
      listId: 881161724,//歌单列表
      playNow: '',//现在播放的歌曲信息，对象
      playLists: [],//播放列表
      playIndex: 0,//当前播放的播放列表的第几个
      lists:[],//歌单列表（数组，包含歌单内每首歌曲信息（对象））
      geDanMsg: '',//歌单数据
      choosedType: '',//选择的歌单类型
  },
  getters:{

  },
  mutations:{
      pageSelecter(state, item) {
        state.mainPageSelecter = item.index;
      },
      geDan(state, item) {
        state.listId = item.id;
        fetch('/api/playlist/detail?id='+state.listId).then( response => {
          return response.json();
        } ).then( data => {
          state.geDanMsg = data.playlist;
          state.lists = data.playlist.tracks;
        } );
      },
      playMusic(state, item) {
        state.playNow = item;
        if (state.playLists != state.lists) {
          state.playLists = state.lists;
        }
        state.playLists.forEach((music,index) => {
          if (item.id == music.id){
            state.playIndex = index;
            console.log(state.playIndex);
            return
          }
        })

      },
      addPlayLists(state, item) {
        fetch('/api/music/url?id='+item.id).then( response => {
          return response.json();
        } ).then( a => {
          state.playLists.push({music:item, url:a.data[0].url})
        } );
      },
      nextPlay(state){
        state.playIndex++;
        console.log(state.playIndex)
      },
      initLists(state) {
        state.lists = [];
        state.geDanMsg = '';
      },
      chooseType(state,type){
        state.choosedType = type;
      }
  },
})
