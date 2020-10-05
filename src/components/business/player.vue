<template>
  <div class='player'>
    <div :id='id' style='height: 100%;width: 100%;' />
  </div>
</template>

<script>
import Chimee from 'chimee'
import ChimeePluginControl from 'chimee-plugin-controlbar'
import ChimeePluginPopup from 'chimee-plugin-popup'
/**
 * 播放界面
 */
export default {
  data () {
    return {
      id: 'player'
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      console.log(ChimeePluginControl, ChimeePluginPopup)
      Chimee.install(ChimeePluginControl)
      const chimee = new Chimee({
        wrapper: '#' + this.id,
        src: 'http://cdn.toxicjohann.com/lostStar.mp4',
        controls: true,
        autoplay: true,
        plugin: [ChimeePluginControl.name]
      })
    }
  }
}
</script>

<style>

</style>