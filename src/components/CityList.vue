<template>
    <div v-for="city in savedCities" :key="city.id">
        <CityCard :city="city" @click="goToCityView(city)"/>

    </div>
    <p v-if="savedCities.length === 0">
    Chưa có địa điểm nào. Bắt đầu tìm kiếm để theo dõi thời tiết của địa điểm đó.
  </p>
</template>

<script setup>
import axios from 'axios';
import CityCard from './CityCard.vue';
import { ref } from "vue";
import { useRouter } from "vue-router";
const savedCities = ref([]);
const getCities = async() => {
    if (localStorage.getItem("savedCities")) {
        savedCities.value = JSON.parse(localStorage.getItem("savedCities"))
        const requests = [];
        savedCities.value.forEach((city) => {
        requests.push(
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${parseFloat(city.coords.lng).toFixed(2)}&exclude={part}&appid=5a6c1287286a4196a4473588fd5ab838&units=metric`)
        )
    });
        
        const weatherData = await Promise.all(requests)

        weatherData.forEach((value,index) => {
            savedCities.value[index].weather = value.data
        })

        console.log(weatherData);
    }

    

}

await getCities();
const router = useRouter();
const goToCityView = (city) => {
    router.push({
        name:'cityView',
        params: {state: city.state, city: city.city},
        query: {id: city.id, lat: city.coords.lat, lng: city.coords.lng}
    })
}
</script>

