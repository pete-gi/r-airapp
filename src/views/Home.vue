<template>
    <main class="app-content main">
        <p class="text-center">
            Check the weather! Enter the city name, or <b>leave empty for geolocation</b>
        </p>
        <weather-form></weather-form>
        <weather-box v-if="weather"></weather-box>
    </main>
</template>

<script>
    import WeatherForm from '@/components/WeatherForm'
    import WeatherBox from '@/components/WeatherBox'
    import {
        WeatherService
    } from '@/services/WeatherService'
    export default {
        components: {
            WeatherForm,
            WeatherBox
        },
        mixins: [
            WeatherService
        ]
    }
</script>

<style lang="scss">

</style>