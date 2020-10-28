<template>
  <div id="app">
    <div class='app-header'>
      <my-header />
    </div>
    <div class='app-main'>
      <div class='app-left'>
        <my-player
          :id="id"
          :chimee.sync="chimee"
          ref="play"
        />
        <my-footer
          ref='footer'
          :chimee="chimee"
          :is-playing="isPlaying"
          :is-list-active.sync='isListActive'
        />
      </div>
      <div class='app-right' v-if='isListActive'>
        <my-list :chimee='chimee' />
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from './components/business/header'
import MyPlayer from './components/business/player'
import MyFooter from './components/business/footer'
import MyList from './components/business/list'
import Chimee from 'chimee'
import axios from './script/axios'
import { ipcRenderer } from 'electron'
export default {
  name: 'App',
  components: {
    MyHeader, MyPlayer, MyFooter, MyList
  },
  data () {
    return {
      chimee: {},
      id: 'player',
      isPlaying: false,
      isListActive: false
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
  mounted () {
    this.init()
    this.initEvent()
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
    },
    /**
     * 每次显示列表时，需要通知主进程宽度增加300px
     * 因为 app 的高宽用的vh,vw
     */
    isListActive (val) {
      ipcRenderer.send('msg_showList', val)
    }
  },
  methods: {
    init () {
      const chimee = new Chimee({
        wrapper: '#' + this.id,
        src: 'http://chimee.org/vod/1.mp4',
        controls: false,
        autoload: true
      })
      this.chimee = chimee
    },
    initEvent () {
      this.chimee.on('timeupdate', evt => {
        this.$refs.footer.updatePass()
      })
      this.chimee.on('durationchange', evt => {
        this.$refs.footer.updateTotal()
      })
    },
    createWindow () {
      ipcRenderer.send('msg_render2main', { name: '123' }, { name: '222' })
    }
  }
}
</script>

<style lang='less'>
*{
  margin: 0;
  padding: 0;
}
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
  overflow: hidden;
  & > .app-header{
    flex: 0 1 auto;
  }
  & > .app-main{
    height: calc(100vh - 35px);
    flex: 1;
    display: flex;
    & > .app-left{
      flex: 1;
      display: flex;
      flex-direction: column;
      & > .player{
        flex: 1;
      }
      & > .footer{
        flex: 0 1 auto;
      }
    }
    & > .app-right{
      flex: 0 1 auto;
    }
  }
}
</style>
