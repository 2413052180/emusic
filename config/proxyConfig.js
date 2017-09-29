/**
 * Created by Administrator on 2017/9/29.
 */
module.exports = {
  proxyList: {
    '/apis': {
      // 测试环境
      target: 'http://tingapi.ting.baidu.com',  // 接口域名
      changeOrigin: true,  //是否跨域
      pathRewrite: {
        '^/apis': ''   //需要rewrite重写的,
      }
    }
  }
}
