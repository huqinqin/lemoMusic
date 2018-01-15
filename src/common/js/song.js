/**
 * Created by wl on 2017/12/21.
 */
export default  class Song{
  constructor({id,mid,singer,name,albumname,duration,image,url}){
    this.id = id;
    this.mid = mid;
    this.singer = singer;
    this.name = name;
    this.albumname = albumname;
    this.duration = duration;
    this.image = image;
    this.url = url;
  }
}
export function createSong(musicData) {
  return new Song({
    id:musicData.songid,
    mid:musicData.songmid,
    singer:filter(musicData.singer),
    name:musicData.songname,
    albumname:musicData.albumname,
    duration:musicData.interval,
    image:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url:`http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
  })
}

function filter(singer) {
  if(!singer){
    return ''
  }
  let ret = [];
  singer.forEach((s)=>{
     ret.push(s.name)
  });
  return ret.join("/");
}
