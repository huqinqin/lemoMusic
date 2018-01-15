<template>
  <div class="playlist" v-show="playList.length>0">
    <transition name="fullPlayFade"
                @enter="enter"
                @after-enter="afterEnter"
                @leave="leave"
                @after-leave="afterLeave"
    >
       <div class="fullPlay" v-show="fullScreen">
         <div class="background"><img :src="currentSong.image" alt=""></div>
         <div class="playTop">
          <div class="back" @click="back"><i></i></div>
          <div class="rightName">
            <h3 class="songName" v-html="currentSong.name"></h3>
            <p class="singerName" v-html="currentSong.singer"></p>
          </div>
        </div>
         <div class="playMiddle">
          <div class="cdWrapper" ref="cdWrapper">
            <div class="cdPlay" :class="cdcal">
              <img :src="currentSong.image" alt="">
            </div>
          </div>
        </div>
         <div class="playBottom">
           <div class="iconWrapper">
              <div class="playIcon" :class="modeClass" @click="modeChange"></div>
              <div class="playIcon playIconLeft" @click="prev" :class="disableCla"></div>
              <div class="playIcon" :class="[playingIcon,disableCla]" @click.stop="togglePlaying"></div>
              <div class="playIcon playIconRight" @click="next" :class="disableCla"></div>
              <div class="playIcon playIconLove"></div>
           </div>
         </div>
         <div class="processWrapper">
           <div class="processBox">
             <div class="currentTime">{{time}}</div>
             <div class="processBar">
               <Process :percent="percent"  ref="process" @progressChange="progressChange"></Process>
             </div>
             <div class="songTotalTime">{{format(currentSong.duration)}}</div>
           </div>
         </div>
      </div>
    </transition>
    <transition name="miniPlayFade">
       <div class="miniPlay" v-show="!fullScreen" @click="open">
        <div class="singerNameIcon" :class="cdcal">
          <img :src="currentSong.image" alt="">
        </div>
        <div class="songInfo">
          <h3>{{currentSong.name}}</h3>
          <p>{{currentSong.singer}}</p>
        </div>
        <div class="miniIcon">
          <Circles :radius="radius" :precent="percent">
            <div class="minicommon circles" :class="miniPlaying" @click.stop="togglePlaying"></div>
          </Circles>
          <div class="minicommon mode" :class="modeClass" @click="modeChange"></div>
        </div>
      </div>
    </transition>
    <audio :src="currentSong.url" ref="audio" @canplay="ready" @error="error" @timeupdate="currentSongTime"></audio>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters,mapMutations} from 'vuex'
  import animations from 'create-keyframe-animation'
  import {prefix} from 'common/js/getData.js'
  import Process from 'base/progress/progress'
  import Circles from 'base/circle/circle'
  import {mode} from 'base/config/config'
  import {shuffle} from 'api/util'
  const transform = prefix('transform');
   export default{
      data(){
           return{
               songReady:false,
               time : "00:00",
               currentSongTimeNow:0
           }
       },
      computed:{
        modeClass(){
              return this.mode === mode.sequence ? "sequence": this.mode=== mode.random?"random":"loop"
          },
        percent(){
            return this.currentSongTimeNow/this.currentSong.duration
        },
        ...mapGetters([
          "fullScreen",
          "playList",
          "currentSong",
          "playing",
          "currentIndex",
          "mode",
          "sequenceList"
        ]),
        disableCla(){
            return this.songReady?'':'disable'
       },
        playingIcon(){
            return this.playing? 'playIconing':'playPause'
       },
        miniPlaying(){
           return this.playing? 'miniPlaying':'miniPlayPause'
       },
        cdcal(){
         return this.playing? 'play':'play pause'
       }
      },
     methods:{
       modeChange(){
           const modeScore = (this.mode + 1)%3;
           this.setMode(modeScore);
           let list = null;
           if(this.mode === mode.random){
             list = shuffle(this.sequenceList);
           }else {
             list = this.sequenceList
           }
           this.setPlayList(list);
           this.resetCurrentIndex(list);
       },
       resetCurrentIndex(list){
           let index = list.findIndex((item)=>{
               return item.id === this.currentSong.id
           });
         this.setCurrentIndex(index);
       },
       progressChange(precent){
           this.$refs.audio.currentTime = precent * this.currentSong.duration;
           if(!this.playing){
               this.togglePlaying();
           }
       },
       ...mapMutations({
         setFullscreen:"SET_FULLSCREEN",
         setPlayingState:"SET_PLAYING_STATE",
         setCurrentIndex:"SET_CURRENT_INDEX",
         setMode:"SET_MODE",
         setPlayList:"SET_PLAY_LIST"
       }),
       togglePlaying(){
         this.setPlayingState(!this.playing);
       },
       currentSongTime(e){
         this.time = this.format(e.target.currentTime);
         this.currentSongTimeNow = e.target.currentTime;
       },
       format(interval){
           interval = interval|0;
           let mins = this._pad(interval/60 | 0);
           let seconds = this._pad(interval%60);
           return `${mins}:${seconds}`
       },
       _pad(num, n=2){
         let len = num.toString().length
         while(len < n){
             num = "0"+ num;
             len++
         }
         return num;
       },
       ready(){
           this.songReady = true;
       },
       error(){
           this.songReady = true;
       },
       prev(){
           if(!this.songReady){
               return
           }
         let index = this.currentIndex - 1;
         if(index === -1){
           index = this.playList.length - 1;
         }
           this.setCurrentIndex(index);
         if(!this.playing){
           this.togglePlaying();
         }
         this.songReady = false;
       },
       next(){
          if(!this.songReady){return}
         let index = this.currentIndex + 1;
         if(index ===  this.playList.length ){
             index = 0
         }
         this.setCurrentIndex(index);
         if(!this.playing){
             this.togglePlaying();
         }
         this.songReady = false;
       },
       back(){
           this.setFullscreen(false);
       },
       open(){
         this.setFullscreen(true);
       },
       _getPosAndScale(){
           let paddingLeft = 30;
           let imgWidth = 40;
           let bigImgWidth = window.innerWidth * 0.8;
           let bottom = 10;
           let x = -(window.innerWidth/2 - paddingLeft - imgWidth/2);
           let y = window.innerHeight - 80 - bigImgWidth/2 - imgWidth/2 - bottom;
           let scale = imgWidth/bigImgWidth;
           return {x,y,scale}
       },
       enter(el, done) {
         const {x, y, scale} = this._getPosAndScale()

         let animation = {
           0: {
             transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
           },
           60: {
             transform: `translate3d(0,0,0) scale(1.1)`
           },
           100: {
             transform: `translate3d(0,0,0) scale(1)`
           }
         }

         animations.registerAnimation({
           name: 'move',
           animation,
           presets: {
             duration: 400,
             easing: 'linear'
           }
         })

         animations.runAnimation(this.$refs.cdWrapper, 'move', done)
       },
       afterEnter(){
         animations.unregisterAnimation('move')
         this.$refs.cdWrapper.style.animation = ''
       },
       leave(el,done){
         this.$refs.cdWrapper.style.transition = 'all 0.4s'
         const {x, y, scale} = this._getPosAndScale()
         this.$refs.cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`
         this.$refs.cdWrapper.addEventListener('transitionend', done)
       },
       afterLeave(){
         this.$refs.cdWrapper.style.transition = ''
         this.$refs.cdWrapper.style[transform] = ''
       }
     },
     watch:{
       currentSong(newSong,oldSong){
           if(newSong.id === oldSong.id){return}
           this.$nextTick(()=>{
               this.$refs.audio.play();
           })
       },
       playing(newPlaying){
           const audio = this.$refs.audio;
           this.$nextTick(()=>{
             newPlaying? audio.play():audio.pause();
           })

       }
     },
     components:{
       Process,
       Circles
     },
     created(){
          this.radius = 32;
     }
   }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .playlist
    .fullPlay
      position fixed
      bottom 0
      left 0
      right 0
      top 0
      z-index 10000
      box-sizing border-box
      background-color #c57777
      height 100%
      .background
        position absolute
        top 0
        left 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
        img
          width 100%
          height 100%
      .playTop
        width 100%
        display flex
        align-items center
        .back
          flex 0 0 30px
          i
            display inline-block
            width 30px
            height 30px
            background url("../../common/img/xiamian.png") no-repeat;
            background-size 30px 30px
        .rightName
          flex 1
          color white
          .songName
            margin-top 10px
            text-align center
          .singerName
            margin-top 10px
            text-align center
      .playMiddle
        position: fixed
        width: 100%
        top: 80px
        bottom: 170px
        white-space: nowrap
        font-size: 0
        padding-top 80%
        height:0
        .cdWrapper
          position: absolute
          left: 10%
          top: 0
          width: 80%
          height: 100%
          .cdPlay
            box-sizing border-box
            width 100%
            height 100%
            border 10px solid rgba(255,255,255,0.1)
            border-radius 50%
            &.play
             animation rotate 20s linear infinite
            &.pause
              animation-play-state paused
            img
                border-radius: 50%;
                width: 100%;
                height: 100%;
      .playBottom
        position absolute
        bottom 50px
        width 100%
        display flex
        justify-content center
        .iconWrapper
         display flex
         align-items center
         width 80%
         .playIcon
           flex 1
           width 30px
           height 30px
           &.sequence
             margin-left 10px
             background url("../../common/img/mode.png") no-repeat
             background-size 30px 30px
           &.random
             margin-left 10px
             background url("../../common/img/random.png") no-repeat
             background-size 30px 30px
           &.loop
             margin-left 10px
             background url("../../common/img/loop.png") no-repeat
             background-size 30px 30px
           &.playIconLeft
             background url("../../common/img/preSong.png") no-repeat
             background-size 30px 30px
           &.playIconing
             background url("../../common/img/pause.png") no-repeat
             background-size 30px 30px
           &.playPause
             background url("../../common/img/bofang.png") no-repeat
             background-size 30px 30px
           &.playIconRight
             background url("../../common/img/next.png") no-repeat
             background-size 30px 30px
           &.playIconLove
             background url("../../common/img/love.png") no-repeat
             background-size 30px 30px
      .processWrapper
        width 100%
        justify-content center
        display flex
        align-items center
        position: fixed;
        bottom: 100px;
        .processBox
          display flex
          width 80%
          align-items center
          justify-content: center;
          .currentTime
            flex 0 0 30px
          .processBar
            flex 1
            display: flex;
            justify-content: center;
          .songTotalTime
            flex:0 0 30px
      &.fullPlayFade-enter-active,&.fullPlayFade-leave-active
        transition all 0.4s
        .playTop,.playBottom
          transition all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.fullPlayFade-enter,&.fullPlayFade-leave-to
        opacity 0
        .playTop
          transform translate3d(0,-100px,0)
        .playBottom
          transform translate3d(0,100px ,0)
    .miniPlay
      display flex
      align-items center
      position fixed
      bottom 0
      left:0
      z-index 10000
      width 100%
      padding 0 30px 0 30px
      box-sizing border-box
      height 60px
      background-color: #885555
      .singerNameIcon
        flex 0 0 40
        width 40px
        height 40px
        border-radius 50%
        background-color #c57777
        &.play
          animation rotate 20s linear infinite
        &.pause
          animation-play-state paused
        img
          width 100%
          height 100%
          border-radius 50%
      .songInfo
        flex 1
        margin-left 10px
        h3
          color white
        p
          color #333
      .miniIcon
        flex 1
        display flex
        align-items right
        justify-content flex-end
        .minicommon
          width 30px
          height 30px
          &.circles
           position absolute
           top 1px
           left 1px
          &.miniPlaying
           background url("../../common/img/pause.png") no-repeat
           background-size 30px 30px
          &.miniPlayPause
           background url("../../common/img/bofang.png") no-repeat
           background-size 30px 30px
          &.sequence
            margin-left 10px
            background url("../../common/img/mode.png") no-repeat
            background-size 30px 30px
          &.random
            margin-left 10px
            background url("../../common/img/random.png") no-repeat
            background-size 30px 30px
          &.loop
            margin-left 10px
            background url("../../common/img/loop.png") no-repeat
            background-size 30px 30px
  @keyframes rotate
    0%
      transform rotate(0deg)
    100%
      transform rotate(360deg)
</style>
