<template>
  <div class="header">
    <div class="logo controlbar-container c-f">
      <span>Potplayer</span>
      <i class="fa fa-chevron-down" />
    </div>
    <div class="title controlbar-container" />
    <div
      class="bargroup controlbar-container"
      @click="handleTitleBar"
    >
      <div>
        <i
          class="fa fa-thumb-tack c-i"
          title="置顶"
          data-click="top"
        />
      </div>
      <div>
        <i
          class="fa fa-window-minimize c-i"
          title="最小化"
          data-click="mini"
        />
      </div>
      <div>
        <i
          class="fa fa-window-maximize c-i"
          title="最大化"
          :data-click="isMaximize? &quot;unmax&quot; : &quot;max&quot;"
        />
      </div>
      <div>
        <i
          class="fa fa-arrows-alt c-i"
          title="全屏"
          data-click="full"
        />
      </div>
      <div>
        <i
          class="fa fa-close c-i"
          title="关闭"
          data-click="close"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
/**
 * 播放器Header，分别三个部分，左侧logo，中间的视频文件名，右侧的控制按钮
 * 功能分析
 * 1. 缩小
 * 2. 放大，还原
 * 3. 关闭
 * 4. 全屏
 * 5. 置顶
 */
export default {
  data () {
    return {
      isMaximize: false
    }
  },
  mounted () {
    ipcRenderer.on('TitleBar', (event, arg) => {
      console.log(arg)
      this.isMaximize = arg === 'maximize'
    })
  },
  methods: {
    handleTitleBar (event) {
      let type = event.target.getAttribute('data-click')
      let types = ['top', 'mini', 'max', 'unmax', 'full', 'close']
      if (types.includes(type)){
        ipcRenderer.send('TitleBar', type)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.header{
  -webkit-app-region: drag;
  background-color: rgb(21, 21, 21);
  width: 100%;
  height: 31px;
  display: flex;
  .controlbar-container{
    height: 31px;
    line-height: 31px;
  }
  .logo{
    -webkit-app-region: no-drag;
    width: 90px;
    flex: 0 1 auto;
    font-size: 12px;
  }
  .title{
    flex: 1;
  }
  .bargroup{
    flex: 0 1 auto;
    -webkit-app-region: no-drag;
  }
  .bargroup{
    & > div{
      display: inline-block;
      margin: 0 10px;
    }
  }
}
</style>