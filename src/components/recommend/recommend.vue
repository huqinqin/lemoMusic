<template>
  <div class="recomWrap">
    <Scroll :data="discList" ref="scroll">
        <div class="recommend">
          <Slider class="slide"
                  v-if="recommend.length"
                  :autoplay="autoplay"
          >
            <div class="swiper-wrapper">
              <div v-for="item in recommend"  class="itemSlide swiper-slide">
                <a :href="item.linkUrl">
                  <img class="needsclick" :src="item.picUrl" alt="" @load="loadImg">
                </a>
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </Slider>
          <div class="bg" v-if="discList.length">
            <h2 class="title">歌单推荐</h2>
            <div class="wrapper" v-for="itemD in discList">
              <div class="pic">
                <img v-lazy="itemD.cover" alt="">
              </div>
              <div class="right">
                <h3>{{itemD.username}}</h3>
                <p>{{itemD.title}}</p>
              </div>
            </div>
          </div>
        </div>
    </Scroll>
    <div class="loadContain" v-if="!discList.length">
      <Loading></Loading>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
   import {getRecommend,getDiscList} from 'api/recommend.js'
   import {ERR_OK} from 'api/config.js'
   import Slider from 'base/slider/slider.vue'
   import Scroll from 'base/scroll/scroll.vue'
   import Loading from 'base/loading/loading.vue'
  export default{
       data(){
         return {
           recommend:[],
           discList:[]
         }
       },
       created(){
         this._getRecommend();
         setTimeout(()=>{
           this._getDiscList();
         },1000)
         this.autoplay = 1000;
       },
     methods:{
       _getRecommend(){
           getRecommend().then((res)=>{
               if(res.code === ERR_OK){
                  this.recommend = res.data.slider;
               }
           })
       },
       _getDiscList(){
         getDiscList().then((res)=>{
           if(res.code === ERR_OK){
               this.discList = res.recomPlaylist.data.v_hot;
           }
         })
       },
       loadImg(){
           if(!this.checkLoad){
               this.$refs.scroll.refresh();
               this.checkLoad = true
           }
       }
     },
    components:{
      Slider,
      Scroll,
      Loading
    },
   }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .recomWrap
    height 100%
    .slide
      .itemSlide
        height 150px
        width 100%
        img
          width 100%
          height 100%
    .bg
      background-color #333
      padding:20px 20px
      .title
        text-align center
        color #FFB71A
      .wrapper
        width 100%
        display flex
        align-items center
        margin-top 15px
        .pic
          flex:0 0 40px
          img
            width 40px
            height 40px
            vertical-align middle
        .right
          flex 1
          margin-left 20px
          display flex
          flex-direction column
          justify-content center
          h3
            color white
            font-size 12px
          p
            font-size 10px
            margin-top 10px
            color #888

    .loadContain
      position absolute
      width 100%
      top: 50%
      transform translateY(-50%)
</style>
