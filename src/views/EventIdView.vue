<template>
    <main>
        <section class="p-5 lg:px-16 lg:pt-10">
            <Navbar :single="true"></Navbar>
            <div>
                <img class="w-full aspect-[4/3] lg:aspect-[12/4] rounded-[10px]" :src="`${eventDetails?.event?.imageUrl}`" alt="">
                <div class="flex flex-col lg:flex-row gap-9 py-12">
                    <div class="mb-8 w-4/5">
                        <h1 class="font-sans text-2xl mb-4">{{ eventDetails?.event?.title }}</h1>
                        <div>
                            <div class="flex gap-6 mb-2">
                                <div class="flex items-center gap-1.5">
                                    <img src="../assets/icons/calendar.svg">
                                    <p>{{ eventDetails?.event?.date }}</p>
                                </div>
                                <div class="flex items-center gap-1.5">
                                    <img src="../assets/icons/timer.svg">
                                    <p>{{ eventDetails?.event?.time}}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-1.5 mb-2">
                                <img src="../assets/icons/location.svg">
                                <p>{{ eventDetails?.event?.address }}, {{ eventDetails?.event?.city }}</p>
                            </div>
                            <div class="flex items-center gap-1.5 mb-2">
                                <img src="../assets/icons/user.svg">
                                <p>{{ eventDetails?.event?.organizer?.name }}</p>
                            </div>
                            <div class="flex items-center gap-1.5 mb-2">
                                <img src="../assets/icons/category.svg">
                                <p class="capitalize">{{ eventDetails?.event?.category }}</p>
                            </div>
                        </div>
                        <div class="mt-[50px] mb-5">
                            <h4 class="font-sans text-base">Event description</h4>
                            <article class="font-serif text-base ">
                                {{ eventDetails?.event?.description }}
                            </article>
                        </div>
                        <div>
                            <h4 class="font-sans text-base">Tickets Pricing</h4>
                            <div class="flex gap-16 my-3">
                                <div>
                                    <h5 class="font-momo text-xl">Single</h5>
                                    <p v-if="eventDetails?.event?.price === 0"class="text-purple-3 font-sans text-base">Free</p>
                                    <p v-else class="text-purple-3 font-sans text-base">NGN {{ eventDetails?.event?.price }}</p>
                                </div>
                                <!-- <div>
                                    <h5 class="font-momo text-xl">Pair</h5>
                                    <p class="text-purple-3 font-sans text-base">NGN 9,000</p>
                                </div> -->
                            </div>
                            <button class="py-2.5 px-11 bg-purple-2 text-white font-mono rounded-[10px]">Buy now</button>
                        </div>
                    </div>
                    <div class="">
                        <div class="mb-5">
                            <h4 class="font-sans text-base mb-5">Contact Organizers</h4>
                            <div class="flex gap-6">
                                <a :href="`mailto:${eventDetails?.event?.organizer?.mail}`"><img src="../assets/icons/mail.svg" alt=""></a>
                                <a :href="`mailto:${eventDetails?.event?.organizer?.twitterUrl}`"><img src="../assets/icons/twitter.svg" alt=""></a>
                                <a :href="`mailto:${eventDetails?.event?.organizer?.instagram}`"><img src="../assets/icons/instagram.svg" alt=""></a>
                            </div>
                        </div>
                        <div class="mt-5">
                            <h4 class="font-sans text-base mb-5">Directions</h4>
                            <img src="../assets/images/map.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer />
    </main>
</template>

<script setup>
import { ref, onMounted} from 'vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue'
import { useRoute } from 'vue-router';
import { useSnackbar } from 'vue3-snackbar';
import axios from 'axios';




const route = useRoute();
const snackbar = useSnackbar();

const id = ref(route.params.id);
const eventDetails = ref([]);

const fetchEvent = async() => {
    try {
        const res = await axios.get(`https://rendezvous-events.onrender.com/events/${id.value}`);
        eventDetails.value = res.data.data;
    } catch(err) {
        snackbar.add({
            type: 'error',
            text: `Error fetching events. ${err.message}`
        })
    }
};

onMounted(() => {
    fetchEvent();
})



</script>

<style lang="scss" scoped></style>