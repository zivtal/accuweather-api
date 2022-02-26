import axios from "axios";

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