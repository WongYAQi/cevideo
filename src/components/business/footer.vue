<template>
  <div class="footer">
    <div class="row" />
    <div class="row">
      <div class="controlbar-container">
        <i
          class="fa fa-play"
          title="播放"
        />
      </div>
      <div class="controlbar-container">
        <i
          class="fa fa-stop"
          title="停止"
        />
      </div>
      <div class="controlbar-container">
        <i
          class="fa fa-step-backward"
          title="L:后退, R:上一个"
        />
      </div>
      <div class="controlbar-container">
        <i
          class="fa fa-step-forward"
          title="L:前进, R:下一个"
        />
      </div>
      <div class="controlbar-container">
        <i
          class="fa fa-eject"
          title="打开文件"
        />
      </div>
      <div class="controlbar-container bar-time">
        时间
      </div>
      <div class="controlbar-container">
        <i
          class="fa fa-bars"
          title="打开播放列表"
        />
      </div>
    </div>
  </div>  
</template>

<script>
/**
 * 底部菜单栏，控制板等等
 */
export default {

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
  }
  .row{
    & + .row{
      border-top: 1px solid #000;
    }
    display: flex;
    .bar-time{
      flex: 1;
    }
    div{
      flex: 0 1 auto;
      width: 40px;
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>