<template>
    <header class="app-header">
        <router-link :to="{name: 'home'}" :class="{'app-header__logo--small': logoSmall}" class="app-header__logo">
            <div class="app-header__logo-icon">
                <icon-clouds stroke="#fff"></icon-clouds>
            </div>
            <h1 class="app-header__logo-text">
                AirApp
            </h1>
        </router-link>
    </header>
</template>

<script>
    import IconClouds from '@/svg/cloudy';
    export default {
        components: {
            IconClouds
        },
        computed: {
            logoSmall() {
                let routeName = this.$route.name;
                if (routeName === 'home') {
                    return false;
                } else {
                    return true;
                }
            }
        }
    }
</script>

<style lang="scss">
    .app-header {
        width: 100%;
        margin-top: auto;

        &__logo {
            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            color: white;

            &--small {
                justify-content: flex-start;

                .app-header__logo {
                    &-icon {
                        transform: scale(0.8);
                    }

                    &-text {
                        font-size: 2.4rem;
                    }
                }
            }

            &-icon {
                width: 6.4rem;
                height: 6.4rem;
                transform-origin: 0 0;
                transform: scale(1);
                // transition: transform 0.2s;
            }

            &-text {
                font-size: 3.2rem;
                // transition: font-size 0.2s;
            }
        }
    }
</style>