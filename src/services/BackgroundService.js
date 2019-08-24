export const BackgroundService = {
    computed: {
        background() {
            return this.$store.getters['background'];
        }
    },
    methods: {
        getBackground() {
            // this.$store.dispatch()
            // let city = this.weather.data.city;
            // console.log(city);
            
        }
    }
}