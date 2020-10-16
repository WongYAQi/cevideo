<template>
  <div class='cevideo-list' :style='{ width: width + "px" }'>
    
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: '300'
    }
  }
}
</script>

<style lang='less' scoped>
.cevideo-list{
  height: 100%;
  background-color: gray;
}
</style>
