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
            if (this.weather) {
                let temp = new String(this.weather.main.temp);
                return temp.split('.')[0];
            }
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
            if (this.weather) {
                let name = this.weather.name;
                let country = this.weather.sys.country;
                return `${name}, ${country}`;
            }
        },
        description() {
            if (this.weather) {
                return this.weather.weather[0].description;
            }
        }
    },
    methods: {
        getHourlyForecast() {
            this.$store.dispatch('getHourlyForecast');
        },
        getCurrentWeather() {
            this.$store.dispatch('getCurrentWeather');
        },
        get5DaysForecast() {
            this.$store.dispatch('get5DaysForecast');
        }
    }
};
