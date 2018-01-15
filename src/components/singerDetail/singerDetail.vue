<template>
  <transition name="fade">
    <MusicList :singer="singer" :bgImage="bgImage" :songs="songs"></MusicList>
  </transition>
</template>
<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {getSingerSongDetail} from 'api/singer.js'
  import {ERR_OK} from 'api/config.js'
  import {createSong} from 'common/js/song.js'
  import MusicList from 'components/musicList/musicList.vue'
   export default{
      data(){
          return{
              songs:[]
          }
      },
      computed:{
        ...mapGetters([
            'singer'
        ]),
        bgImage(){
            return this.singer.avatar;
        }
      },
     created(){
          this._getSongDetail(this.singer.id);
     },
     methods:{
       _getSongDetail(id){
           if(!id){
               this.$router.push('/singer');
               return
           }
         getSingerSongDetail(id).then((res)=>{
             if(res.code === ERR_OK){
               this.songs = this._normalizeSong(res.data.list);
             }
         })
       },
       _normalizeSong(list){
         let ret = [];
         list.forEach((item)=>{
           let musicData = item.musicData;
           if(musicData.songid&&musicData.albummid){
             return ret.push(createSong(musicData))
           }
         });
         return ret;
       }
     },
     components:{
       MusicList
     }
   }
</script>
<style lang="stylus" rel="stylesheet/stylus">
   .fade-enter-active, .fade-leave-active
     transition all 0.5s
   .fade-enter, .fade-leave-to
     transform  translate3d(100%,0,0)
</style>
