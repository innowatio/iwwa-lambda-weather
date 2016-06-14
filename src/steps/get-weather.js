import {get} from "axios";
import {sleep} from "sleep";

import {OPEN_WEATHER_APP_ID} from "../config";

export async function getWeather (location) {

    const query = `http://api.openweathermap.org/data/2.5/weather?id=${location.id}&units=metric&appid=${OPEN_WEATHER_APP_ID}`;

    const response = await get(query);
    return {
        provincia: response.data.name,
        id: response.data.weather[0].id,
        temperature: response.data.main.temp,
        humidity: response.data.main.humidity,
        cloudeness: response.data.clouds.all,
        country: response.data.sys.country
    };
}

export function getAllWeathers (locations) {
    return locations.reduce(async (prev, location) => {
        sleep(1);
        const weather = await getWeather(location);
        return [...await prev, weather];
    }, []);
}