<template>
    <button type="button" class="btn btn-primary" @click="clickStartGyrosensor">ジャイロセンサーを有効にする</button>
    <!-- 傾きx -->
    <div class="row">
        <div class="col">
            <div class="form-floating">
            <input type="text" class="form-control" id="inputGyroX" v-model="gyro_x">
            <label for="inputGyroX">x</label>
            </div>
        </div>
    </div>
    <!-- 傾きy -->
    <div class="row">
        <div class="col">
            <div class="form-floating">
            <input type="email" class="form-control" id="floatingInputGrid" placeholder="name@example.com" v-model="gyro_y">
            <label for="floatingInputGrid">y</label>
            </div>
        </div>
    </div>
    <!-- 傾きz -->
    <div class="row">
        <div class="col">
            <div class="form-floating">
            <input type="email" class="form-control" id="floatingInputGrid" placeholder="name@example.com" v-model="gyro_z">
            <label for="floatingInputGrid">z</label>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"

export default defineComponent({
    setup(){
        // const message = ref<string>("Hello TypeScript")
        // const router = useRouter()

        const a = 1;

        // ジャイロセンサーの値
        const gyro_x = ref(0)
        const gyro_y = ref(0)
        const gyro_z = ref(0)

        // 「ジャイロセンサーを有効にする」押下
        const clickStartGyrosensor = () =>{
            //. ユーザーに「許可」を求めるダイアログを表示
            (DeviceOrientationEvent as any).requestPermission().then( function( response: string ){
                alert(response);
                if( response === 'granted' ){
                    // //. 許可された場合のみイベントハンドラを追加できる
                    // window.addEventListener( "deviceorientation", deviceOrientation );
                }
            }).catch( function( e: any ){
                console.log( e );
            });
        }

        const deviceOrientation = ( e: DeviceOrientationEvent) =>{
            //. 通常の処理を無効にする
	        e.preventDefault();
            //alert('aaaaaa')
            if(e.alpha === null || e.beta === null || e.gamma === null) return
            //alert('bbbb')
            //. スマホの傾きを取得
            // iphoneとandroidで向きが逆なので-1を掛けて任意に修正
            gyro_z.value = e.alpha * -1;   //. 北極方向に対する向きの角度 z軸 0 - 360
            gyro_x.value = e.beta * -1;      //. 前後の傾き角度 x軸 -180 - 180
            gyro_y.value = e.gamma * -1;  //. 左右の傾き角度 y軸 -90 - 90
            //alert(gyro_y);
        }

        window.addEventListener( "deviceorientation", deviceOrientation );

        return {
            clickStartGyrosensor,
            gyro_x,
            gyro_y,
            gyro_z,
        }
    }
})
</script>