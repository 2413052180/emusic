// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Axios from 'axios';
import NProgress from 'nprogress';
import VueLazyload from 'vue-lazyload';
import store from './store/index';
import '../node_modules/nprogress/nprogress.css';
import '../static/scss/reset.scss';

Vue.prototype.$http = Axios;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: './static/images/error.jpg',
  loading: './static/images/loading.png',
  attempt: 1,
  listenEvents: ['scroll', 'mousewheel', 'wheel', 'resize', 'touchmove']
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});
