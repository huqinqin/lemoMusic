<template>
  <div class="loading">
    <img src="./loading.gif" alt="" width="24" height="24">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
   export default{
       props:{
         title:{
              type:String,
              default:"正在载入中..."
           }
       }
   }
</script>
<style lang="stylus" rel="stylesheet/stylus">
   .loading
     width 100%
     text-align: center
     .desc
       text-align center
       color #888
       margin-top 5px
</style>
