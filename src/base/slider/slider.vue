<template>
   <div class="slider swiper-container">
       <slot></slot>
   </div>
</template>
<script type="text/ecmascript-6">
  import '../../../static/css/swiper.min.css'
  import   Swiper from '../../../static/js/swiper.min.js'
   export default{
      props:{
          autoplay:{
              type:Number,
              default:500
          }
      },
     methods:{
       _initSwiper() {
         this.mySwiper = new Swiper('.swiper-container',{
             loop:true,
             autoplay:this.autoplay,
             pagination : '.swiper-pagination',
             paginationType : 'bullets',
             observer:true,
             observeParents:true,
         });
       }
     },
     mounted(){
       setTimeout(()=>{
         this._initSwiper();
       },30);
     },
     components:{
      Swiper
     },
     destroyed(){
         clearTimeout(this.timer);
     }
   }
</script>
<style>

</style>
