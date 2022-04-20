<template>
{{ message }}
aaaaa
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
export default defineComponent({
    setup(){
        const message = ref<string>("Abb")
        return {
            message
        }
    }
})
</script>