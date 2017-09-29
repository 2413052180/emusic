/**
 * Created by Administrator on 2017/9/27.
 */

const API_PATH = 'http://localhost:8080/';
const BAIDU_MUSIC = '/apis/v1/restserver/ting';

export default{
  indexData () {
    return API_PATH + 'mock/index.json';
  },

  getLRC () {
    return API_PATH + 'static/music/1.lrc'
  },

  /**
   * 百度音乐列表功能
   * @param type 1-新歌榜,2-热歌榜,11-摇滚榜,12-爵士,16-流行,21-欧美金曲榜,22-经典老歌榜,23-情歌对唱榜,24-影视金曲榜,25-网络歌曲榜
   * @param offset 分页数
   * @param size 单页总数
   * @returns {string}
     */
  getBaiduMusicList (type = 1, offset = 0, size = 10) {
    return BAIDU_MUSIC + '?method=baidu.ting.billboard.billList&type=' + type + '&size=' + size + '&offset=' + offset;
  },

  /**
   * 百度音乐搜索功能
   * @param keyWord 歌曲关键字
   * @returns {string}
     */
  searchBaiduMusic (keyWord) {
    return BAIDU_MUSIC + '?method=baidu.ting.search.catalogSug&query=' + keyWord;
  },

  /**
   * 获取百度音乐歌词
   * @param songId 歌曲ID
   * @returns {string}
     */
  getMusicLRC (songId) {
    return BAIDU_MUSIC + '?method=baidu.ting.song.lry&songid=' + songId;
  },

  /**
   * 获取百度音乐推荐列表
   * @param songId
   * @param num 数量
   * @returns {string}
     */
  getRecommendList (songId = 877578, num = 5) {
    return BAIDU_MUSIC + '?method=baidu.ting.song.getRecommandSongList&song_id=' + songId + '&num=' + num;
  },

  /**
   * 获取百度音乐歌手信息
   * @param singerId
   * @returns {string}
     */
  getSingerInfo (singerId) {
    return BAIDU_MUSIC + '?method=baidu.ting.artist.getInfo&tinguid=' + singerId;
  },

  /**
   * 获取百度音乐歌手歌曲列表
   * @param singerId 歌手ID
   * @param limits 数量
   * @returns {string}
     */
  getSingerSongList (singerId, limits = 6) {
    return BAIDU_MUSIC + '?method=baidu.ting.artist.getSongList&tinguid=' + singerId + '&limits=' + limits + '&use_cluster=1&order=2';
  },

  /**
   * 获取百度音乐指定ID歌曲
   * @param songId
   * @returns {string}
   * @constructor
     */
  GetMusic (songId) {
    return BAIDU_MUSIC + '?method=baidu.ting.song.play&songid=' + songId;
  },

  searchList (key) {
    return `https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=${key}&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=1&remoteplace=txt.mqq.all&_=1506494384649`
  }
}
