import {get} from "axios";
import {sleep} from "sleep";

const appId = "42e5c617ad96c244d404d726ad205211";

export async function getWeather (location) {

    const query = `http://api.openweathermap.org/data/2.5/weather?id=${location.id}&units=metric&appid=${appId}`;

    const response = await get(query);
    return {
        provincia: response.data.name,
        id: response.data.id,
        temperature: response.data.main.temp,
        humidity: response.data.main.humidity,
        cloudeness: response.data.clouds.all
    };
}

export function getAllWeathers (locations) {
    return locations.reduce(async (prev, location) => {
        sleep(1);
        const weather = await getWeather(location);
        return [...await prev, weather];
    }, []);
}