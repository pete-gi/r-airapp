<template>
    <main class="app-content main">
        <p class="text-center">
            Check the weather! Enter the ciny name, or <b>leave empty for geolocation</b>
        </p>
        <weather-form></weather-form>
        <weather-box></weather-box>
    </main>
</template>

<script>
import WeatherForm from '@/components/WeatherForm'
import WeatherBox from '@/components/WeatherBox'
export default {
    components: {
        WeatherForm,
        WeatherBox
    }
}
</script>

<style lang="scss">

</style>