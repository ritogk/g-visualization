<!doctype html>
<html lang="ja">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <script>
        // webworker上で半分処理したら速度が速くなるかどうかの実験
        // ■結果
        // メインスレッドオンリー → 7932ms
        // 半分メインスレッド、半分webworker → 4012ms
        // 早くなってる！！

        time_st = new Date().getTime();
        time_ed = null;
        // ①専用ワーカーの作成
        const worker = new Worker("/js/worker.js");
        // ②専用ワーカーにメッセージを送信
        worker.postMessage('codedayo');
        // ③専用ワーカーからの通知を受信
        worker.addEventListener("message", m => {
            console.log('[worker_parent]' + m.data)
            flg2 = true
            time2 = m.data
            if (flg1 == true) {
                // console.log(time1 + time2)
                console.log(new Date().getTime() - time_st)
            }
        });

        flg1 = false
        flg2 = false
        time1 = 0
        time2 = 0


        const st = new Date().getTime()
        let num = 0
        for (let i = 0; i < 500000000; i++) {
            // console.log(i)
            num = num + i
        }
        const ed = new Date().getTime()
        console.log('[main]' + (ed - st))
        flg1 = true
        time1 = ed - st
        if (flg2 == true) {
            // console.log(1)
            //console.log(time1 + time2)
            console.log(new Date().getTime() - time_st)
        }
    </script>

</head>

<body>
    <p>test page</p>
</body>

</html>