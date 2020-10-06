<template>
  <div class="player">
    <div
      :id="id"
      style="height: 100%;width: 100%;"
    />
  </div>
</template>

<script>
import Chimee from 'chimee'
/**
 * 播放界面
 */
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  mounted () {
    const chimee = new Chimee({
      wrapper: '#' + this.id,
      src: 'http://chimee.org/vod/1.mp4',
      controls: false,
      autoload: true
    })
    this.$emit('update:chimee', Object.freeze(chimee))
  }
}
</script>

<style>

</style>