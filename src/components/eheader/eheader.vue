<template>
  <div class="eheader">
    <div class="search">
      <div class="logo">
        <span></span>
      </div>
      <div class="search-inp-box">
        <input type="text" v-model="searchKeyWord" class="search-inp" @keyup="searchSong()" @click="showSearchList()"
               placeholder="搜索音乐、电台、歌曲"/>
      </div>
      <div class="gomusic">
        <span v-show="!isSearchListShow" class="gomusic-btn"></span>
        <span v-show="isSearchListShow" @click="hideSearchList()" class="close-search">取消</span>
      </div>
    </div>
    <div class="tabview">
      <ul>
        <li v-for="(x, index) of tabviewData" :class="{active: x.active}" @click="navActiveClick(index)" :key="index">
          <router-link :to="'/index/' + x.code">{{x.name}}</router-link>
        </li>
      </ul>
      <div class="tabview-focus">
        <span :style="{left: navActiveLeft + '%'}"></span>
      </div>
    </div>

    <div class="search-list" v-show="isSearchListShow">
      <ul>
        <li class="clear" v-for="(x, index) in searchList" :key="index">
          <div class="search-list-index fl">{{index}}</div>
          <div class="search-list-con fl">
            <div class="search-music-name">{{x.name}}</div>
            <div class="search-music-info">{{x.singer}}-{{x.special}}</div>
          </div>
          <div class="search-list-more fl">
            <span></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
//  import API from '../../api/api';
  export default {
    name: 'eheader',
    data () {
      return {
        navActiveLeft: 0,
        isSearchListShow: false,
        searchKeyWord: '',
        tabviewData: [
          {code: 'recommend', name: '个性推荐', active: true},
          {code: 'songList', name: '歌单', active: false},
          {code: 'station', name: '主播电台', active: false},
          {code: 'rangkingList', name: '排行榜', active: false}
        ],
        searchList: [
          {id: 0, name: '青花瓷', singer: '周杰伦', special: '地表最强'},
          {id: 1, name: '不能说的秘密', singer: '周杰伦', special: '地表最强'},
          {id: 2, name: '魔术先生', singer: '周杰伦', special: '地表最强'},
          {id: 3, name: '彩虹', singer: '周杰伦', special: '地表最强'},
          {id: 4, name: '青花瓷青花瓷青花瓷青花瓷青花瓷青花瓷青花瓷青花瓷青花瓷青花瓷青花瓷青花瓷青花瓷青花瓷', singer: '周杰伦', special: '地表最强'}
        ]
      }
    },
    methods: {
      /**
       * 切换主页导航条列表
       * @param index
       */
      navActiveClick (index) {
        this.navActiveLeft = index * 25;
        for (let i = 0, len = this.tabviewData.length; i < len; i++) {
          if (index === i) {
            this.tabviewData[i].active = true;
            continue;
          }
          this.tabviewData[i].active = false;
        }
      },

      /**
       * 显示搜索框列表
       */
      showSearchList () {
        this.isSearchListShow = true;
        this.searchKeyWord = '';
      },

      /**
       * 隐藏搜索框列表
       */
      hideSearchList () {
        this.isSearchListShow = false;
      },

      searchSong () {
        if (!this.searchKeyWord) {
          this.searchList = [];
        }
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../static/scss/comm";
  @import "../../../static/scss/mixin";

  .eheader {
    width: 100%;
    height: 88px;

    .search {
      background: $GLOBAL_COLOR;
      height: 46px;
      display: flex;
      flex-flow: row nowrap;

      .logo {
        width: 40px;
        position: relative;
        span {
          @extend .center-margin;
          background: url("http://www.atool.org/placeholder.png?size=30x30&text=logo&fg=fff") no-repeat;
          background-size: 100% 100%;
          width: 30px;
          height: 30px;
        }
      }
      .gomusic {
        width: 40px;
        position: relative;

        .gomusic-btn {
          @extend .center-margin;
          background: url("http://www.atool.org/placeholder.png?size=30x30&text=听歌&fg=fff") no-repeat;
          background-size: 100% 100%;
          width: 30px;
          height: 30px;
        }

        .close-search {
          @extend .hand;
          display: inline-block;
          height: 46px;
          line-height: 46px;
          color: #fff;
        }
      }
      .search-inp-box {
        flex-grow: 1;

        input {
          width: 95%;
          height: 30px;
          border-radius: 5px;
          text-indent: 20%;
          margin-top: 8px;
          font-size: 12px;
        }
      }
    }
    .tabview {
      background: #fff;
      height: 42px;
      position: relative;

      li {
        width: 25%;
        height: 40px;
        line-height: 40px;
        display: inline-block;
        text-align: center;

        &.active {
          color: $GLOBAL_COLOR;
        }
      }

      .tabview-focus {
        width: 100%;
        height: 1px;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 1;

        span {
          display: inline-block;
          width: 25%;
          height: 100%;
          background: $GLOBAL_COLOR;
          vertical-align: top;
          position: absolute;
          transition: left 0.375s;
        }
      }
    }

    .search-list {
      position: absolute;
      top: 46px;
      bottom: 0;
      left: 0;
      width: 100%;
      background: #fbfbfb;
      z-index: 10;

      li {
        width: 100%;
        height: 56px;

        .search-list-index {
          width: 48px;
          height: 56px;
          line-height: 56px;
          text-align: center;
          color: #999;
          font-size: 16px;
        }

        .search-list-con {
          @include border-1px(#ccc);
          height: 56px;
          width: calc(100% - 96px);

          .search-music-name {
            height: 35px;
            line-height: 35px;
            font-size: 18px;
            margin-top: 3px;
            color: #333;
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .search-music-info {
            font-size: 12px;
            color: #949494;
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .search-list-more {
          @include border-1px(#ccc);
          height: 56px;
          width: 48px;

          span {
            display: inline-block;
            width: 36px;
            height: 26px;
            border: 1px solid #d3d4da;
            margin-top: 14px;
            border-radius: 4px;
            background: url("../../../static/images/more.png") no-repeat;
            background-position: center center;
            background-size: 18px 18px;
          }
        }
      }
    }
  }
</style>
<!--@include border-1px(#ccc);-->
