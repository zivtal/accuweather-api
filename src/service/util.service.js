export function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
}

export function loadFromStorage(key) {
    var val = localStorage.getItem(key);
    return JSON.parse(val);
}

export function cToF(c) {
    return (c * 9 / 5 + 32).toFixed(1);
}

const DEBOUNCES = {};
export function debounce(fn, id = 0, delay = 500) {
    clearTimeout(DEBOUNCES[id]);
    DEBOUNCES[id] = null;
    return ((...args) => {
        DEBOUNCES[id] = setTimeout(() => {
            delete DEBOUNCES[id];
            if (typeof fn === 'function')
                fn(...args);
        }, delay);
    })();
}

export async function getCurrentPosition() {
    try {
        const geolocation = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(coords => { resolve(coords) }, err => { reject(err) });
        });
        return { lat: geolocation.coords.latitude, lng: geolocation.coords.longitude };
    } catch (err) {
        throw new Error(`can't load location`);
    }
}
