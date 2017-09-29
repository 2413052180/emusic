<template>
  <div class="enav clear">
    <div class="fl back" @click="back"></div>
    <div class="fl etitle">{{musicname}}</div>
    <div class="fr tomusic"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {}
    },
    props: {
      musicname: {
        type: String,
        default: function () {
          return 'emusic'
        }
      }
    },
    methods: {
      back () {
        this.$router.go(-1);
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../static/scss/comm";
  .enav {
    width: 100%;
    height: 48px;
    line-height: 48px;
    background: rgba(7, 17, 27, 0.28);
    position: fixed;
    top: 0;
    font-size: 0;
    z-index: 1;

    .back {
      width: 40px;
      height: 48px;
      background: url("../../../static/images/back.png") no-repeat center center;
      background-size: 24px 24px;
    }

    .etitle{
      width: calc(100% - 80px);
      height: 48px;
      font-size: 18px;
      text-align: center;
      color: #fff;
    }

    .tomusic {
      width: 40px;
      height: 48px;
      background: url("../../../static/images/ph.png") no-repeat center center;
      background-size: 24px 24px;
    }

  }
</style>
