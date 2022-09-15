import { OperationCd } from '@/libs/constants'

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

// 操作ログをサーバーに送信する
function sendOperationLog(operation_cd: OperationCd) {
  const obj = { operation_cd: operation_cd }
  const method = 'POST'
  const body = JSON.stringify(obj)
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  fetch('/api/log/operation', { method, headers, body }).then((res) =>
    res.json()
  )
}

export { getParam, sendOperationLog }
