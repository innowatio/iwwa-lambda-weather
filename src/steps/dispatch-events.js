import moment from "moment";
import {map} from "bluebird";

import {dispatchEvent} from "../services/dispatcher";
import log from "../services/logger";

export async function dispatchEvents(weathers) {
    const now = moment.utc().valueOf();
    const normalized = moment.utc(now - (now % (1000 * 60 * 60 * 2)));

    return await map(weathers, (weather) => {
        const event = {
            element: {
                sensorId: `${weather.country}-${weather.provincia.toLowerCase()}`,
                date: normalized.format(),
                source: "reading",
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
            }
        };
        log.info(event, "dispatch event");
        dispatchEvent("element inserted in collection readings", event);
    });
}

