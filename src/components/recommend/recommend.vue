<template>
  <div class="wrapper" ref="scrollwrapper">
    <div>
      <div class="swipe-wrapper">
        <swipe class="my-swipe">
          <swipe-item class="slide1" v-for="(x, index) in data.carousel" :key="index">
            <img :src="x.images" alt="">
          </swipe-item>
        </swipe>
      </div>
      <ul class="recommend-nav">
        <li>
          <div>
            <img src="./fm.png" alt="">
          </div>
          <p>私人FM</p>
        </li>
        <li>
          <div>20</div>
          <p>每日歌曲推荐</p>
        </li>
        <li>
          <div>
            <img src="./ranking.png" alt="">
          </div>
          <p>云音乐热歌榜</p>
        </li>
      </ul>

      <div class="recommend-container">
        <div class="recommend-tit clear">
          <span class="recommend-tittext fl">推荐歌单</span>
          <span class="recommend-titmore fr">更多</span>
        </div>
        <ul class="recommend-list clear">
          <li class="fl" v-for="(x, index) in data.playlists" :key="index">
            <router-link :to="'/singList/' + x.id">
              <img :src="x.coverImgUrl" alt="">
              <p>{{x.description}}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import API from '../../api/api'
  import {Swipe, SwipeItem} from 'vue-swipe';

  import 'vue-swipe/dist/vue-swipe.css';

  export default {
    name: 'recommend',
    data () {
      return {
        data: {}
      }
    },
    created () {
      this.getData();
    },
    methods: {
      getData () {
        this.$http.get(API.indexData()).then((res) => {
          this.data = res.data;
          this.$nextTick(() => {
            this._initScroll();
          });
        });
      },
      _initScroll () {
        if (!this.scrollwrapper) {
          this.scrollwrapper = new BScroll(this.$refs.scrollwrapper, {
            click: true
          });
        } else {
          this.scrollwrapper.refresh();
        }
      }
    },
    components: {
      Swipe,
      SwipeItem
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../static/scss/comm";
  @import "../../../static/scss/mixin";

  .wrapper {
    width: 100%;
    position: absolute;
    top: 87px;
    bottom: 0;
    left: 0;
    background: #fff;
    overflow: hidden;

    .swipe-wrapper {
      width: 100%;
      height: 140px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .recommend-nav {
      @include border-1px(#ddd);

      width: 100%;
      height: 118px;
      font-size: 0;

      li {
        width: 33.333%;
        display: inline-block;
        padding-top: 10px;

        & > div {
          width: 80px;
          height: 80px;
          line-height: 80px;
          text-align: center;
          color: #d33a31;
          border-radius: 50%;
          border: 1px solid #d33a31;
          margin: 0 auto;
          position: relative;
          font-size: 20px;
        }
        img {
          @extend .center-margin;

          width: 50px;
          height: 50px;
          position: absolute;
        }

        p {
          color: #333;
          font-size: 10px;
          text-align: center;
          margin-top: 5px;
        }
      }
    }

    .recommend-container {
      width: 95%;
      margin-left: 2.5%;

      .recommend-tit {
        margin-top: 14px;
        margin-bottom: 8px;
      }
      .recommend-tittext {
        display: inline-block;
        height: 28px;
        line-height: 28px;
        background: url("../../../static/images/aei.png") no-repeat left center;
        background-size: 24px 24px;
        text-indent: 30px;
        font-size: 16px;
      }
      .recommend-titmore {
        display: inline-block;
        background: url("../../../static/images/arrows_right.png") no-repeat right center;
        background-size: 16px 16px;
        height: 28px;
        line-height: 28px;
        font-size: 14px;
        color: #9da79b;
        padding-right: 15px;
      }

      .recommend-list {

        li {
          width: 31%;
          margin-right: 3.5%;
          height: 180px;
          margin-bottom: 2.5%;

          &:nth-child(3n) {
            margin-right: 0;
          }

          img{
            width: 100%;
            height:135px;
          }

          p{
            height: 38px;
            word-wrap: break-word;
            overflow: hidden;
            display: -webkit-box;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            font-size: 12px;
            color: #333;
            line-height: 1.5;
            letter-spacing: 1px;
          }
        }
      }

    }

  }
</style>
