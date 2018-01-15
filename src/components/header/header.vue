<template>
   <div class="header">
     <p class="word"><i class="icon"></i>Lemon Music</p>
   </div>
</template>
<script type="text/ecmascript-6">
   export default {

   }
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .header
      position relative
      z-index 100
      width 100%
      height 60px
      line-height 60px
      background-color #63800b
      .word
        font-size 16px
        color white
        display flex
        align-items center
        margin 0 25%
        text-align center
        .icon
          display inline-block
          height 30px
          width 30px
          margin-right 10px
          background-image: url('../../../static/imgs/lemo.jpg')
          background-size 30px 30px
</style>
