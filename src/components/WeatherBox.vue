<template>
    <div class="weather-box">
        <div class="weather-temperature">
            {{temp.temp}}<sup>o</sup>C
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
</template>

<script>
    import {
        WeatherService
    } from '@/services/WeatherService'
    export default {
        mixins: [
            WeatherService
        ]
    }
</script>

<style lang="scss">
    .weather-box {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 2rem 1.5rem;
        background-color: rgba(white, 0.35);
        color: white;
        position: relative;
    }

    .weather {
        &-temperature {
            font-size: 3rem;
            font-weight: var(--bold);
            padding-right: 1rem;
        }

        &-info {
            padding-left: 1rem;
            font-size: 1.3rem;
            display: flex;
            flex-direction: column;

            &>p {
                margin: 0.5rem 0;
            }
        }
    }

    .more-button {
        position: absolute;
        right: 0;
        bottom: 0;
        padding: 0.5rem;
        font-size: 1.4rem;
        font-weight: var(--bold);
        color: white;
        text-decoration: none;
        text-transform: uppercase;
    }
</style>