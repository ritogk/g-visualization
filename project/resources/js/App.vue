<template>
    <transition name="fade">
      <router-view />
    </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    setup(){
        return {}
    }
})
</script>