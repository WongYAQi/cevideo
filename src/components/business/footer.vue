<template>
  <div class="footer">
    <div class="row">
      <div class="cevideo-progress-wrap" />
      <div class="cevideo-volumn-wrap">
        <i class="fa fa-volume-up" />
      </div>
    </div>
    <div
      class="row"
      @click="handleFooterBarClick"
    >
      <div
        class="controlbar-container"
        data-click="play"
      >
        <i
          class="fa fa-play c-f"
          title="播放"
          data-click="play"
        />
      </div>
      <div class="controlbar-container">
        <i
          class="fa fa-stop c-f"
          title="停止"
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
const { dialog, app } = electron.remote
/**
 * 底部菜单栏，控制板等等
 */
export default {
  methods: {
    handleFooterBarClick (event) {
      let type = event.target.getAttribute('data-click')
      if (type) {
        if (type === 'open') this.handleOpenNewFile()
        else if (type === 'play') this.handlePlay()
      }
    },
    handlePlay () {
      this.$emit('cevideo-play')
    },
    async handleOpenNewFile () {
      // let input = document.createElement('input')
      // input.setAttribute('type', 'file')
      // input.addEventListener('input', event => {
      //   this.$emit('cevideo-load', input.files)
      // })
      // input.click()
      let { filePaths } = await dialog.showOpenDialog({
        title: '这里应该显示当前播放的文件名',
        buttonLabel: '打开',
        defaultPath: 'D:\\', // 默认展示的路径名称是当前文件的路径
        filters: [
          { name: '支持的全部文件', extensions: ["mp4", 'mkv', 'avi', 'wmv'] }
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