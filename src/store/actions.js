import Vue from 'vue';


const CITY_API = `https://api.teleport.org/api/cities/`;
const UNITS = '&units=metric';

const WEATHER_KEY = '6c585d5c8f426b70249e5bf9d8182196';
const WEATHER_API_KEY = `?appid=${WEATHER_KEY}`;
const WEATHER_API_BASE = `http://api.openweathermap.org/data/2.5`;
const WEATHER_API_WEATHER = `${WEATHER_API_BASE}/weather${WEATHER_API_KEY}${UNITS}`;
const WEATHER_API_HOURLY_FORECAST = `${WEATHER_API_BASE}/forecast/hourly${WEATHER_API_KEY}${UNITS}`;

function get_data(url) {
    return new Promise((resolve, reject) => {
        Vue.http
            .get(url)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function commit_response(commit, response) {
    commit('setWeatherData', response);
}

function throw_error(error, message) {
    console.error(message);
    console.error(error);
}

export default {
    getCityByCoords({ commit, getters }) {
        const { lat, lng } = getters.geolocation.coords;
        const url = `https://api.teleport.org/api/locations/${lat},${lng}/`;
        return new Promise((resolve, reject) => {
            Vue.http
                .get(url)
                .then(response => {
                    let result =
                        response.body._embedded['location:nearest-cities'][0]
                            ._links['location:nearest-city'].name;
                    commit('setWeatherCity', result);
                    resolve(result);
                })
                .catch(error => {
                    console.error(errorMessage);
                    console.error(error);
                    reject(error);
                });
        });
    },
    getCityByInput({ commit }, value) {
        const url = `${CITY_API}?search=${value}`;
        const errorMessage = "Couldn't get the city";
        return new Promise((resolve, reject) => {
            Vue.http
                .get(url)
                .then(response => {
                    let results =
                        response.body._embedded['city:search-results'];
                    commit('setCityPredictions', results);
                    resolve(results);
                })
                .catch(error => {
                    console.error(errorMessage);
                    console.error(error);
                    reject(error);
                });
        });
    },
    getHourlyForecastByCityName({ commit, getters }) {
        let city = getters.weather.city;
        const url = `${WEATHER_API_HOURLY_FORECAST}&q=${city}`;
        const errorMessage = "Couldn't get weather by your city name";
        get_data(url)
            .then(response => {
                commit_response(commit, response.body)
                commit('setFetchedType', 'city')
            })
            .catch(error => throw_error(error, errorMessage));
    },
    getHourlyForecastByGeolocation({ commit, getters }) {
        let geolocation = getters.geolocation;
        const { lat, lng } = geolocation.coords;
        const url = `${WEATHER_API_HOURLY_FORECAST}&lat=${lat}&lon=${lng}`;
        const errorMessage = "Couldn't get weather using your coordinates";
        get_data(url)
            .then(response => {
                commit_response(commit, response.body)
                commit('setFetchedType', 'coords')
            })
            .catch(error => throw_error(error, errorMessage));
    },
    getWeatherByCityName({ commit, getters }) {
        let city = getters.weather.city;
        let url = `${WEATHER_API_WEATHER}&q=${city}`;
        const errorMessage = "Couldn't get weather by your city name";
        get_data(url)
            .then(response => {
                commit_response(commit, response.body)
                commit('setFetchedType', 'city')
            })
            .catch(error => throw_error(error, errorMessage));
    },
    getWeatherByGeolocation({ commit, getters }) {
        let geolocation = getters.geolocation;
        const { lat, lng } = geolocation.coords;
        const url = `${WEATHER_API_WEATHER}&lat=${lat}&lon=${lng}`;
        const errorMessage = "Couldn't get weather using your coordinates";
        get_data(url)
            .then(response => {
                commit_response(commit, response.body)
                commit('setFetchedType', 'coords')
            })
            .catch(error => throw_error(error, errorMessage));
    }
};
