import Vue from 'vue';
import Vuex from 'vuex';
import VueCookies from 'vue-cookies';
import { getCurrentPosition, getUserIp, loadFromStorage, saveToStorage } from '../service/util.service';
import { accuweatherService } from '../service/http.service';

Vue.use(Vuex, VueCookies)

export default new Vuex.Store({
  state: {
    favorite: loadFromStorage('save') || [],
    location: {
      key: window.$cookies.get("locKey") || "215854",
      name: window.$cookies.get("locName") || "Tel Aviv",
      search: false,
    },
    ip: null,
    currentLocation: null,
    weather: {
      hourData: null,
      fiveDayData: null
    },
    results: null,
    isCelsius: window.$cookies.get("isCelsius") || true
  },
  getters: {
    getIp(state) {
      return state.ip;
    },
    getCurrentLocation(state) {
      return state.currentLocation;
    },
    getLocation(state) {
      return state.location;
    },
    getWeather(state) {
      return state.weather;
    },
    getResults(state) {
      return state.results;
    },
    getFavorite(state) {
      return state.favorite;
    },
    getIsCelsius(state) {
      return state.isCelsius;
    }
  },
  mutations: {
    setIp(state, { ip }) {
      state.ip = ip;
    },
    setCurrentLocation(state, { location }) {
      state.currentLocation = location;
    },
    setResults(state, { results }) {
      state.results = results;
    },
    setLocation(state, { location }) {
      state.location = location;
    },
    setWeather(state, { hourData, fiveDayData }) {
      state.weather = { hourData, fiveDayData };
    },
    setFavorite(state, { favorite }) {
      state.favorite = favorite;
    },
    toggleCelsius(state) {
      state.isCelsius = !state.isCelsius;
    }
  },
  actions: {
    async setIp({ commit }) {
      try {
        const ip = await getUserIp();
        commit({ type: 'setIp', ip });
        return ip;
      } catch (err) {
        console.log(err);
      }
    },
    async setCurrentLocation({ commit }) {
      try {
        const location = await getCurrentPosition();
        commit({ type: 'setCurrentLocation', location });
        return location;
      } catch (err) {
        console.log(err);
      }
    },
    async setCities({ state, commit }, { value }) {
      try {
        if (value) {
          const results = await accuweatherService.cities(value);
          commit({ type: "setResults", results: results.data });
          return results;
        } else {
          const { currentLocation, ip } = state;
          const results = await accuweatherService.city(currentLocation, ip);
          commit({ type: "setLocation", location: { key: results.data.Key, name: results.data.EnglishName } });
        }
      } catch (err) {
        console.log(err);
      }
    },
    setLocation({ commit }, { location }) {
      commit({ type: "setLocation", location });
    },
    setFavorite({ state, commit }) {
      const { key, name } = state.location;
      const favorite = [...state.favorite];
      const weather = state.weather;
      const idx = favorite.findIndex(fav => fav.id === key);
      if (idx > -1) {
        favorite.splice(idx, 1);
      } else {
        favorite.push({ id: key, key, name, lastData: { updatedAt: Date.now(), ...weather } });
      }
      saveToStorage('save', favorite);
      commit({ type: "setFavorite", favorite });
    },
    async setWeather({ state, commit, dispatch }) {
      commit({ type: "setWeather", hourData: null, fiveDayData: null });
      if (!state.location.search) {
        await dispatch({ type: "setIp" });
        await dispatch({ type: "setCurrentLocation" });
        await dispatch({ type: "setCities" });
      }
      const hourData = await accuweatherService.hour(state.location);
      const fiveDayData = await accuweatherService.fiveDays(state.location);
      commit({ type: "setWeather", hourData: hourData.data[0], fiveDayData: fiveDayData.data });
      const favorite = state.favorite.map(fav => fav.id === location.key ? { ...fav, lastData: { updatedAt: Date.now(), hourData: hourData.data[0], fiveDayData: fiveDayData.data } } : fav);
      saveToStorage('save', favorite);
      commit({ type: "setFavorite", favorite });
    },
    toggleCelsius({ state, commit }) {
      window.$cookies.set('isCelsius', !state.isCelsius);
      commit({ type: "toggleCelsius" });
    }
  },
  modules: {
  }
})
