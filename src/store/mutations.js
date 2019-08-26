export default {
    toggleGeolocationAvailability(state, value) {
        state.geolocation.available = value;
    },
    setCoords(state, value) {
        state.geolocation.coords = value;
    },
    setWeatherData(state, data) {
        state.weather.data = data;
    },
    setForecastData(state, data) {
        state.weather.forecast = data;
    },
    setCityPredictions(state, data) {
        state.geolocation.predictions = data;
    },
    setWeatherCity(state, value) {
        state.weather.city = value;
    },
    setFetchedType(state, value) {
        if (value === 'city') {
            state.weather.by_city = true;
        } else if (value === 'coords') {
            state.weather.by_coords = true;
        }
    },
    clearWeatherData(state) {
        state.weather.data = undefined; 
    }
};
