<template>
    <div id="app" class="app">
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
    import AppHeader from '@/components/AppHeader';
    import AppFooter from '@/components/AppFooter';
    export default {
        components: {
            AppHeader
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