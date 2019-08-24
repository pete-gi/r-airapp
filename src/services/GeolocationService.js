export const GeolocationService = {
    computed: {
        geolocation() {
            return this.$store.getters['geolocation'];
        }
    },
    methods: {
        checkForGeolocation() {
            if (window.navigator.geolocation) {
                this.$store.commit('toggleGeolocationAvailability', true);
            }
        },
        getCoords() {
            const geolocation = window.navigator.geolocation;
            geolocation.getCurrentPosition((position) => {
                let coords = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                }
                this.$store.commit('setCoords', coords);
            }, (error) => {
                console.error("Couldn't get your location");
                console.error(error);
            });
        }
    }
};
