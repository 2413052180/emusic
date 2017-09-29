<template>
  <div>
    <enav :musicname="titleName"></enav>
    <header class="singlist-header">
      <div class="singlist-header-bg">
        <img :src="data.billboard.pic_s210" alt="">
      </div>
      <div class="singlist-header-con">
        <div class="singlist-header-musicinfo clear">
          <img class="fl" :src="data.billboard.pic_s192" alt="">
          <div class="fl singlist-musicinfo">
            <h2>{{data.billboard.comment}}</h2>
            <div>{{data.billboard.name}}</div>
          </div>
        </div>
        <div class="singlist-header-musicoperate clear">
          <div class="fl">
            <img src="../../../static/images/list-1.png" alt="">
            <p>111</p>
          </div>
          <div class="fl">
            <img src="../../../static/images/list-2.png" alt="">
            <p>111</p>
          </div>
          <div class="fl">
            <img src="../../../static/images/list-3.png" alt="">
            <p>111</p>
          </div>
          <div class="fl">
            <img src="../../../static/images/list-4.png" alt="">
            <p>下载</p>
          </div>
        </div>
      </div>
    </header>
    <div class="singlist-con">
      <div class="singlist-con-tit">
        播放全部 <span>（共{{data.song_list.length}}首）</span>
      </div>
      <ul class="singlist-list">
        <li v-for="(x, index) in data.song_list" :key="index">
          <router-link :to="'/music/' + x.song_id">
            <div class="fl singlist-list-num">{{index + 1}}</div>
            <div class="fl singlist-list-sing">
              <div class="singlist-singname">{{x.title}}</div>
              <div class="singlist-songer">{{x.author}} - {{x.album_title}}</div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import enav from '@/components/enav/enav';
  import API from '../../api/api';

  export default {
    data () {
      return {
        titleName: '',
        data: {
          billboard: {},
          song_list: []
        }
      }
    },
    methods: {

    },
    created () {
      this.$http.get(API.getBaiduMusicList(this.$route.params.id, 0, 999)).then((res) => {
        this.data = res.data;
        this.titleName = this.data.billboard.name;
      });
    },
    components: {
      enav
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../static/scss/mixin";

  .singlist-header {
    width: 100%;
    padding-top: 48px;
    overflow: hidden;
    position: relative;

    .singlist-header-bg {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      filter: blur(60px);
      z-index: -1;

      img {
        width: 100%;
        height: 100%;
      }
    }
    .singlist-header-con {
      margin: 15px 20px 0 20px;
      color: #fff;

      .singlist-header-musicinfo {

        img {
          width: 150px;
          height: 150px;
        }

        .singlist-musicinfo {
          width: calc(100% - 180px);
          padding-left: 10px;
          padding-right: 20px;
          padding-top: 20px;
          color: #fff;

          h2 {
            width: 100%;
            height: 40px;
            line-height: 1.3;
            font-size: 16px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }

          div {
            font-size: 18px;
            height: 30px;
            line-height: 30px;

            &::after {
              content: '';
              width: 24px;
              height: 30px;
              vertical-align: top;
              display: inline-block;
              background: url("../../../static/images/arrows_right.png") no-repeat right center;
              background-size: 24px 24px;
            }
          }
        }
      }
      .singlist-header-musicoperate {
        height: 68px;
        font-size: 0;
        margin-bottom: 5px;

        > div {
          width: 25%;

          > img {
            width: 24px;
            height: 24px;
            display: block;
            margin: 7px auto;
          }

          > p {
            font-size: 14px;
            height: 20px;
            line-height: 20px;
            color: #fff;
            text-align: center;
          }
        }
      }
    }
  }

  .singlist-con {
    .singlist-con-tit {
      height: 48px;
      line-height: 48px;
      padding-left: 48px;
      background: url("../../../static/images/start.png") no-repeat 7px center;
      background-size: 24px 24px;
      font-size: 18px;

      span {
        font-size: 14px;
        color: #949494;
      }
    }
    .singlist-list {

      li {
        height: 56px;

        &:first-child .singlist-list-sing {
          border-top: solid 1px #ddd;
        }

        .singlist-list-num {
          width: 48px;
          line-height: 56px;
          text-align: center;
          color: #999;
        }
        .singlist-list-sing {
          @include border-1px(#ddd);

          width: calc(100% - 48px);
          height: 55px;

          .singlist-singname {
            height: 32px;
            line-height: 32px;
            font-size: 18px;
            color: #333;
          }
          .singlist-songer {
            font-size: 12px;
            color: #949494;
          }

        }
      }
    }
  }

</style>
