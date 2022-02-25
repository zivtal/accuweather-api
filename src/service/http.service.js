import axios from "axios";

export const httpService = {
    get
}

async function get(url) {
    try {
        // console.log(url);
        return await axios.get(url);
    } catch (err) {
        throw new Error(err);
    }
}