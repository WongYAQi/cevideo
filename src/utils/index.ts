/**
 * 转换浮点数时间到'分钟:秒'格式
 * @param val 浮点数
 */
export function formatTime (val: number) {
  let v = Math.floor(val)
  let mins = Math.floor(v / 60)
  let secs = v % 60
  let strMins = '00' + mins
  let strSecs = '00' + secs
  return strMins.substring(strMins.length - 2, strMins.length) + ':' + strSecs.substring(strSecs.length - 2, strSecs.length)
}

/**
 * 补零
 * @param num 前端补0位的个数
 */
export function addZeroForward (str: string | number, num: number) {

}