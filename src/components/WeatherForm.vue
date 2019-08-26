<template>
    <form @submit.prevent="getCurrentWeather" class="weather-form form">
        <div class="form__control form__control--wide">
            <input v-model="input" @keypress="getCitiesListFromInput" @change="setCityID" id="weather-form-input" type="text" class="input"
                list="predictions-list" autocomplete="off" autofocus>
            <datalist v-if="predictions.length" id="predictions-list" class="datalist" autofocus="true">
                <option v-for="option in predictions" :key="getCityID(option._links['city:item'].href)"
                    :value="option.matching_full_name" :id="getCityID(option._links['city:item'].href)">
                    {{option.matching_full_name}}
                </option>
            </datalist>
        </div>
        <div v-show="!is_location_found" class="form__control">
            <button :disabled="is_location_found === false" @click.prevent="getCityByGeolocation" class="button">
                <template v-if="is_location_found === undefined">
                    Find my location
                </template>
                <template v-else-if="is_location_found === false">
                    <loading-spinner class="spinner"></loading-spinner>
                </template>
            </button>
        </div>
        <div class="form__control">
            <button type="submit" class="button">
                Check
            </button>
        </div>
    </form>
</template>

<script>
    import LoadingSpinner from '@/svg/spinner';
    import {
        setTimeout
    } from 'timers';
    import {
        GeolocationService
    } from '@/services/GeolocationService';
    import {
        WeatherService
    } from '@/services/WeatherService';

    export default {
        components: {
            LoadingSpinner
        },
        mixins: [
            GeolocationService,
            WeatherService
        ],
        data() {
            return {
                id: '',
                input: '',
                is_location_found: undefined
            }
        },
        computed: {
            predictions() {
                return this.$store.getters.predictions;
            }
        },
        methods: {
            getCityID(href) {
                let regex = /([0-9])\w+/;
                let result = href.match(regex)[0];
                return result;
            },
            getCityByGeolocation() {
                this.is_location_found = false;
                this.getCityByCoords()
                    .then(response => {
                        this.input = response.name;
                        this.is_location_found = true;
                    })
            },
            getCitiesListFromInput() {
                setTimeout(() => {
                    this.$store.dispatch('getCityByInput', this.input);
                }, 500);
            },
            setCityID(e) {
                let target = e.target;
                let value = target.value;
                let cityItem = this.predictions.find(p => {
                    return value === p.matching_full_name;
                });
                let id = this.getCityID(cityItem._links['city:item'].href);
                this.id = id;
                this.$store.commit('setWeatherCity', this.id);
            }
        }
    }
</script>

<style lang="scss">
    .form {
        display: grid;
        grid-template-rows: 4rem 4rem;
        grid-row-gap: 1.5rem;
        margin: 2rem 0;

        @media screen and (min-width: 760px) {
            grid-template-rows: auto;
            grid-template-columns: 2fr 1fr;
            grid-row-gap: 0;
            grid-column-gap: 1.5rem;
        }

        &__control {
            flex: 1;
            width: 100%;
            display: flex;
            align-items: stretch;
            font-family: inherit;
            color: white;

            &--wide {
                flex: 2;
            }
        }
    }

    .input {
        height: 4rem;
        border: 1px solid white;
        background-color: rgba(white, 0.35);
        padding: 1rem;
        width: 100%;
    }

    .button {
        height: 4rem;
        border: 0;
        background-color: rgba(white, 0.55);
        width: 100%;
        text-transform: uppercase;
        font-weight: var(--bold);
        position: relative;
    }

    .spinner {
        width: 3rem;
        height: 3rem;
        transform-origin: 50% 50%;
        animation: spinAround 1.5s infinite forwards linear;
    }

    @keyframes spinAround {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
</style>