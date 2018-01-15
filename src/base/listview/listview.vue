<template>
  <Scroll :data="data" ref="listScroll" @scroll="listScroll" :listenScroll="listenScroll" :probeType="probeType">
    <div class="singer">
      <div class="singerWrapper" v-for="item in data" ref="listGroup">
        <div class="titleNav">{{item.title}}</div>
        <ul class="content">
          <li class="contentItem" v-for="itemInner in item.items" @click="selectItem(itemInner)">
            <div class="singerPic">
              <img v-lazy="itemInner.avatar" alt="" width="50" height="50">
            </div>
            <p class="name">{{itemInner.name}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="listRight" @touchstart.stop.prevent="onshortcutstart" @touchmove.stop.prevent="onshortcutmove">
      <ul class="listNav">
        <li v-for="(itemNav,index) in shortcutList"  class="word" :data-index = index :class="{'active':currentIndex === index}">{{itemNav}}</li>
      </ul>
    </div>
    <div class="fixTop" ref="fixed" v-show="fixTitle">
      <div class="fixItem">{{fixTitle}}</div>
    </div>
  </Scroll>
</template>
<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll.vue'
  import {getData} from 'common/js/getData.js'
  const TITLE_HEIGHT = 40;
  export default{
    created(){
      this.probeType = 3;
      this.touch = {};
      this.listenScroll = true;
      this.listHeight = []
    } ,
    data(){
        return {
            currentIndex:0,
            scrollY:-1,
            diff:-1
        }
    },
    props:{
        data:{
            type:Array,
            default:[]
        }
    },
    methods:{
      onshortcutstart(e){
          let achorIndex = parseInt(getData(e.target,'index'));
          let firsTouch = e.touches[0];
          this.touch.y1 = firsTouch.pageY;
          this._scrollTo(achorIndex);
          this.touch.achorIndex = achorIndex;
      },
      _scrollTo(index){
        if(!index && index !== 0){
            return
        }
        if(index<0){
            index = 0;
            return
        }else if(index > this.listHeight.length -2){
            index = this.listHeight.length -2;
        }
        this.scrollY = -this.listHeight[index];
        this.$refs.listScroll.scrollToElement(this.$refs.listGroup[index],0);
        this.currentIndex = index;
      },
      onshortcutmove(e){
        let firsTouch = e.touches[0];
        this.touch.y2 = firsTouch.pageY;
        let delte = (this.touch.y2 - this.touch.y1)/16 | 0;
        this._scrollTo(this.touch.achorIndex + delte);
      },
      _calcHeight(){
          let height = 0;
          this.listHeight.push(height);
          this.$refs.listGroup.forEach((item,index)=>{
             height += item.clientHeight;
             this.listHeight.push(height);
         });
      },
      listScroll(pos){
         this.scrollY = pos.y;
      },
      selectItem(item){
          this.$emit("select",item)
      }
    },
    components:{
      Scroll
    },
    computed:{
        shortcutList(){
            return this.data.map((data)=>{
                return data.title.substr(0,1)
            })
        },
      fixTitle(){
            if(this.scrollY>0){
                return
            }
            return this.data[this.currentIndex]? this.data[this.currentIndex].title:''
      }
    },
    watch:{
      scrollY(newY){
        if(newY>0){
          this.currentIndex = 0;
          return
        }
        for(let i=0;i<this.listHeight.length - 1;i++){
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i+1];
          if(-newY>=height1&&-newY<height2){
            this.currentIndex = i;
            this.diff = height2 + newY;
            return
          }
        }
        this.currentIndex = this.listHeight.length -2;
      },
      diff(newVal){
         let fixedTop =  newVal>0&& newVal<TITLE_HEIGHT ? newVal - TITLE_HEIGHT : 0;
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop;
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      }
    },
    mounted(){
        setTimeout(()=>{
          this._calcHeight();
        },20)

    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .singer
    width 100%
    position fixed
    top 104px
    background-color: #444
    .singerWrapper
      .titleNav
        width 100%
        height 40px
        line-height 40px
        background-color #888
        padding 0 10px
        font-weight 700
        color #ddd
      .content
        padding 10px
        .contentItem
          display flex
          align-items center
          margin-top 10px
          .singerPic
            flex 0 0 50px
            margin-right 10px
            img
              border-radius 50%
          .name
            flex 1
            display flex
            color #ddd
            flex-direction column
            justify-content center
  .listRight
    display: flex;
    flex-direction: column;
    justify-content: center;
    position fixed
    right 0px
    top 150px
    height 450px
    width 20px
    border-radius 24px
    background-color black
    .listNav
      text-align: center
      .word
        font-size: 10px
        color: white
      .active
        color: #ff8407
  .fixTop
    position absolute
    top 0
    left 0
    width 100%
    height 40px
    line-height:40px
    background-color: #888
    .fixItem
      padding-left 10px
      color #ddd
</style>
