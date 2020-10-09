<template>
  <div class="footer">
    <div class="row">
      <div>
        <ce-progress />
      </div>
      <div>
        <div class="volumn">
          <i class="fa fa-volume-up c-i" />
        </div>
        <div class="progress">
          <ce-progress />
        </div>
      </div>
    </div>
    <div
      class="row"
      @click="handleFooterBarClick"
    >
      <div
        class="controlbar-container"
        :data-click="isPlaying ? 'pause' : 'play'"
      >
        <i
          class="fa c-f"
          :class="isPlaying ? 'fa-pause' : 'fa-play'"
          title="播放"
          :data-click="isPlaying ? 'pause' : 'play'"
        />
      </div>
      <div
        class="controlbar-container"
        ata-click="stop"
      >
        <i
          class="fa fa-stop c-f"
          title="停止"
          data-click="stop"
        />
      </div>
      <div class="controlbar-container">
        <i
          class="fa fa-step-backward c-f"
          title="L:后退, R:上一个"
        />
      </div>
      <div class="controlbar-container">
        <i
          class="fa fa-step-forward c-f"
          title="L:前进, R:下一个"
        />
      </div>
      <div
        class="controlbar-container"
        data-click="open"
      >
        <i
          class="fa fa-eject c-f"
          title="打开文件"
          data-click="open"
        />
      </div>
      <div class="controlbar-container bar-time c-f">
        时间
      </div>
      <div class="controlbar-container">
        <i
          class="fa fa-bars c-f"
          title="打开播放列表"
        />
      </div>
    </div>
  </div>  
</template>

<script>
import electron from 'electron'
import CeProgress from '../base/progressbar'
const { dialog, app } = electron.remote
/**
 * 底部菜单栏，控制板等等
 */
export default {
  components: {
    CeProgress
  },
  props: {
    chimee: Object,
    isPlaying: Boolean
  },
  methods: {
    handleFooterBarClick (event) {
      let type = event.target.getAttribute('data-click')
      if (type) {
        if (type === 'open') this.handleOpenNewFile()
        else if (type === 'play') this.handlePlay()
        else if (type === 'pause') this.handlePlay()
      }
    },
    handlePlay () {
      if (this.isPlaying) this.chimee.pause()
      else this.chimee.play()
    },
    async handleOpenNewFile () {
      let { filePaths } = await dialog.showOpenDialog({
        title: '这里应该显示当前播放的文件名',
        buttonLabel: '打开',
        defaultPath: 'D:\\', // 默认展示的路径名称是当前文件的路径
        filters: [
          { name: '支持的全部文件', extensions: ["mp4", 'avi'] }
        ]
      })
      if (filePaths.length) {
        this.$emit('cevideo-load', filePaths)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.footer{
  height: 62px;
  width: 100%;
  background-color: rgb(21, 21, 21);
  .row:nth-of-type(1){
    height: 22px;
    display: flex;
    line-height: 22px;
    padding: 0 10px;
    & > div:nth-of-type(1){
      flex: 1;
    }
    & > div:nth-of-type(2){
      flex: 0 1 auto;
      position: relative;
      width: 120px;
      margin-left: 10px;
      display: flex;
      .volumn{
        flex: 0 1 auto;
      }
      .progress{
        flex: 1;
        margin-left: 10px;
      }
    }
  }
  .row:nth-of-type(2){
    height: 40px;
    div{
      flex: 0 1 auto;
      width: 40px;
      height: 40px;
      line-height: 40px;
    }
    .bar-time{
      flex: 1;
    }
  }
  .row{
    & + .row{
      border-top: 1px solid #000;
    }
    display: flex;
  }
}
</style>