<template>
    <main class="app-content main">
        <div class="weather-bar">

        </div>
        <div class="weather-box">
            <div class="weather-temperature">
                {{temp}}<sup>o</sup>C
            </div>
            <div class="weather-info">
                <p class="weather-date">
                    <b>Date: </b>{{date}}
                </p>
                <p class="weather-location">
                    <b>Location: </b>{{location}}
                </p>
                <p class="weather-description">
                    <b>Description: </b>{{description}}
                </p>
            </div>
            <router-link :to="{name: 'details'}" class="more-button">More</router-link>
        </div>
    </main>
</template>

<script>
    import {
        WeatherService
    } from '@/services/WeatherService';
    export default {
        mixins: [
            WeatherService
        ],
        mounted() {
            if (!this.weather) {
                this.$router.push({
                    name: 'home'
                });
            } else {
                this.get5DaysForecast();
            }
        }
    }
</script>