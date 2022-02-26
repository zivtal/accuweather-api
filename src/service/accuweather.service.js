import { httpService } from "./http.service";

// const API_KEY = '';
const API_KEY = 'AbGOocZqkVlAfbNbgogXk6gAhg6tOywB';
const API_LANG = 'en-en';

export const accuweatherService = {
    cities,
    city,
    hour,
    fiveDays
}

async function cities(value) {
    const url = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&language=${API_LANG}&q=${value}`;
    try {
        return await httpService.get(url);
    } catch (err) {
        throw new Error(err);
    }
}

async function city(location, ip) {
    const url = location
        ? `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${location.lat},${location.lng}&language=${API_LANG}&details=false&toplevel=false`
        : `http://dataservice.accuweather.com/locations/v1/cities/ipaddress?apikey=${API_KEY}&q=${ip}&language=${API_LANG}&details=false`;
    try {
        return await httpService.get(url);
    } catch (err) {
        throw new Error(err);
    }
}

async function hour({ key }) {
    const url = `https://dataservice.accuweather.com/forecasts/v1/hourly/1hour/${key}?apikey=${API_KEY}&language=${API_LANG}&details=false&metric=true`;
    try {
        return await httpService.get(url);
    } catch (err) {
        throw new Error(err);
    }
}

async function fiveDays({ key }) {
    const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${API_KEY}&language=${API_LANG}&details=false&metric=true`;
    try {
        return await httpService.get(url);
    } catch (err) {
        throw new Error(err);
    }
}