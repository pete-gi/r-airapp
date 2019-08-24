export const WeatherService = {
    methods: {
        getWeatherByGeolocation() {
            this.$store.dispatch('getWeatherByGeolocation');
        }
    }
}