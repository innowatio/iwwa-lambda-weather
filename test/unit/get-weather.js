import {expect} from "chai";

import {getAllWeathers, getWeather} from "steps/get-weather";

describe("Query api.openweathermap.org", () => {

    it("GET Cairns weather", async () => {
        const location = {
            "id": 2172797,
            "name": "London"
        };

        const result = await getWeather(location);
        expectWeatherObject(result);
    }).timeout(10000);

    it("GET Benevento & Cairns weather", async () => {
        const locations = [{
            "id": 2172797,
            "name": "Cairns"
        }, {
            "id": 6542123,
            "name": "Benevento"
        }];

        const results = await getAllWeathers(locations);
        results.forEach(result => {
            expectWeatherObject(result);
        });
    }).timeout(10000);
});

function expectWeatherObject (obj) {
    expect(obj).to.have.property("provincia");
    expect(obj.provincia).to.be.a("string");

    expect(obj).to.have.property("id");
    expect(obj.id).to.be.a("number");

    expect(obj).to.have.property("temperature");
    expect(obj.temperature).to.be.a("number");

    expect(obj).to.have.property("humidity");
    expect(obj.humidity).to.be.a("number");

    expect(obj).to.have.property("cloudeness");
    expect(obj.cloudeness).to.be.a("number");
}