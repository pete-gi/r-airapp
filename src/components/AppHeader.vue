<template>
    <header class="app-header">
        <div class="app-header__logo">
            <div class="app-header__logo-icon">
                <icon-clouds stroke="#fff"></icon-clouds>
            </div>
            <h1 class="app-header__logo-text">
                AirApp
            </h1>
        </div>
    </header>
</template>

<script>
    import IconClouds from '@/svg/cloudy';
    export default {
        components: {
            IconClouds
        }
    }
</script>

<style lang="scss">
    .app-header {
        margin-top: auto;

        &__logo {
            display: flex;
            justify-content: center;
            align-items: center;

            &-icon {
                width: 6.4rem;
                height: 6.4rem;
            }

            &-text {
                color: white;
            }
        }
    }
</style>