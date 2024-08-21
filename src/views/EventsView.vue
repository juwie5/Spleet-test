<template>
  <main>
    <section class="p-5 lg:px-16 lg:pt-10">
      <Navbar :single="true"></Navbar>
      <h3 class="text-xl lg:text-[32px]font-mono my-5">All Events</h3>
      <div>
        <div v-if="events.length === 0">
          <h1>Opps no events were found. Try again</h1>
        </div>
        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6 my-5">
          <div v-for="event in events" :key="event.id"
            class="flex flex-col items-start border border-[#E0E0E0] w-fit rounded-[10px]">
            <img class="w-full object-cover rounded-t-[10px] h-full max-h-60" :src="event.imageUrl" alt="event-image">
            <div class="p-6 flex flex-col">
              <h4 class="font-mono text-base text-black">{{ event.title }}</h4>
              <p class="font-serif text-sm mb-4 flex items-center gap-2">{{ format(new Date(event.date), "eee, MMM co")
                }}
                <span><svg width="4" height="5" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="2" cy="2.5" r="2" fill="black" />
                  </svg>
                </span> {{ event.time }}
              </p>
              <p class="font-serif text-sm">{{ event.description.split('.', 2).join() }}</p>
              <RouterLink :to="`/event/${event.id}`" class="flex items-center gap-1 font-mono text-purple text-sm p-2">
                View details <svg width="16" height="17" viewBox="0 0 16 17" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <rect width="16" height="16" transform="translate(0 0.5)" fill="white"
                    style="mix-blend-mode:multiply" />
                  <path d="M5 3.5V4.5H11.295L3 12.795L3.705 13.5L12 5.205V11.5H13V3.5H5Z" fill="#432361" />
                </svg></RouterLink>
            </div>
          </div>
        </div>
        <div class="w-full py-2 px-4 flex justify-center gap-5 rounded-b-lg my-3">
          <div>
            <p>Viewing {{ pageRangeStart }} - {{ pageRangeEnd }} of {{ totalData }} </p>
          </div>
          <div class="flex gap-2 items-center">
            <button @click="prevPage">
              <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M24.2656 12.9989C24.2656 19.9015 18.9444 25.4547 12.4316 25.4547C5.91879 25.4547 0.597656 19.9015 0.597656 12.9989C0.597656 6.09619 5.91879 0.542969 12.4316 0.542969C18.9444 0.542969 24.2656 6.09619 24.2656 12.9989Z"
                  fill="white" stroke="#EFF2F7" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M14.5171 8.10729C14.8182 8.42351 14.8182 8.93621 14.5171 9.25243L10.9509 12.9985L14.5171 16.7445C14.8182 17.0608 14.8182 17.5735 14.5171 17.8897C14.2161 18.2059 13.728 18.2059 13.4269 17.8897L9.31563 13.5711C9.01458 13.2548 9.01458 12.7421 9.31563 12.4259L13.4269 8.10729C13.728 7.79106 14.2161 7.79106 14.5171 8.10729Z"
                  fill="#444854" />
              </svg>
            </button>
            <div>
              <span v-for="n in totalPages" @click="updatePage(n)"
                class="px-1.5 text-sm bg-white rounded-full w-6 h-6 text-[#6E717C] text-center mx-1 cursor-pointer"
                :class="[n === page ? 'border-2 border-purple-2' : 'not-active']">{{ n }}</span>
            </div>
            <button @click="nextPage">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M24.6093 12.9989C24.6093 19.9015 19.2882 25.4547 12.7754 25.4547C6.26254 25.4547 0.941406 19.9015 0.941406 12.9989C0.941406 6.09619 6.26254 0.542969 12.7754 0.542969C19.2882 0.542969 24.6093 6.09619 24.6093 12.9989Z"
                  fill="white" stroke="#EFF2F7" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M10.6867 8.10729C10.9878 7.79106 11.4759 7.79106 11.7769 8.10729L15.8882 12.4259C16.1893 12.7421 16.1893 13.2548 15.8882 13.5711L11.7769 17.8897C11.4759 18.2059 10.9878 18.2059 10.6867 17.8897C10.3857 17.5735 10.3857 17.0608 10.6867 16.7445L14.2529 12.9985L10.6867 9.25243C10.3857 8.93621 10.3857 8.42351 10.6867 8.10729Z"
                  fill="#444854" />
              </svg>
            </button>
          </div>
        </div>
      </div>

    </section>
    <Footer />
  </main>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue'
import { useRoute } from 'vue-router';
import { useSnackbar } from 'vue3-snackbar';
import axios from 'axios';
import { format } from 'date-fns';
// import moment from "moment";


const route = useRoute();
const snackbar = useSnackbar();

const category = ref(route.params.category);

const events = ref([]);
let page = ref(1);
let totalPages = ref(0);
let totalData = ref(0);
let pageSize = ref(10);

const fetchAllEvent = async () => {
  if (category.value === "") {
    try {
      const res = await axios.get(`https://rendezvous-events.onrender.com/events?page=${page.value}`);
      events.value = res.data.data.allEvents;
      totalPages.value = res.data.data.noOfPages;
      totalData.value = res.data.data.totalEvents;
    } catch (err) {
      snackbar.add({
        type: 'error',
        text: `Error fetching events. ${err.message}`
      })
    }
  } else {
    try {
      const res = await axios.get(`https://rendezvous-events.onrender.com/events/search?category=${category.value}`);
      events.value = res.data.data.event;
      totalPages.value = res.data.data.noOfPages;
      totalData.value = res.data.data.totalevents;
    } catch (err) {
      snackbar.add({
        type: 'error',
        text: `Error fetching events. ${err.message}`
      })
    }
  }


};

const pageRangeEnd = computed(() => {
  return (pageSize.value * (page.value - 1)) + events.value.length;
});

const pageRangeStart = computed(() => {
  return (pageSize.value * (page.value - 1)) + 1;
});

const prevPage = () => {
  if (page.value == 1) {
    page.value = 1
  } else {
    page.value -= 1;
  }
};

const nextPage = () => {
  if (page.value == totalPages.value) {
    page.value = totalPages.value
  } else {
    page.value += 1;

  }
};

const updatePage = (item) => {
  page.value = item;
};

onMounted(() => {
  fetchAllEvent();
});

watchEffect(() => {
  fetchAllEvent();
});


</script>

<style></style>
