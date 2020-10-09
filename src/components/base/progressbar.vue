<template>
  <div
    class="cevideo-progress-wrap"
    :class="[mode]"
  >
    <div class="cevideo-progress-line all" />
    <div class="cevideo-progress-line active" />
    <div class="cevideo-progress-bar" />
  </div>
</template>

<script>
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