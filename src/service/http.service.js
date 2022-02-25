import axios from "axios";

const API_KEY = 'Lmh9kb08DbA0OsxAM8gqCzXBaEjsaIRt';
const API_LANG = 'en-en';

export const httpService = {
    get
}

export const accuweatherService = {
    cities,
    city,
    hour,
    fiveDays
}

async function get(url) {
    try {
        return await axios.get(url);
    } catch (err) {
        throw new Error(err);
    }
}

async function cities(value) {
    const url = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&language=${API_LANG}&q=${value}`;
    return await get(url);
}

async function city(location, ip) {
    const url = location
        ? `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${location.lat},${location.lng}&language=${API_LANG}&details=false&toplevel=false`
        : `http://dataservice.accuweather.com/locations/v1/cities/ipaddress?apikey=${API_KEY}&q=${ip}&language=${API_LANG}&details=false`;
    return await get(url);
}

async function hour({ key }) {
    const url = `https://dataservice.accuweather.com/forecasts/v1/hourly/1hour/${key}?apikey=${API_KEY}&language=${API_LANG}&details=false&metric=true`;
    return await get(url);
}

async function fiveDays({ key }) {
    const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${API_KEY}&language=${API_LANG}&details=false&metric=true`;
    return await get(url);
}