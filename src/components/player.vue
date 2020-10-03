<template>
  <div class='player'>
    <div id='player' />
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
  mounted () {
    this.init()
  },
  methods: {
    init () {
      console.log(ChimeePluginControl, ChimeePluginPopup)
      Chimee.install(ChimeePluginControl)
      // Chimee.install(ChimeePluginPopup({
      //   name: 'cc_popup',
      //   title: '这是一个居中信息框',
      //   body: '这里是信息内容',
      //   offset: '50% 50%',
      //   width: '200px'
      // }))
      const chimee = new Chimee({
        wrapper: '#player',
        src: 'http://cdn.toxicjohann.com/lostStar.mp4',
        controls: true,
        autoplay: true,
        plugin: [ChimeePluginControl.name]
      })
    },
  }
}
</script>

<style>

</style>