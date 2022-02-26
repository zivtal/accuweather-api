import axios from "axios";

const API_KEY = 'boGLYLMoKnen6maJhN109G3hp5uVpyPe';
const API_LANG = 'en-en';

export const httpService = {
    get,
    getClientInfo
}

async function get(url) {
    return await axios.get(url);
}

export async function getClientInfo() {
    try {
        const info = await axios.get("https://json.geoiplookup.io");
        return info?.data;
    } catch (err) {
        throw new Error(`can't get user ip address`);
    }
}

export const accuweatherService = {
    cities,
    city,
    hour,
    fiveDays
}

async function cities(value) {
    const url = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&language=${API_LANG}&q=${value}`;
    try {
        return await get(url);
    } catch (err) {
        throw new Error(err);
    }
}

async function city(location, ip) {
    const url = location
        ? `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${location.lat},${location.lng}&language=${API_LANG}&details=false&toplevel=false`
        : `http://dataservice.accuweather.com/locations/v1/cities/ipaddress?apikey=${API_KEY}&q=${ip}&language=${API_LANG}&details=false`;
    try {
        return await get(url);
    } catch (err) {
        throw new Error(err);
    }
}

async function hour({ key }) {
    const url = `https://dataservice.accuweather.com/forecasts/v1/hourly/1hour/${key}?apikey=${API_KEY}&language=${API_LANG}&details=false&metric=true`;
    try {
        return await get(url);
    } catch (err) {
        throw new Error(err);
    }
}

async function fiveDays({ key }) {
    const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${API_KEY}&language=${API_LANG}&details=false&metric=true`;
    try {
        return await get(url);
    } catch (err) {
        throw new Error(err);
    }
}