<template>
    {{ message }}
    <button @click="clickBtn()">ボタン</button>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { useRouter } from 'vue-router'

export default defineComponent({
    setup(){
        const message = ref<string>("Hello TypeScript")
        const router = useRouter()

        const clickBtn = () =>{
            router.push({name:'Abb'})
        }
        return {
            message,
            clickBtn
        }
    }
})
</script>