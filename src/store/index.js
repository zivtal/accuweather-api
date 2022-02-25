import Vue from 'vue';
import Vuex from 'vuex';
import VueCookies from 'vue-cookies';
import { getCurrentPosition, getUserIp, loadFromStorage, saveToStorage } from '../service/util.service';
import { httpService } from '../service/http.service';

Vue.use(Vuex, VueCookies)

export default new Vuex.Store({
  state: {
    api: {
      // key: "G8JO484eu7AGsERAutseLf78kWsBdrWj",
      key: "1m14clLK2z3qgTKLx5xrSGp4Rc3JcfME",
      lng: "en-en"
    },
    favorite: loadFromStorage('save') || [],
    location: {
      key: window.$cookies.get("locKey") || null,
      name: window.$cookies.get("locName") || null,
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
        const { api } = state;
        if (value) {
          const results = await httpService.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${api.key}&language=${api.lng}&q=${value}`);
          commit({ type: "setResults", results: results.data });
          return results;
        } else {
          if (state.currentLocation) {
            const { lat, lng } = state.currentLocation;
            const results = await httpService.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${api.key}&q=${lat},${lng}&language=${api.lng}&details=false&toplevel=false`);
            commit({ type: "setLocation", location: { key: results.data.Key, name: results.data.EnglishName } });
          } else if (state.ip) {
            const { ip } = state;
            const results = await httpService.get(`http://dataservice.accuweather.com/locations/v1/cities/ipaddress?apikey=${api.key}&q=${ip}&language=${api.lng}&details=false`);
            commit({ type: "setLocation", location: { key: results.data.Key, name: results.data.EnglishName } });
          }
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
      const { api, location } = state;
      const hourData = await httpService.get(`https://dataservice.accuweather.com/forecasts/v1/hourly/1hour/${location.key}?apikey=${api.key}&language=${api.lng}&details=false&metric=true`);
      const fiveDayData = await httpService.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${location.key}?apikey=${api.key}&language=${api.lng}&details=false&metric=true`);
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
