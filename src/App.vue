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
        BackgroundService
    } from '@/services/BackgroundService'
    export default {
        components: {
            AppBackground,
            AppHeader,
            AppFooter
        },
        mixins: [
            GeolocationService,
            BackgroundService,
        ],
        created() {
            this.checkForGeolocation();
            if (this.geolocation.available) {
                this.getCoords();
                this.getBackground();
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

        @media screen and (min-width: 76rem) {
            width: 72rem;
        }

        @media screen and (min-width: 96rem) {
            width: 65%;
        }

        @media screen and (min-width: 120rem) {
            width: 50%;
        }

        @media screen and (min-width: 160rem) {
            width: 35%;
        }
    }
</style>