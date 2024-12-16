<template>
    <div class="flex flex-col flex-1 items-center">
        <div v-if="route.query.preview" class="text-white p-4
        bg-weather-secondary w-full text-center">
        <p>Xem trước</p>

        </div>
        <div class="flex flex-col items-center text-white py-12">
          
            <div class="weather-wrapper grid gap-8">
   
    <header class="grid justify-items-center text-center mb-12">
        <h1 class="text-4xl">{{ route.params.city }}</h1>
        <p class="text-sm">
            {{ new Date(weatherData.dt).toLocaleDateString("vi-vn", {
                weekday: "long",
                day: "2-digit",
                month: "long",
            }) }},
            {{ new Date(weatherData.dt).toLocaleTimeString("vi-vn", {
                timeStyle: "short",
            }) }}
        </p>
    </header>
    <hr class="border-white border-opacity-10 border w-full" />
    <section class="temperature-info grid justify-items-center">
        <p class="text-8xl">{{ Math.round(weatherData.main.temp) }}&deg;</p>
        <p class="text-m">{{ weatherData.weather[0].description }}</p>
        <img class="w-[150px] h-auto" :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
                " alt="">
    </section>

    <section class="weather-details grid grid-cols-2 gap-4 text-m">
        <p>Độ ẩm: {{ weatherData.main.humidity }}&percnt;</p>
        <p>Nhiệt độ cảm nhận: {{ Math.round(weatherData.main.feels_like) }}&deg;</p>
        <p>Nhiệt độ thấp nhất: {{ Math.round(weatherData.main.temp_min) }}&deg;</p>
        <p>Nhiệt độ cao nhất: {{ Math.round(weatherData.main.temp_max) }}&deg;</p>
        <p>Áp suất: {{ weatherData.main.pressure }} hPa</p>
        <p>Tầm nhìn: {{ weatherData.visibility / 1000 }} km</p>
    </section>

    <section class="wind-sun-info grid grid-cols-2 gap-4 text-m">
        <p>Tốc độ gió: {{ weatherData.wind.speed }} m/s</p>
        <p>Hướng gió: {{ weatherData.wind.deg }}&deg;</p>
        <p>
            Bình minh: {{ new Date((weatherData.sys.sunrise -25200 + weatherData.timezone) * 1000).toLocaleTimeString("vi-vn", {timeStyle: "short"}) }}
        </p>
        <p>
            Hoàng hôn: {{ new Date((weatherData.sys.sunset -25200 + weatherData.timezone)* 1000).toLocaleTimeString("vi-vn", {timeStyle: "short"}) }}
        </p>
    </section>
    <hr class="border-white border-opacity-30 border w-full" />
                <div class="max-w-screen-md w-full py-12">
                    <div class="mx-8 text-white">
                    <h1 class="text-2xl mb-4">Dự báo mỗi 3 tiếng trong 5 ngày tới:</h1>
                    <div v-for="day in forecastData.list" :key="day.dt" class="flex items-center">
                        <p class="flex-1">
                            {{
                                new Date((day.dt -25200 + weatherData.timezone) *1000).toLocaleDateString(
                                    "vi-vn",
                                    {
                                        weekday: "long",
                                    }
                                )
                            }},
                            {{
                                // (weatherData.data.dt-25200 + weatherData.data.timezone) * 1000
            
                                new Date((day.dt -25200 + weatherData.timezone) *1000).toLocaleTimeString(
                                    "vi-vn",
                                    {
                                        timeStyle: "short",
                                    }
                                )
                            }}
                        </p>
                        <img class="w-[50px] h-[50px] object-cover" :src="`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`" alt="">
                        <div class="flex gap-2 flex-1 justify-end">
                            <p>H: {{ Math.round(day.main.temp_max) }}&deg;</p>
                            <p>L: {{ Math.round(day.main.temp_min) }}&deg;</p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
   
        </div>

        <div @click="removeCity" class="flex items-center gap-2 py-12 text-white cursor-pointer
            duration-150 hover:text-red-500">
            <i class="fa-solid fa-trash"></i>
            <p>Xóa</p>
        </div>
    </div>
</template>
  
<script setup>
  import axios from "axios";
  import { useRoute, useRouter } from "vue-router";
  
  const route = useRoute();

  const getForecastData = async () => {
    try {
        parseFloat(route.query.lat).toFixed(2);
        parseFloat(route.query.lng).toFixed(2);
        const forecastData = await axios.get(            
        `https://api.openweathermap.org/data/2.5/forecast?lat=${parseFloat(route.query.lat).toFixed(2)}&lon=${parseFloat(route.query.lng).toFixed(2)}&exclude={part}&appid=5a6c1287286a4196a4473588fd5ab838&units=metric`
        );

       
        
        console.log(forecastData.data)

       
        
        return forecastData.data;
    } catch (err) {
        console.log(err);
    }    
    }
  const getWeatherData = async () => {
    try {
        
        // const latid = (route.query.lat).toFixed(2)
        // const lonid = (route.query.lng).toFixed(2)
        parseFloat(route.query.lat).toFixed(2);
        parseFloat(route.query.lng).toFixed(2);
      const weatherData = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${parseFloat(route.query.lat).toFixed(2)}&lon=${parseFloat(route.query.lng).toFixed(2)}&exclude={part}&appid=5a6c1287286a4196a4473588fd5ab838&units=metric`
      );

      



      //cal current date & time
    //   const localOffset = new Date().getTimezoneOffset() * 60000;
    //   const utc = weatherData.data.dt * 1000 + localOffset;
    //   weatherData.data.dt = utc + 1000 * weatherData.data.timezone;

    weatherData.data.dt = (weatherData.data.dt-25200 + weatherData.data.timezone) * 1000 ;

  
      // cal hourly weather offset
      
       // console.log(weatherData.data)
      
        return weatherData.data;
    } catch (err) {
      console.log(err);
    }


  };
  const weatherData = await getWeatherData();
//const forecastData = forecastData1;

  const forecastData = await getForecastData(); 
const router = useRouter();
const removeCity = () => {
    const cities = JSON.parse(localStorage.getItem('savedCities'))
    const updatedCities = cities.filter((city) => city.id !== route.query.id

)
    localStorage.setItem(
        'savedCities',
        JSON.stringify(updatedCities)
    )
    router.push({
        name:'home'
    })
}
  
</script>