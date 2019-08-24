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
            return new Promise((resolve, reject) => {
                const geolocation = window.navigator.geolocation;
                geolocation.getCurrentPosition(
                    position => {
                        let coords = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        this.$store.commit('setCoords', coords);
                        resolve(coords);
                    },
                    error => {
                        console.error("Couldn't get your location");
                        console.error(error);
                        reject(error);
                    }
                );
            });
        }
    }
};
