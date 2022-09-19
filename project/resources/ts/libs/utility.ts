/**
 * 指定したクエリパラメーターの値を取得します。
 * @param name
 * @param url
 * @returns
 */
function getParam(name: string, url: string) {
  if (!url) url = window.location.href
  name = name.replace(/[[\]]/g, '\\$&')
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url)
  if (!results) return ''
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export { getParam }
