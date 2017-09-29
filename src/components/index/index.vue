<template>
  <div>
    <eheader></eheader>
    <transition name="gopage">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import eheader from '@/components/eheader/eheader'

  export default {
    data () {
      return {}
    },
    components: {eheader}
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../static/scss/animate";
  .gopage-enter-active, .gopage-leave-active {
    transition: opacity .5s
  }
  .gopage-enter, .gopage-leave-to {
    opacity: 0
  }
</style>
