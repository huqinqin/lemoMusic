<template>
   <div class="songList">
     <ul class="songListItems">
       <li class="songItem" v-for="(song,index) in songs" @click="selectItem(song,index)">
         <p class="songName">{{song.name}}</p>
         <p class="songDec">{{joinName(song)}}</p>
       </li>
     </ul>
   </div>
</template>
<script type="text/ecmascript-6">
  export default{
    props:{
        songs:{
            type:Array,
            default:null
        }
    },
   methods:{
        joinName(songs){
            return `${songs.singer}.${songs.albumname}`
        },
     selectItem(item,index){
            this.$emit('selectItem',item,index);
     }
   }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .songList
    width 100%
    padding 20px
    box-sizing border-box
    .bglayer
      position: absolute;
      height: 100%;
      background-color: #c57777;
      width: 100%;
      z-index: -1;
      top: 0px;
      left: 0;
    .songListItems
      width 100%
      .songItem
        line-height:30px
        .songName
          color white
        .songDec
          color #5d4e4e
          font-size 14px
</style>
