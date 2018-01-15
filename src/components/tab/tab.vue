<template>
  <div class="nav">
    <router-link tag="div" class="tab-item" to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singer">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
      <span class="tab-link">排行</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/search">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{}
</script>
<style lang="stylus" rel="stylesheet/stylus">
     .nav
       position relative
       z-index 100
       display flex
       height 44px
       line-height:44px
       background-color #333333
       .tab-item
         flex 1
         text-align center
         .tab-link
           padding-bottom 5px
           color white
         &.router-link-active
           .tab-link
              color #ffca11
              border-bottom 2px solid #ffca11
</style>
