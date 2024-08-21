<template>
    <section class="p-5 lg:p-16">
        <div class="w-full flex items-center justify-between">
            <h3 class="text-xl lg:text-[32px] font-mono lg:pb-8">Trending events</h3>
            <RouterLink to="/events/trending"
                class="flex items-center justify-between font-mono text-purple text-base">
                View all trending events <svg width="16" height="17" viewBox="0 0 16 17" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <rect width="16" height="16" transform="translate(0 0.5)" fill="white"
                        style="mix-blend-mode:multiply" />
                    <path d="M5 3.5V4.5H11.295L3 12.795L3.705 13.5L12 5.205V11.5H13V3.5H5Z" fill="#432361" />
                </svg>
            </RouterLink>
        </div>
        <div class="flex flex-col lg:flex-row gap-6">
            <div v-for="event in trendingEvent" :key="event.id"  class="flex flex-col items-start border border-[#E0E0E0] w-fit rounded-[10px]">
                <img class="object-cover rounded-t-[10px]" :src="event.imageUrl" alt="event-image">
                <div class="p-6 flex flex-col">
                    <h4 class="font-mono text-base text-black">{{ event.title }}</h4>
                    <p class="font-serif text-sm mb-4 flex items-center gap-2">{{ format(new Date(event.date), "eee,  MMM co")}} <span><svg width="4" height="5" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="2" cy="2.5" r="2" fill="black" />
                    </svg>
                    </span> {{ event.time }}</p>
                    <p class="font-serif text-sm">{{ event.description.split('.', 2).join() }}</p>
                    <RouterLink :to="`/event/${event.id}`" class="flex items-center gap-1 font-mono text-purple text-sm p-2">View details <svg
                            width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="16" height="16" transform="translate(0 0.5)" fill="white"
                                style="mix-blend-mode:multiply" />
                            <path d="M5 3.5V4.5H11.295L3 12.795L3.705 13.5L12 5.205V11.5H13V3.5H5Z" fill="#432361" />
                        </svg></RouterLink>
                </div>
            </div>           
        </div>
        <div class="w-full flex flex-col lg:flex-row items-start justify-between py-8 lg:py-32">
            <div class="w-full lg:w-1/2 my-4">
                <h3 class="text-[32px] font-mono mb-6">Discover a World of Events <br></br> Tailored Just for You.</h3>
                <RouterLink to="/events" class="py-2.5 px-6 bg-purple-2 text-white font-mono rounded-[10px] mb-2 lg:mb-0">View all events</RouterLink>
            </div>
            <div class="flex flex-wrap gap-6 w-full">
                <div class="relative text-white text-center">
                    <img src="../assets/images/online-event.png" alt="online-event">
                    <div class="absolute top-1/2 left-1/2 adjust text-2xl font-mono">Online Events</div>
                </div>
                <div class="relative text-white text-center">
                    <img src="../assets/images/physical-event.png" alt="physical-event">
                    <div class="absolute top-1/2 left-1/2 adjust text-2xl font-mono">Physical Events</div>
                </div>
                <div class="relative text-white text-center">
                    <img src="../assets/images/hybrid-event.png" alt="hybrid-event">
                    <div class="absolute top-1/2 left-1/2 adjust text-2xl font-mono">Hybrid Events</div>
                </div>
                
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { RouterLink } from "vue-router";
import axios from 'axios';
import { useSnackbar } from "vue3-snackbar";
import { format } from 'date-fns';

const snackbar = useSnackbar();


const events = ref([]);
 
const fetchEvents = async() => {
    try{ 
        const res = await axios.get(`https://rendezvous-events.onrender.com/events`);
        events.value = res.data.data.allEvents;
    } catch(err){
        snackbar.add({
            type: 'error',
            text: `Error fetching events. ${err.message}`
        });
    }
};

const trendingEvent = computed(() => {
   return events.value.slice(0,3)
});



onMounted(() => {
    fetchEvents();
})

</script>

<style scoped>
 .adjust{
    transform: translate(-50%, -50%);
 }
</style>