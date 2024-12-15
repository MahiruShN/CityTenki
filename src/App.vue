<template>
    <div class="flex flex-col min-h-screen font-Roboto bg-weather-primary2">
        <SiteNavigation/>
        <RouterView/>
    </div>
</template>

<script setup>
    import {RouterView} from "vue-router"
    import SiteNavigation from "./components/SiteNavigation.vue";
    import { onMounted } from 'vue';

onMounted(() => {
  document.title = 'CityTeki';
});
    
</script>
<style lang="scss" scoped></style>