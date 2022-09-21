// ①メインスレッドからの通知を受信
self.addEventListener('message', (m) => {
  if (m.data !== 'codedayo') return
  const st = new Date().getTime()
  let num = 0
  for (let i = 0; i < 500000000; i++) {
    // console.log(i)
    num = num + i
  }
  const ed = new Date().getTime()
  console.log('[worker]' + (ed - st))
  self.postMessage(ed - st)
})
