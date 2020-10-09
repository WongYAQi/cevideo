<template>
  <div id="app">
    <my-header />
    <my-player
      :id="id"
      :chimee.sync="chimee"
      ref="play"
    />
    <my-footer 
      :chimee="chimee"
      :is-playing="isPlaying"
      @cevideo-load="load"
      @cevideo-play="play"
    />
  </div>
</template>

<script>
import MyHeader from './components/business/header'
import MyPlayer from './components/business/player'
import MyFooter from './components/business/footer'
import { ipcRenderer } from 'electron'
import axios from './script/axios'
export default {
  name: 'App',
  components: {
    MyHeader, MyPlayer, MyFooter
  },
  data () {
    return {
      chimee: {},
      id: 'player',
      isPlaying: false
    }
  },
  created () {
    // 主进程与渲染进程之间的通信
    /**
     * 一种方式是 remote ，不过这种在v9的时候会被逐渐禁用，另一种是消息通信
     * 第二种方式是 ipcRender ，管道通信
     * 通过 ipcRenderer 发送消息到主进程，所以在渲染进程的调试窗口是看不到消息的，只有在主进程的node窗口中才可以看到
     */
  },
  watch: {
    chimee (val) {
      if (val) {
        val.on('play', evt => {
          this.isPlaying = true
        })
        val.on('pause', evt => {
          this.isPlaying = false
        })
      }
    }
  },
  methods: {
    createWindow () {
      ipcRenderer.send('msg_render2main', { name: '123' }, { name: '222' })
    },
    load (paths) {
      let url = encodeURIComponent(paths[0])
      axios.get('http://localhost:3000/info?src=' + url)
      this.chimee.load('http://localhost:3000/load?src=' + url, {
        volume: 0.5
      })
    },
    play () {
      this.chimee.play()
    }
  }
}
</script>

<style lang='less'>
html, body{
  margin: 0;
  padding: 0;
}
#app {
  width: 100vw;
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  border: 2px solid #000000;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  & > .header,
  & > .footer{
    flex: 0 1 auto;
  }
  & > .player{
    flex: 1;
  }
}
</style>
