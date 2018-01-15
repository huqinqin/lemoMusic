<template>
  <div class="circle">
    <svg viewBox="0 0 100 100" :width="radius" :height="radius" version="1.2" xmlns="http://www.w3.org/2000/svg">
       <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"></circle>
       <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="dasharray"
               :stroke-dashoffset="dashoffset"
       ></circle>
    </svg>
    <slot></slot>
  </div>

</template>
<script type="text/ecmascript-6">
   export default{
       props:{
         radius:{
             type:Number,
             default:32
         },
         precent:{
             type:Number,
             default:0
         }
       },
      computed:{
        dashoffset(){
            return (1-this.precent)*this.dasharray
        }
      },
     data(){
       return{
         dasharray : 100*Math.PI
       }
     }
   }
</script>
<style lang="stylus" rel="stylesheet/stylus">
   .circle
     position relative
     circle
       stroke-width 12px
       transform-origin center
       &.progress-background
         transform scale(0.9)
         stroke  #eee
       &.progress-bar
         transform scale(0.9) rotate(-90deg)
         stroke  #222
</style>
