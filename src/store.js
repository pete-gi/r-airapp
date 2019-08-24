import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        geolocation: {
            available: false,
            coords: undefined
        },
        background: {
            default: 'bg-default.jpg',
            image: undefined,
        }
    },
    getters: {
        geolocation: state => {
            return state.geolocation;
        }
    },
    mutations: {
        toggleGeolocationAvailability(state, value) {
            state.geolocation.available = value;
        },
        setCoords(state, value) {
            state.geolocation.coords = value;
        }
    },
    actions: {}
});
