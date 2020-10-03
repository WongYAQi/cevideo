<template>
  <div class='header'>
    <div class='logo'>
      <span>Potplayer</span>
      <i class='fa fa-chevron-down' />
    </div>
    <div class='title' />
    <div class='bargroup' @click='handleTitleBar'>
      <div>
        <i class='fa fa-thumb-tack' title='置顶' data-click='top' />
      </div>
      <div>
        <i class='fa fa-window-minimize' title='最小化' data-click='mini' />
      </div>
      <div>
        <i class='fa fa-window-maximize' title='最大化' :data-click='isMaximize? "unmax" : "max"' />
      </div>
      <div>
        <i class='fa fa-arrows-alt' title='全屏' data-click='full' />
      </div>
      <div>
        <i class='fa fa-close' title='关闭' data-click='close' />
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
  methods: {
    handleTitleBar (event) {
      let type = event.target.getAttribute('data-click')
      let types = ['top', 'mini', 'max', 'unmax', 'full', 'close']
      if (types.includes(type)){
        ipcRenderer.send('TitleBar', type)
      }
      if (type === 'max') {
        this.isMaximize = true
      } else if (type === 'unmax') {
        this.isMaximize = false
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
  .logo{
    -webkit-app-region: no-drag;
    width: 90px;
    flex: 0 1 auto;
    border: 1px solid #000;
    line-height: 31px;
    font-size: 12px;
  }
  .title{
    flex: 1;
    border: 1px solid #000;
  }
  .bargroup{
    flex: 0 1 auto;
    -webkit-app-region: no-drag;
  }
  .bargroup{
    border: 1px solid #000;
    & > div{
      display: inline-block;
      width: 25px;
      height: 25px;
      i{
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        font-size: 12px;
        color: #767676;
        &:hover{
          color: #FAE100;
          cursor: pointer;
        }
      }
    }
  }
}
</style>