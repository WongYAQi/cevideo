<template>
  <div class='cevideo-list' :style='{ width: width + "px" }'>
    <p v-for='item in lists' :key='item.name'
      class='cevideo-list-item'
      :data-name='item.name'
      @dblclick="searchList(item)"
    >
      <i class='fa' :class='item.type === "directory" ? "fa-folder" : "fa-file-video-o"' />
      <span style='margin-left: 5px;'>{{ item.name }}</span>
    </p>
  </div>
</template>

<script>
import axios from '@/script/axios'
export default {
  props: {
    width: {
      type: Number,
      default: '300'
    },
    chimee: Object
  },
  data () {
    return {
      lists: [],
      rootPaths: ['D:\\']
    } 
  },
  mounted () {
    this.loadDirectory(this.rootPaths.join('\\'))
  },
  methods: {
    loadDirectory (src) {
      axios.get('http://localhost:3000/stat?src=' + encodeURIComponent(src)).then(res => {
        this.lists = res.data
      })
    },
    searchList (item) {
      let v = item.name
      if (v === '..' && this.rootPaths.length > 1) {
        this.rootPaths.splice(this.rootPaths.length - 1, 1)
        this.loadDirectory(this.rootPaths.join('\\'))
      } else if (v === '..' && this.rootPaths.length <= 1) {
        this.rootPaths = []
        axios.get('http://localhost:3000/root').then(res => {
          this.lists = res.data
        })
      } else {
        if (item.type === 'directory') {
          this.rootPaths.push(v)
          this.loadDirectory(this.rootPaths.join('\\'))
        } else {
          // 播放文件
          v = this.rootPaths.join('') + v
          if (this.chimee) {
            this.chimee.load('http://localhost:3000/load?src=' + encodeURIComponent(v), {
              volume: 0.5
            })
          }
        }
     }
    }
  }
}
</script>

<style lang='less' scoped>
.cevideo-list{
  height: 100vh;
  background-color: rgb(21, 21, 21);
  overflow: auto;
  .cevideo-list-item{
    line-height: 22px;
    color: #999;
    font-size: 14px;
    text-align: left;
    padding-left: 10px;
    cursor: pointer;
    &:hover{
      background-color: rgba(255, 255, 255, .1);
    }
  }
}
</style>
