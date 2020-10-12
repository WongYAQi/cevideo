<template>
  <div
    class="cevideo-progress-wrap"
    :class="[mode]"
    @click="handleClickProgressBar"
  >
    <div
      class="cevideo-progress-line all"
      ref="all"
    />
    <div
      class="cevideo-progress-line active"
      ref="active"
      :style="{ backgroundColor: color }"
    />
    <div
      class="cevideo-progress-bar"
      ref="bar"
    />
  </div>
</template>

<script>
import { throttle } from 'lodash'
/**
 * 进度条组件，会用在很多的地方，要注意封装好
 * 1. 排版模式，横竖
 * 2. 激活颜色
 * 3. 缓冲背景
 */
export default {
  props: {
    /**
     * mode 参数决进度条j是横向竖向
     * horizontal, vertical
     */
    mode: {
      type: String,
      default: 'horizontal'
    },
    /**
     * 滚动条激活底色
     */
    color: {
      type: String,
      default: '#FAE100'
    },
    /**
     *进度条的百分数， 浮点数
     */
    value: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      barActive: false,
      throttleMoveBar: throttle(this.handleMoveBar, 100)
    }
  },
  computed: {
    isHori () {
      return this.mode === 'horizontal'
    }
  },
  watch: {
    /**
     * 三种模式，点击在all，点击在active，点击在wrap，点击在bar
     */
    value: {
      handler (val) {
        if (this.$el) {
          let domAll = this.$el.querySelector('.all')
          let domActive = this.$el.querySelector('.active')
          let domBar = this.$el.querySelector('.cevideo-progress-bar')
          let v
          if (this.isHori) {
            let width  = domAll.offsetWidth
            v = Math.floor(width * val / 100) + 'px'
            domActive.style.width = v
            domBar.style.marginLeft =  v
          } else {
            let height  = domAll.offsetHeight
            v = Math.floor(height * val / 100) + 'px'
            domActive.style.height = v
            domBar.style.marginBottom =  v
          }
        }
      },
      immediate: true
    }
  },
  mounted () {
    /**
     * 关于拖动的思考，有j几种模式
     * 1. mousedown 时记录bar对应的 clientX，拖动过程中j节流100ms，得到bar的clientX，设置 bar value
     */
    this.$refs.bar.addEventListener('mousedown', evt => {
      this.barActive = true
    })
    // 按钮的拖动效果，节流触发，每100ms改变一次效果
    this.$refs.bar.addEventListener('mousemove', evt => {
      if (this.barActive) {
        this.throttleMoveBar(evt)
      }
    })
    window.addEventListener('mouseup', evt => {
      this.barActive = false
    })
  },
  methods: {
    handleMoveBar (event) {
      console.log(event.target.offsetLeft)
    },
    /**
     * 点击进度条事件，抛出一个百分数给外部组件
     */
    handleClickProgressBar (event) {
      console.log(event)
      if (event.target.classList.contains('cevideo-progress-bar')) return
      if (this.mode === 'horizontal') {
        let active = event.offsetX
        let all = this.$refs.all.offsetWidth
        let value = active * 100 / all
        this.$emit('click', value)
      } else {
        let active = event.offsetY
        let all = this.$refs.all.offsetHeight
        let value = active * 100 / all
        this.$emit('click', value)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.cevideo-progress-wrap{
  position: relative;
  display: inline-block;
  &.horizontal{
    height: 22px;
    width: 100%;
    .cevideo-progress-line{
      height: 3px;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      &.active{
        width: 0;
      }
    }
  }
  &.vertical{
    width: 22px;
    height: 100%;
    .cevideo-progress-line{
      width: 3px;
      height: 100%;
      left: 50%;
      transform: translateX(-50%);
      &.active{
        height: 0;
      }
    }
  }
  .cevideo-progress-line{
    position: absolute;
    background-color: #000;
  }
  .cevideo-progress-bar{
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    background-color: #fff;
  }
}
</style>