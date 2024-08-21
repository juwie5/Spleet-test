<template>
  <RouterView />
</template>

<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import Lenis from "lenis";

onMounted(() => {
  const lenis = new Lenis();
  
  lenis.on("scroll", (e) => {
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
});
</script>



<style scoped>

</style>
