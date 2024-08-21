<template>
    <section class="image-background px-5 lg:px-16 pt-[50px]">
        <Navbar :single="false"/>
        <div class="mt-10 lg:mt-[298px] pb-20 flex flex-col lg:flex-row items-center justify-between">
            <h1 class="hidden lg:block text-[32px] font-sans text-white">Ready to Rock? Discover the <br></br> Hottest Events Here –
                Your <br></br> Calendar's New Best Friend!</h1> 
            <h1 class="lg:hidden block text-center text-[32px] font-sans text-white my-4">Ready to Rock? Discover the Hottest Events Here – Your Calendar's New Best Friend!</h1>
            <div class="flex flex-col lg:flex-row items-center justify-center w-full lg:w-1/2 gap-3 bg-white p-6 rounded-[10px]">
                <div class="relative pr-2 lg:border-r-2">
                    <input type="text" class="pl-8 py-4 w-full" placeholder="Search for an event">
                    <img class="absolute top-[1.3rem] left-2" src="../assets/images/Search.svg"/>
                </div>
                <CustomSelect :options="['All', 'Summit','Musical', 'Conference','Meetup','Religious', 'Tech', 'Health', 'Fitness', 'Sports', 'Fashion', 'Fundraising', 'Education','Others']" :default="'Categories'" class="select" @input="updateSearch" />
                <button @click="fetchRequest" class="py-2.5 px-6 bg-purple-2 text-white font-mono rounded-[20px]">Search</button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import CustomSelect from '@/components/CustomSelect.vue';

const router = useRouter();

let query = ref("");

const updateSearch = (searchQuery) => {
  query.value = searchQuery.toLowerCase();
};

const fetchRequest = () =>{
    router.push(`/events/${query.value}`)
};

</script>

<style scoped>
.image-background {
    width: 100%;
    /* height: 80vh; */
    position: relative;
    background-attachment: local;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-image: url('../assets/images/bg.png');
}
</style>