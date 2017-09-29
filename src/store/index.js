/**
 * Created by Administrator on 2017/9/28.
 */
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);
const vuexStore = new Vuex.Store({
  state: {
    isPlay: false,
    song: {
      imgUrl: '',
      name: '',
      songer: ''
    },
    songList: []
  },
  mutations: {

  },
  getters: {
    getIsPlay: state => {
      return state.isPlay;
    },
    getSong (state) {
      return state.song
    },
    getSongList (state) {
      return state.songList;
    }
  }
})

export default vuexStore;
