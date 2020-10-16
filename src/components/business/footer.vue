<template>
  <div class="footer">
    <div class="row">
      <div>
        <ce-progress v-model='progressTime' @click="handleClickPass"  />
      </div>
      <div>
        <div class="volumn">
          <i class="fa fa-volume-up c-i" />
        </div>
        <div class="progress">
          <ce-progress v-model='progressVolume' @click="handleClickVolume" />
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
      <div class="controlbar-container" data-click='prev'>
        <i
          class="fa fa-step-backward c-f"
          title="L:后退, R:上一个"
          data-click='prev'
        />
      </div>
      <div class="controlbar-container" data-click='next'>
        <i
          class="fa fa-step-forward c-f"
          title="L:前进, R:下一个"
          data-click='next'
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
        <span>{{ passTime }}</span>
        :
        <span>{{ totalTime }}</span>
      </div>
      <div class="controlbar-container" data-click='list'>
        <i
          class="fa fa-bars c-f"
          title="打开播放列表"
          data-click='list'
        />
      </div>
    </div>
  </div>  
</template>

<script>
import electron from 'electron'
import CeProgress from '../base/progressbar'
import { formatTime } from '../../utils/index'
import axios from '../../script/axios'
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
    isPlaying: Boolean,
    isListActive: Boolean
  },
  data () {
    return {
      passTime: '00:00',
      totalTime: '00:00',
      progressTime: 0,
      progressVolume: 50
    }
  },
  methods: {
    handleFooterBarClick (event) {
      let type = event.target.getAttribute('data-click')
      if (type) {
        if (type === 'open') this.handleOpenNewFile()
        else if (type === 'play') this.handlePlay()
        else if (type === 'pause') this.handlePlay()
        else if (type === 'next') this.handleNext()
        else if (type === 'prev') this.handlePrev()
        else if (type === 'list') this.handleShowList()
      }
    },
    handlePlay () {
      if (this.isPlaying) this.chimee.pause()
      else this.chimee.play()
    },
    handlePrev () {
      this.chimee.pause()
      this.chimee.currentTime -= 2
      if (this.chimee.currentTime > 0.1) {
        this.chimee.play()
      }
    },
    handleNext () {
      this.chimee.pause()
      this.chimee.currentTime += 2
      if (this.chimee.currentTime < this.chimee.duration) {
        this.chimee.play()
      }
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
        let url = encodeURIComponent(filePaths[0])
        this.chimee.load('http://localhost:3000/load?src=' + url, {
          volume: 0.5
        })
      }
    },
    handleClickVolume (val) {
      this.chimee.volume = val / 100
      this.progressVolume = val
    },
    handleClickPass (val) {
      this.chimee.currentTime = val * this.chimee.duration / 100
    },
    handleShowList () {
      this.$emit('update:isListActive', !this.isListActive)
    },
    /**
     * 视频播放时，timeupdate 事件更新播放时间 和 播放进度条
     */
    updatePass () {
      this.passTime = formatTime(this.chimee.currentTime)
      this.progressTime = this.chimee.currentTime * 100 / this.chimee.duration
    },
    /**
     * 视频初始化后，更新总时间
     */
    updateTotal () {
      this.totalTime = formatTime(this.chimee.duration)
      this.progressVolume = this.chimee.volume * 100
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