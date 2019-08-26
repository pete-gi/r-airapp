export default {
    toggleGeolocationAvailability(state, value) {
        state.geolocation.available = value;
    },
    setCoords(state, value) {
        state.geolocation.coords = value;
    },
    setWeatherData(state, data) {
        state.weather.data = data;
        if ('city' in data) {
            state.weather.city = data.city;
        } else if ('name' in data) {
            state.weather.city = data.name;
        } else if (typeof data.city === 'object' && 'name' in data.city) {
            state.weather.city = data.city.name;
        }
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
    }
};
