<template>
    <form @submit.prevent="getWeatherByCityName" class="weather-form form">
        <div class="form__control form__control--wide">
            <input v-model="input" @change="getCitiesListFromInput" id="weather-form-input" type="text" class="input"
                list="predictions-list" autocomplete="off" autofocus>
            <datalist v-if="predictions.length" id="predictions-list" class="datalist" autofocus="true">
                <option v-for="(option, i) in predictions" :key="i" :value="option.matching_full_name">
                    {{option.description}}
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
            getCityByGeolocation() {
                this.is_location_found = false;
                this.getCityByCoords()
                    .then(response => {
                        this.input = response;
                        this.is_location_found = true;
                    })
            },
            getCitiesListFromInput() {
                setTimeout(() => {
                    this.$store.dispatch('getCityByInput', this.input);
                }, 500);
            },
            selectCity() {
                // document.getElementById('weather-form-input').blur();
                // document.getElementById('predictions-list').blur();
                this.$store.commit('setWeatherCity', this.input);
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
        animation: spinAround 1.5s infinite forwards;
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