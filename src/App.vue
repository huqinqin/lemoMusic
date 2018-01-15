<template>
  <div class="bigWrapper">
    <Lheader></Lheader>
    <Ltab></Ltab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Play></Play>
  </div>
</template>

<script>
  import header from 'components/header/header.vue'
  import tab from 'components/tab/tab.vue'
  import Play from 'components/play/play.vue'
  export default {
    components:{
      "Lheader":header,
      "Ltab": tab,
      Play
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .bigWrapper
    height 100%
</style>
