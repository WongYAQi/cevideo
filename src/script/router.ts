import axios from './axios'
/**
 * 加载j视频文件
 * @param src
 */
export function load (src: string) {
  return axios.post('./load', { src })
}
