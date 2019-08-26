<template>
    <div class="app-background">
        <img :src="background.image ? background.image : background.default" class="app-background__image" alt="">
    </div>
</template>

<script>
    import {
        BackgroundService
    } from '@/services/BackgroundService';
    export default {
        mixins: [
            BackgroundService
        ]
    }
</script>

<style lang="scss">
    .app-background {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        &__image {
            object-fit: cover;
            object-position: center center;
            width: 100%;
            height: 100%;
        }
    }
</style>