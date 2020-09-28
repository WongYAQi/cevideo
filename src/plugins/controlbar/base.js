/**
 * 面板控制台Base类
 * 后续所有的控制台元素都通过这个类继承
 * 第一行：视频导航栏，音量开关，音量滚动条
 * 第二行：
 *    左侧： 播放、停止、上一个、下一个、播放时长总时长
 *    右侧：文件列表，控制台
 * 基类主要提供对控制元素的通用方法，不允许涉及业务
 */
export default class Base {
  // QUESTION: 这个 parent 最终会指向 chimeeplugincontrolbar 对象 还是 chimee 对象
  constructor (parent) {
    this.parent = parent
  }
}
