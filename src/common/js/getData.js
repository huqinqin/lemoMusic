/**
 * Created by wl on 2017/12/20.
 */
export function getData(el,name,val) {
   let prefix = 'data-';
   name = prefix + name;
   if(val){
     return el.setAttribute(name,val)
   }else{
     return el.getAttribute(name)
   }
}

export let elementSty = document.createElement('div').style;
export let ventor = ( () => {
  let transformName = {
    webkit:"webkitTransform",
    Moz:"mozTransform",
    O:"OTransform",
    ms:"msTransform",
    standard:"transform"
  };
  for(let key in transformName){
    if(elementSty[transformName[key]]!==undefined){
      return key;
    }
  }
   return false;
})();
export function prefix(style) {
   if(ventor == false){
     return
   }
   if(ventor == 'standard'){
     return style
   }
   return ventor + style.charAt(0).toUpperCase() + style.substring(1);
}
