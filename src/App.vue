<template>
  <div id="app">
    <div id='wrapper' />
  </div>
</template>

<script>
import Chimee from 'chimee'
import ChimeePluginControl from 'chimee-plugin-controlbar'
import ChimeePluginPopup from 'chimee-plugin-popup'
const { ipcRenderer } = require('electron')
export default {
  name: 'App',
  created () {
    // 主进程与渲染进程之间的通信
    /**
     * 一种方式是 remote ，不过这种在v9的时候会被逐渐禁用，另一种是消息通信
     * 第二种方式是 ipcRender ，管道通信
     * 通过 ipcRenderer 发送消息到主进程，所以在渲染进程的调试窗口是看不到消息的，只有在主进程的node窗口中才可以看到
     */
  },
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
        wrapper: '#wrapper',
        src: 'http://cdn.toxicjohann.com/lostStar.mp4',
        controls: true,
        autoplay: true,
        plugin: [ChimeePluginControl.name]
      })
    },
    createWindow () {
      ipcRenderer.send('msg_render2main', { name: '123' }, { name: '222' })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
