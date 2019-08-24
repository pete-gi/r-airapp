import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const oldkey = 'f9e47aed091cc0d99f55ae85eb5504e6';
const newkey = '6c585d5c8f426b70249e5bf9d8182196';
const API_KEY = `?appid=${oldkey}`;
const API_BASE = `https://api.openweathermap.org/data/2.5/forecast/hourly${API_KEY}`;

export default new Vuex.Store({
    state: {
        geolocation: {
            available: false,
            coords: {
                lat: 0,
                lng: 0
            }
        },
        background: {
            default: '/bg-default.jpg',
            image: undefined
        },
        weather: {
            data: {}
        }
    },
    getters: {
        geolocation: state => {
            return state.geolocation;
        },
        background: state => {
            return state.background;
        },
        weather: state => {
            return state.weather;
        }
    },
    mutations: {
        toggleGeolocationAvailability(state, value) {
            state.geolocation.available = value;
        },
        setCoords(state, value) {
            state.geolocation.coords = value;
        },
        setWeatherData(state, data) {
            state.weather.data = data;
        }
    },
    actions: {
        getWeatherByGeolocation({ commit, getters }) {
            return new Promise((resolve, reject) => {
                let geolocation = getters['geolocation'];
                let { lat, lng } = geolocation.coords;
                let url = `${API_BASE}&lat=${lat}&lon=${lng}`;
                Vue.http.get(url)
                    .then(response => response.json())
                    .then(response => {
                        commit('setWeatherData', response);
                        resolve(response);
                    })
                    .catch(error => {
                        console.error(
                            "Couldn't get weather using your coordinates"
                        );
                        console.error(error);
                        reject(error);
                    });
            });
        },
        getBackground() {

        }
    }
});
