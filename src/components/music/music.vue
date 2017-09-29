<template>
  <div class="music">
    <div class="music-bj">
      <img :src="data.songinfo.pic_premium" alt="">
    </div>
    <div class="music-con">
      <header class="music-header clear">
        <div class="fl music-back" @click="back"></div>
        <div class="fl music-title">
          <h1>{{data.songinfo.title}}</h1>
          <h2>{{data.songinfo.author}}</h2>
        </div>
        <div class="fr music-share"></div>
      </header>
      <div class="music-con-box">
        <div class="music-con-animate" :class="{active: isPlay}">
          <div class="music-con-an-stick" :class="{active: isPlay}">
            <img src="./stick_bg.png" alt="">
          </div>
          <div class="music-con-an-wrapper">
            <div class="music-con-an-wrapper-bg"></div>
            <img :src="data.songinfo.pic_big" alt="">
          </div>
        </div>
        <div class="music-lrc">
          <div class="music-lrc-con" :style="{top: translate + 'px'}">
            <p :class="{active: lrcActiveIndex === index}" v-for="(x, index) of lrc" :key="index">{{x[1]}}</p>
          </div>
        </div>
      </div>
      <footer class="music-footer">
        <div class="other-event">
          <div class="collect" :class="{active: isCollect}" @click="collectClick"></div>
          <div class="download"></div>
          <div class="comment"></div>
          <div class="more"></div>
        </div>
        <div class="clear music-progress">
          <div class="fl music-progress-starttime">{{timer.startTime}}</div>
          <div class="fl music-progress-con">
            <div class="music-progress-prog"></div>
            <div class="music-progress-thumb" :style="{left: thumdLeft + '%'}"></div>
          </div>
          <div class="fl music-progress-endtime">{{timer.endTime}}</div>
        </div>
        <div class="music-event">
          <div class="round-robin"></div>
          <div class="prev"></div>
          <div :class="{play: !isPlay, pause: isPlay}" @click="tooglePlay"></div>
          <div class="next"></div>
          <div class="music-list"></div>
        </div>
      </footer>
    </div>
    <audio :src="musc" id="audioPlay" @canplay="canPlaySong(true)" @timeupdate="updateTime"></audio>
  </div>
</template>

<script type="text/ecmascript-6">
  import muscA from '../../../static/music/1.mp3';
  import API from '../../api/api';

  function parseLyric (lyric) {
    let lines = lyric.split('\n');
    let pattern = /\[\d{2}:\d{2}.\d{2}\]/g;
    let result = [];

    while (!pattern.test(lines[0])) {
      lines = lines.slice(1);
    }

    lines[lines.length - 1].length === 0 && lines.pop();

    lines.forEach(function (data, step) {
      let index = data.indexOf(']');
      let time = data.substring(0, index + 1);
      let value = data.substring(index + 1);
      let timeString = time.substring(1, time.length - 2);
      let timeArr = timeString.split(':');
      result.push([parseInt(timeArr[0], 10) * 60 + parseFloat(timeArr[1]), value]);
    });

    result.sort(function (a, b) {
      return a[0] - b[0];
    });

    return result;
  }
  export default {
    name: 'music',
    data () {
      return {
        isPlay: false,
        isCollect: false,
        musc: muscA,
        thumdLeft: 0,
        timer: {
          secondStartTime: 0,
          secondEndTime: 0,
          startTime: '00:00',
          endTime: '00:00'
        },
        interval: null,
        lrcActiveIndex: 0,
        data: {
          bitrate: {},
          songinfo: {}
        },
        lrc: [],
        translate: 126
      }
    },

    beforeRouteLeave (to, from, next) {
      this.clearInter();
      next();
    },

    created () {
      this.renderLRC();
      this.$http.get(API.GetMusic(this.$route.params.id)).then((res) => {
        this.data = res.data;
      });
    },

    methods: {
      renderLRC () {
        this.$http.get(API.getLRC()).then((res) => {
          this.lrc = parseLyric(res.data);
        });
      },

      clearInter () {
        clearInterval(this.interval)
      },

      changeLRC (second) {
        for (let i = 0, len = this.lrc.length; i < len; i++) {
          if (second > this.lrc[i][0] - 1) {
            this.lrcActiveIndex = i;
            this.translate = 126 - (i * 42);
          }
        }
      },

      getAudioEl () {
        return document.getElementById('audioPlay');
      },

      back () {
        this.clearInter();
        this.$router.go(-1);
      },

      tooglePlay () {
        this.$store.state.isPlay = this.isPlay = !this.isPlay;

        if (this.isPlay) {
          this.canPlaySong();
          this.setCurrentTime();
        } else {
          this.pause();
        }
      },
      collectClick () {
        this.isCollect = !this.isCollect;
      },

      pause () {
        let audio = document.getElementById('audioPlay');
        audio.pause();
        this.isPlay = false;
        clearInterval(this.interval);
      },

      setCurrentTime () {
        let that = this;
        this.interval = setInterval(function () {
          console.log('----------')
          let currentTime = that.getAudioEl().currentTime;
          that.timer.secondStartTime = currentTime;
          that.changeLRC(currentTime);
          that.timer.startTime = that.secondToTime(currentTime);
          that.thumdLeft = that.getPercent(currentTime, that.timer.secondEndTime);
        }, 500);
      },

      getPercent (start, end) {
        return (start / end) * 100
      },

      canPlaySong (isUpdateTime) {
        let audio = document.getElementById('audioPlay');
        audio.play();
        this.isPlay = true;
        this.setCurrentTime();
        if (isUpdateTime) {
          let duration = this.getAudioEl().duration;
          this.timer.endTime = this.secondToTime(duration);
          this.timer.secondEndTime = duration;
        }
      },
      secondToTime (second) {
        let time = Math.ceil(second);

        var minute = parseInt(time / 60);
        if (minute < 10) {
          minute = '0' + minute;
        }
        var secound = parseInt(time % 60);
        if (secound < 10) {
          secound = '0' + secound;
        }
        return minute + ':' + secound;
      },
      updateTime () {

      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../static/scss/comm";
  @import "../../../static/scss/mixin";

  .music {

    .music-bj {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      filter: blur(60px);
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .music-header {
      @include border-1px(#e6e4e4);

      height: 48px;
      width: 100%;

      .music-back {
        width: 40px;
        height: 47px;
        background: url("../../../static/images/back.png") no-repeat center center;
        background-size: 24px 24px;
      }
      .music-title {
        width: calc(100% - 80px);
        height: 47px;

        h1 {
          height: 24px;
          line-height: 24px;
          font-size: 20px;
          font-weight: bold;
          color: #fff;
        }
        h2 {
          font-size: 16px;
          height: 23px;
          line-height: 20px;
          color: #c4c4c4;
        }
      }
      .music-share {
        width: 40px;
        height: 47px;
        background: url("list-1.png") no-repeat center center;
        background-size: 24px 24px;
      }
    }

    .music-con-box {
      width: 100%;
      height: calc(100% - 228px);
      position: absolute;
      top: 48px;
      left: 0;
      .music-con-animate {
        &.active {
          .music-con-an-wrapper {
            animation-name: music-rotate;
            animation-duration: 30s;
            animation-timing-function: linear;
            animation-delay: .5s;
            animation-iteration-count: infinite;
          }
        }
        @keyframes music-rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .music-con-an-stick {
          @extend .center-margin-x;
          width: 93px;
          height: 140px;
          top: 0;
          transform-origin: 14px 14px;
          transition: all .5s;
          z-index: 2;
          transform: rotate(-30deg);

          &.active {
            transform: rotate(0deg);
          }

          img {
            width: 100%;
            height: 100%;
          }
        }
        .music-con-an-wrapper {
          width: 290px;
          height: 290px;
          margin: 95px auto 0 auto;
          position: relative;

          .music-con-an-wrapper-bg {
            width: 100%;
            height: 100%;
            position: absolute;
            background: url("./cd_wrapper.png") no-repeat;
            background-size: cover;
            z-index: 1;
          }

          img {
            @extend .center-margin;
            width: 194px;
            height: 194px;
          }
        }
      }

      .music-lrc{
        width: 100%;
        height: 336px;
        position: absolute;
        top: 130px;
        z-index: 11;
        overflow: hidden;

        .music-lrc-con{
          width: 100%;
          position: absolute;
          top: 126px;
          transition: top .5s;

          p{
            height: 42px;
            line-height: 42px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 16px;
            color: rgba(255,255,255,.6);
            text-align: center;

            &.active{
              color: #31c27c;
            }
          }
        }
      }
    }

    .music-footer {
      position: absolute;
      bottom: 30px;
      left: 0;
      width: 100%;

      .other-event {
        margin-left: 30px;
        margin-right: 30px;
        height: 60px;
        font-size: 0;

        & > div {
          width: 25%;
          height: 60px;
          display: inline-block;
        }
        .collect {
          background: url("./collect.png") no-repeat center center;
          background-size: 30px 30px;

          &.active {
            background: url("./collect_active.png") no-repeat center center;
          }
        }
        .download {
          background: url("./down.png") no-repeat center center;
          background-size: 24px 24px;
        }
        .comment {
          background: url("./chat.png") no-repeat center center;
          background-size: 24px 24px;
        }
        .more {
          background: url("./morew.png") no-repeat center center;
          background-size: 24px 24px;
        }
      }
      .music-progress {
        width: 100%;
        height: 24px;
        line-height: 24px;

        .music-progress-starttime {
          width: 69px;
          font-size: 12px;
          text-align: right;
          color: rgba(255, 255, 255, .5);
        }
        .music-progress-con {
          width: calc(100% - 174px);
          margin-left: 18px;
          margin-right: 18px;
          height: 12px;
          position: relative;
          margin-top: 6px;

          .music-progress-prog {
            @extend .center-margin-y;

            width: 100%;
            height: 2px;
            background-color: #bdbdbd;
          }
          .music-progress-thumb {
            @extend .center-margin-y;

            position: absolute;
            left: 0;
            width: 12px;
            height: 12px;
            background: #ce3d3e;
            border-radius: 50%;
          }
        }
        .music-progress-endtime {
          color: rgba(255, 255, 255, .5);
          width: 69px;
          font-size: 12px;
        }
      }

      .music-event {
        height: 60px;
        font-size: 0;
        margin-top: 16px;

        & > div {
          width: 20%;
          height: 60px;
          display: inline-block;
        }
        .round-robin {
          background: url("./seq.png") no-repeat center center;
          background-size: 60px 60px;
        }
        .prev {
          background: url("./pre_l.png") no-repeat center center;
          background-size: 34px 34px;
        }
        .play {
          background: url("./play.png") no-repeat center center;
          background-size: 60px 60px;
        }
        .pause {
          background: url("./pause.png") no-repeat center center;
          background-size: 60px 60px;
        }
        .next {
          background: url("./pre_r.png") no-repeat center center;
          background-size: 34px 34px;
        }
        .music-list {
          background: url("./list.png") no-repeat center center;
          background-size: 60px 60px;
        }
      }

    }

  }


</style>
