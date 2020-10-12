<template>
  <div class="player">
    <div
      :id="id"
      style="height: 100%;width: 100%;"
    />
  </div>
</template>

<script>
/**
 * 播放界面
 */
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>

</style>