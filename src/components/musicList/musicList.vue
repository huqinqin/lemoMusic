<template>
  <div class="singerDetail">
    <div class="backIcon" @click="back">
      <img src="../../common/img/back.png" alt="" width="40" height="40" >
    </div>
    <div class="singerName">{{singer.name}}</div>
    <div class="bgImg" :style="bgStyle" ref="bgImage">
      <div class="playRandom" ref="playRandom">
        <i class="iconPlay"></i><span class="iconWord">随机播放</span>
      </div>
    </div>
    <div class="bglayer" ref="bglayer"></div>
    <Scroll ref="list" class="list" :probeType="probeType" :listenScroll="listenScroll" @scroll="jumpUp">
      <SongList :songs="songs" @selectItem="selectItem"></SongList>
    </Scroll>
  </div>
</template>
<script type="text/ecmascript-6">
  import SongList from 'base/songList/songList'
  import Scroll from 'base/scroll/scroll'
  import {prefix} from 'common/js/getData'
  import {mapActions} from 'vuex'
  const transform = prefix('transform');
  const RESAVE_HEIGHT = 40;
   export default{
      data(){
          return {
              scrollY:0
          }
      },
       props:{
           singer:{
               type:Object,
               default:{}
           },
         bgImage:{
               type:String,
               default:""
         },
         songs:{
               type:Array,
               defalut:null
         }
       },
       computed:{
         bgStyle(){
             return `background-image:url(${this.bgImage})`
         }
       },
     components:{
       SongList,
       Scroll
     },
     mounted(){
          this.imgHeight = this.$refs.bgImage.clientHeight;
          this.maxHeight = -this.imgHeight + RESAVE_HEIGHT;
          this.$refs.list.$el.style.top = `${this.imgHeight}px`
     },
     created(){
         this.probeType = 3;
         this.listenScroll = true
     },
     methods:{
         jumpUp(pos){
           this.scrollY = pos.y;
         },
         back(){
             this.$router.push('/singer')
       },
         selectItem(item,index){
            this.selectPlay({
              list:this.songs,
              index:index
            })
         },
       ...mapActions([
           'selectPlay'
       ])
     },
     watch:{
         scrollY(newY){
             let translateY = Math.max(this.maxHeight,newY);
             let zIndex  = 0;
             let percent = newY/this.imgHeight;
             if (newY>0){
               this.$refs.bgImage.style[transform] = `scale(${(1+percent)})`
             }
             this.$refs.bglayer.style[transform] =  `translate3d(0,${translateY}px,0)`
             if(this.maxHeight > newY){
                 this.$refs.bgImage.style.paddingTop = 0;
                 this.$refs.bgImage.style.height = `${RESAVE_HEIGHT}px`
                 this.$refs.playRandom.style.display = 'none'
                 zIndex = 10;
             }else{
               this.$refs.bgImage.style.paddingTop = '70%';
               this.$refs.bgImage.style.height = 0
               this.$refs.playRandom.style.display = ''
             }
           this.$refs.bgImage.style.zIndex = zIndex;
         }
     }
   }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .singerDetail
    position fixed
    top 0
    bottom:0
    left 0
    right:0
    z-index 10000
    background-color: #c57777
    .backIcon
      width 100%
      position absolute
      z-index 100
      display: flex
      align-items: center
      color: white
    .singerName
      position: fixed;
      width: 100%;
      text-align: center;
      color: #efe5e5;
      height: 40px;
      line-height: 40px;
      font-size: 18px
      z-index: 11;
    .bgImg
      position relative
      padding-top 70%
      width 100%
      height 0
      background-color: #333
      background-size cover
      transform-origin top
      justify-content: center;
      display: flex;
      .playRandom
        position absolute
        bottom 20px
        z-index 50
        border 1px solid #35c514
        width 200px
        border-radius 24px
        height 30px
        line-height:30px
        display flex
        align-items center
        justify-content: center;
        .iconPlay
          display inline-block
          width 20px
          height 20px
          vertical-align middle
          background-image url("../../common/img/play.png");
          background-size 20px 20px
        .iconWord
          color  #35c514
          margin-left 10px
    .bglayer
      position relative
      height 100%
      background-color #c57777
    .list
      position fixed
      top 0
      bottom:0
      width 100%
      background-color: #c57777
</style>
