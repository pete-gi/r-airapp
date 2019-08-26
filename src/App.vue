<template>
    <div id="app" class="app">
        <app-background></app-background>
        <div class="app-container">
            <AppHeader></AppHeader>
            <transition name="fade">
                <router-view></router-view>
            </transition>
            <AppFooter></AppFooter>
        </div>
    </div>
</template>

<script>
    import AppBackground from '@/components/AppBackground';
    import AppHeader from '@/components/AppHeader';
    import AppFooter from '@/components/AppFooter';
    import {
        GeolocationService
    } from '@/services/GeolocationService'
    import {
        WeatherService
    } from '@/services/WeatherService'
    export default {
        components: {
            AppBackground,
            AppHeader,
            AppFooter
        },
        mixins: [
            GeolocationService,
            WeatherService,
        ],
        created() {
            this.checkForGeolocation();
            if (this.geolocation.available) {
                this.getCoords();
                // this.getBackground();
            }
        }
    }
</script>

<style lang="scss">
    @import '@/assets/style.scss';

    .app-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        justify-content: center;
        align-items: center;
        padding: 0 1.5rem;
        margin: 0 auto;
        position: relative;
        z-index: 1;

        @media screen and (min-width: 760px) {
            width: 72rem;
        }

        @media screen and (min-width: 960px) {
            width: 65%;
        }

        @media screen and (min-width: 1200px) {
            width: 30%;
        }
    }
</style>