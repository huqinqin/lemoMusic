import * as types from './mutation-types'
const mutations = {
  [types.SET_SINGER](state,singer){
    state.singer = singer
  },
  [types.SET_FULLSCREEN](state,flag){
    state.fullScreen = flag
  },
  [types.SET_PLAY_LIST](state,list){
    state.playList = list;
  },
  [types.SET_SEQUENCE_LIST](state,list){
    state.sequenceList = list;
  },
  [types.SET_MODE](state,mode){
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX](state,index){
    state.currentIndex = index
  },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },
};
export default mutations

