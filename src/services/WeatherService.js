export const WeatherService = {
    computed: {
        weather() {
            return this.$store.getters.weather.data;
        },
        is_fetched_by_city() {
            return this.weather.by_city;
        },
        is_fetched_by_coords() {
            return this.weather.by_coords;
        },
        temp() {
            return this.weather.main;
        },
        date() {
            let date = new Date();
            let d = date.getDay();
            let m = date.getMonth();

            let day = d.toString().length === 1 ? `0${d}` : d;
            let month = m.toString().length === 1 ? `0${m}` : m;

            let year = date.getFullYear();
            return `${day}.${month}.${year}`;
        },
        location() {
            let name = this.weather.name;
            let country = this.weather.sys.country;
            return `${name}, ${country}`;
        },
        description() {
            return this.weather.weather[0].description;
        }
    },
    methods: {
        getHourlyForecastByCityName() {
            this.$store.dispatch('getHourlyForecastByCityName');
        },
        getHourlyForecastByGeolocation() {
            this.$store.dispatch('getHourlyForecastByGeolocation');
        },
        getWeatherByCityName() {
            this.$store.dispatch('getWeatherByCityName');
        },
        getWeatherByGeolocation() {
            this.$store.dispatch('getWeatherByGeolocation');
        }
    }
};
