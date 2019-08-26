import Vue from 'vue';

const CITY_API = `https://api.teleport.org/api/cities/`;
const LOCATIONS_API = `https://api.teleport.org/api/locations/`;
const UNITS = '&units=metric';

const WEATHER_KEY = '6c585d5c8f426b70249e5bf9d8182196';
const WEATHER_API_KEY = `?appid=${WEATHER_KEY}`;
const WEATHER_API_BASE = `http://api.openweathermap.org/data/2.5`;
const WEATHER_API_WEATHER = `${WEATHER_API_BASE}/weather${WEATHER_API_KEY}${UNITS}`;
const WEATHER_API_HOURLY_FORECAST = `${WEATHER_API_BASE}/forecast/hourly${WEATHER_API_KEY}${UNITS}`;
const WEATHER_API_5_DAYS = `${WEATHER_API_BASE}/forecast${WEATHER_API_KEY}${UNITS}`;

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
        const url = `${LOCATIONS_API}${lat},${lng}/`;
        return new Promise((resolve, reject) => {
            Vue.http
                .get(url)
                .then(response => {
                    let result =
                        response.body._embedded['location:nearest-cities'][0]
                            ._links['location:nearest-city'];
                    let regex = /([0-9])\w+/;
                    let cityID = result.href.match(regex)[0];
                    commit('setWeatherCity', cityID);
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
    getHourlyForecast({ commit, getters }) {
        let city = getters.weather.city;
        const url = `${WEATHER_API_HOURLY_FORECAST}&id=${city}`;
        const errorMessage = "Couldn't get weather";
        get_data(url)
            .then(response => {
                commit_response(commit, response.body);
            })
            .catch(error => throw_error(error, errorMessage));
    },
    get5DaysForecast({ commit, getters }) {
        let city = getters.weather.city;
        const url = `${WEATHER_API_5_DAYS}&id=${city}`;
        const errorMessage = "Couldn't get weather";
        get_data(url)
            .then(response => {
                commit_response(commit, response.body);
            })
            .catch(error => throw_error(error, errorMessage));
    },
    getCurrentWeather({ commit, getters }) {
        let city = getters.weather.city;
        let url = `${WEATHER_API_WEATHER}&id=${city}`;
        const errorMessage = "Couldn't get weather";
        get_data(url)
            .then(response => {
                commit_response(commit, response.body);
            })
            .catch(error => throw_error(error, errorMessage));
    }
};
