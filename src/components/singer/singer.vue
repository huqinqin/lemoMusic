<template>
  <div class="listview">
    <listview :data="this.singer" @select="jumpSingerDetail"></listview>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
  import {getSingerList} from 'api/singer.js'
  import {ERR_OK} from 'api/config.js'
  import Singer from 'common/js/singer.js'
  import listview from 'base/listview/listview'
  import {mapMutations} from 'vuex'
  const HOT_TITLE = '热门';
  const HOT_LEN = 10;
    export default{
        data(){
            return{
                singer:[]
            }
        },
      components:{
            listview
      },
        methods:{
          _getSingerList(){
              getSingerList().then((res)=>{
                  if(res.code==ERR_OK){
                     this.singer = this._normalizeSinger(res.data.list);
                  }
              })
            },
          _normalizeSinger(list){
               let map = {
                   hot:{
                       title:HOT_TITLE,
                       items:[]
                   }
               };
               list.forEach((item,index)=>{
                   if(index<HOT_LEN){
                       map.hot.items.push(new Singer({
                         id: item.Fsinger_mid,
                         name: item.Fsinger_name,
                       }))
                   }
                   const key = item.Findex;
                   if(!map[key]){
                     map[key] = {
                         title:key,
                         items:[]
                     }
                   }
                   map[key].items.push(new Singer({
                     id: item.Fsinger_mid,
                     name: item.Fsinger_name,
                   }))
               });
               let hot = [];
               let ret = [];
               for(let key in map){
                   let val = map[key];
                 if(val.title.match(/[a-zA-Z]/)){
                   ret.push(val)
                 }else if(val.title == HOT_TITLE){
                   hot.push(val)
                 }
               }
            ret.sort(function (a,b) {
              return a.title.charCodeAt(0)-b.title.charCodeAt(0);
            });
            return hot.concat(ret);
          },
          jumpSingerDetail(singer){
            this.$router.push({
                path:`/singer/${singer.id}`
              })
            this.setSinger(singer);
          },
          ...mapMutations({
            setSinger:"SET_SINGER"
          })
        },
      created(){
         this._getSingerList();
      }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .listview
    height 100%

</style>
