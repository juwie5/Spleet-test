<template>
  <nav class="hidden lg:block  py-4 px-6 mx-auto rounded-[20px]"
        :class="[!single ? 'bg-[#FFFFFF99]': '']" >
      <div class="flex items-center justify-between">
        <div>
          <RouterLink to="/">
            <img src="../assets/images/logo.svg" alt="">
          </RouterLink>
         
        </div>
        <div class="flex items-center justify-center gap-6">
          <RouterLink to="/" class="text-purple font-sans text-base border-b-[2.5px] border-purple ">Discover</RouterLink>
          <RouterLink to="/" class="text-purple font-sans text-base">About us</RouterLink>
          <RouterLink to="/" class="text-purple font-sans  text-base">FAQs</RouterLink>
          <RouterLink  to="/" class="text-purple font-sans text-base">Contact us</RouterLink>
        </div>
        <div class="flex items-center gap-6">
          <RouterLink to="/" class="text-purple font-sans  text-base">Login</RouterLink>
          <RouterLink to="/" class="py-3 px-8 bg-purple-2 text-white font-sans  rounded-[10px]">Sign up</RouterLink>
        </div>
      </div>
  </nav>
  <nav class="lg:hidden w-full mx-auto rounded-[20px] p-3"
         :class="[!single ? 'bg-[#FFFFFF99]': '']"> 
    <div class="flex items-center justify-between">
        <div class="w-full flex items-center justify-between">
          <RouterLink to="/">
            <img src="../assets/images/logo.svg" alt="">
          </RouterLink>
          <img @click="showMobileNav" src="../assets/icons/hambuger.svg">
        </div>  
    </div>
    <div class="flex flex-col" v-if="show">
           <div class="flex flex-col items-center justify-center gap-6">
              <RouterLink to="/" class="text-purple font-sans text-base">Discover</RouterLink>
              <RouterLink to="/" class="text-purple font-sans text-base">About us</RouterLink>
              <RouterLink to="/" class="text-purple font-sans  text-base">FAQs</RouterLink>
              <RouterLink  to="/" class="text-purple font-sans text-base">Contact us</RouterLink>
           </div>
            <div class="flex flex-col items-center gap-6">
              <RouterLink to="/" class="text-purple font-sans  text-base">Login</RouterLink>
              <RouterLink to="/" class="py-3 px-8 bg-purple-2 text-white font-sans  rounded-[10px]">Sign up</RouterLink>
            </div> 
        </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

defineProps({
  single: Boolean
});

let show = ref(false);

const showMobileNav = () => {
  show.value = !show.value;
};

</script>

<style  scoped>

/* a.router-link-exact-active {
    border-bottom: 2.5px solid #432361;
    padding-bottom: 3px;
}  */

</style>
