export default {
    geolocation: state => {
        return state.geolocation;
    },
    background: state => {
        return state.background;
    },
    weather: state => {
        return state.weather;
    },
    predictions: state => {
        return state.geolocation.predictions;
    },
    forecast: state => {
        return state.weather.forecast;
    }
}