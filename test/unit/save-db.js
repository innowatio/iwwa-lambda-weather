import "babel-polyfill";

import {expect} from "chai";
import sinon from "sinon";

import getDb from "services/db";

import {insertWeathers} from "steps/save-db";

describe("Save weather into DB", () => {

    const db = getDb();

    sinon.useFakeTimers();
    
    before(async () => {
        await db.query({
            text: "DELETE FROM weather"
        });
    });

    after(async () => {
        await db.query({
            text: "DELETE FROM weather"
        });
    });

    it("Save London weathers", async () => {
        const weather = [{
            id: 2172797,
            name: "London",
            temperature: 293.25,
            humidity: 60,
            cloudeness: 20
        }, {
            id: 2172797,
            name: "London",
            temperature: 223.25,
            humidity: 45,
            cloudeness: 89
        }];

        await insertWeathers(weather);

        const sequence = await db.row("SELECT last_value FROM weather_id_seq");

        const result = await db.rows("SELECT * from weather");
        expect(result).to.deep.equal([{
            cloudeness: 20,
            id: sequence.last_value - 1,
            temperature: 293,
            weather_date: new Date(),
            user_app_id: null
        }, {
            cloudeness: 89,
            id: sequence.last_value - 0,
            temperature: 223,
            weather_date: new Date(),
            user_app_id: null
        }]);

    });
});
