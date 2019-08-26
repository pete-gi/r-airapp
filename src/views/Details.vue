<template>
    <main v-if="forecast" class="app-content main">
        <div class="weather-bar">
            <p class="weather-date">
                <b>Date: </b>{{date}}
            </p>
            <p class="weather-location">
                <b>Location: </b>{{location}}
            </p>
        </div>
        <div class="weather-list">
            <header class="weather-list__header">
                <div class="weather-list__column-name">
                    Hour
                </div>
                <div class="weather-list__column-name">
                    Temperature
                </div>
                <div class="weather-list__column-name">
                    Description
                </div>
            </header>
            <div class="weather-list__body">
                <div v-for="(item, i) in forecast.list" :key="i" class="weather-list__row">
                    <template v-if="diffDate(item.dt_txt) || i === 0">
                        <div :class="{'mt': diffDate(item.dt_txt)}" class="weather-list__item weather-list__item--large">
                            {{ getDay(item.dt_txt) }}
                        </div>
                    </template>
                    <template v-else>
                        <div class="weather-list__item">
                            {{ getHour(item.dt_txt) }}
                        </div>
                        <div class="weather-list__item">
                            {{ getTemp(item.main.temp) }}<sup>o</sup>C
                        </div>
                        <div class="weather-list__item">
                            {{ item.weather[0].description }}
                        </div>
                    </template>
                </div>
            </div>
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
        data() {
            return {
                listedDay: undefined
            }
        },
        methods: {
            getDay(value) {
                let date = new Date(value);
                let d = date.getDay();
                let m = date.getMonth();
                let day = d.toString().length === 1 ? `0${d}` : d;
                let month = m.toString().length === 1 ? `0${m}` : m;
                let listedDay = `${day}.${month}`;
                if (this.listedDay !== listedDay) {
                    this.listedDay = listedDay;
                }
                return listedDay;
            },
            getHour(value) {
                let date = new Date(value);
                let h = date.getHours();
                let hour = h.toString().length === 1 ? `0${h}` : h;
                return `${hour}:00`;
            },
            getTemp(value) {
                let temp = new String(value);
                return temp.split('.')[0];
            },
            diffDate(value) {
                let date = new Date(value);
                let h = date.getHours();
                if (h === 0) {
                    return true;
                }
                return false;
            }
        },
        computed: {
            forecast() {
                return this.$store.getters.forecast;
            }
        },
        created() {
            if (this.weather) {
                this.get5DaysForecast();
            } else {
                this.$router.push({
                    name: 'home'
                });
            }
        }
    }
</script>

<style lang="scss">
    .weather-bar {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        padding: 2rem 1.5rem;
        margin-bottom: 1rem;
        background-color: rgba(white, 0.35);
        color: white;
        position: relative;
    }

    .weather-list {
        font-size: 1.2rem;

        &__header {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-column-gap: 0.5rem;
        }

        &__column-name {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 1.5rem 0.5rem;
            font-weight: var(--bold);
        }

        &__body {
            display: flex;
            flex-direction: column;
        }

        &__row {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-column-gap: 0.5rem;
            margin-bottom: 0.5rem;
        }

        &__item {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 1.5rem 0.5rem;
            background-color: rgba(white, 0.35);

            &--large {
                font-size: 2.4rem;
                font-weight: var(--bold);
                grid-column: 1/4;
            }
        }
    }

    .mt {
        margin-top: 1.5rem;
    }
</style>