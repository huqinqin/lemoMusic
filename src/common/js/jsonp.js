/**
 * Created by wl on 2017/12/7.
 */
/*这个函数就是为了拼接参数*/
import originJSONP from 'jsonp'
export default function jsonp(url,data,option) {
  url += (url.indexOf('?')<0?"?":"&") + param(data);
     return new Promise((resolve,reject)=>{
       originJSONP(url,option,(err,data)=>{
          if(!err){
            resolve(data);
          }else{
            reject(err)
          }
       })
     })
}
/*把data对象转换为字符串*/
function  param(data) {
   let url='';
   for(var  k in data){
     let value  = data[k]!==undefined?data[k]:'';
     url += `&${k}=${encodeURIComponent(value)}`
   }
   return url?url.substring(1):'';
}
