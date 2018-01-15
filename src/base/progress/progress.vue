<template>
  <div class="progress" ref="progressBar" @click="progressClick">
    <div class="progressInner" ref="progressInner"></div>
    <div class="circleBar" ref="btn"
         @touchstart.prevent="progressStart"
         @touchmove.prevent="progressMove"
         @touchend.prevent="progressEnd"
    ></div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {prefix} from 'common/js/getData'
  const transform = prefix('transform');
  const processBtn = 8;
  export default{
      props:{
          percent:{
              type:Number,
              default:0
          }
      },
      watch:{
        percent(newPercent){
            if(newPercent>0 && !this.touch.initiated){
              const barWidth = this.$refs.progressBar.clientWidth - processBtn;
              const offsetWidth = newPercent*barWidth;
              this._offset(offsetWidth);
            }
          }
      },
    created(){
          this.touch = {};
    },
    methods:{
      progressClick(e){
          this._offset(e.offsetX);
          this._trigger();
      },
      progressStart(e){
          this.touch.initiated = true;
          this.touch.startX=  e.touches[0].pageX;
          this.touch.left = this.$refs.progressInner.clientWidth;
      },
      progressMove(e){
          if(!this.touch.initiated){return}
          let delta = e.touches[0].pageX - this.touch.startX;
          let offsetWidth = Math.min(this.$refs.progressBar.clientWidth - processBtn,
                            Math.max(0,this.touch.left + delta));
          this._offset(offsetWidth);
      },
      progressEnd(){
        this.touch.initiated = false;
        this._trigger();
      },
      _trigger(){
          const clientWid = this.$refs.progressInner.clientWidth;
          const processTolWid = this.$refs.progressBar.clientWidth - processBtn;
          let precent = clientWid/processTolWid
        this.$emit("progressChange",precent);
      },
      _offset(offsetWidth){
        this.$refs.progressInner.style.width = `${offsetWidth}px`
        this.$refs.btn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
   .progress
     position relative
     width 90%
     height 5px
     background-color #f5e8e8
     border-radius 24px
     display: flex;
     align-items: center;
     .progressInner
       position absolute
       background-color #ffce11
       height 100%
     .circleBar
       position absolute
       width 10px
       height 10px
       border-radius 50%
       background-color #ffce11
       box-shadow 0 0 1px 3px #ffffff
</style>
