import chai, {expect} from "chai";
import {spy} from "sinon";
import sinonChai from "sinon-chai";

chai.use(sinonChai);

import {province as data} from "services/data";
import getDb from "services/db";
import {handler} from "index";

describe("Query api.openweathermap.org and save DB", () => {

    it("GET Benevento London", async () => {
        
        const db = await getDb();

        const context = {
            succeed: spy()
        };

        const province = data.splice(0, 5);
        await handler({
            province
        }, context);
        
        const result = await db.row("SELECT count(*) from weather");

        expect(parseInt(result.count)).to.equal(5);
        expect(context.succeed).to.have.been.callCount(1);
    }).timeout(10000);

});