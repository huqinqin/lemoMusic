/**
 * Created by wl on 2017/12/21.
 */
import {mode} from 'base/config/config.js'
const state = {
  singer:{},
  playing:false,
  fullScreen:false,
  playList:[],
  sequenceList:[],
  mode: mode.sequence,
  currentIndex:-1
};
export default state
