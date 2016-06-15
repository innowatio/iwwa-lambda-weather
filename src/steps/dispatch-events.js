import moment from "moment";

import {dispatchEvent} from "../services/dispatcher";
import log from "../services/logger";

export function dispatchEvents(weathers) {
    const now = moment.utc().valueOf();
    const normalized = moment.utc(now - (now % (1000 * 60 * 60 * 2)));

    weathers.forEach(weather => {
        log.info(`${weather.country}-${weather.provincia.toLowerCase()}`, "dispatch event");
        dispatchEvent("element inserted in collection readings", {
            sensorId: `${weather.country}-${weather.provincia.toLowerCase()}`,
            date: normalized.format(),
            measurements: [{
                type: "weather-cloudeness",
                value: weather.cloudeness,
                unitOfMeasurement: "%"
            }, {
                type: "weather-humidity",
                value: weather.humidity,
                unitOfMeasurement: "%"
            }, {
                type: "weather-temperature",
                value: weather.temperature,
                unitOfMeasurement: "°C"
            }, {
                type: "weather-id",
                value: weather.id,
                unitOfMeasurement: "id"
            }]
        }, {});
    });
}

