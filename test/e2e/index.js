import chai, {expect} from "chai";
import {spy} from "sinon";
import sinonChai from "sinon-chai";

chai.use(sinonChai);

import {setInstance} from "services/dispatcher";
import {province as data} from "services/data";
import {handler} from "index";

describe("Query api.openweathermap.org and dispatch events", () => {

    const context = {
        succeed: spy()
    };

    const dispatcher = {
        dispatch: spy()
    };

    afterEach(() => {
        context.succeed.reset();
        dispatcher.dispatch.reset();
    });

    it("GET some weather infos and dispatch events", async () => {

        setInstance(dispatcher.dispatch);

        const province = data.splice(0, 3);
        await handler({
            province
        }, context);

        expect(context.succeed).to.have.been.callCount(1);
        expect(dispatcher.dispatch).to.have.been.callCount(3);

    }).timeout(10000);

});