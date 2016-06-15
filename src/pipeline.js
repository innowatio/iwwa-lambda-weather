import log from "./services/logger";

import {getAllWeathers} from "./steps/get-weather";
import {dispatchEvents} from "./steps/dispatch-events";

export default async function pipeline (event, context) {

    log.info("start pipeline");
    /*
     *   Workaround: some events have been incorrectly generated and thus don't
     *   have an `element` property. When processing said events, just return and
     *   move on without failing, as failures can block the kinesis stream.
     */

    const results = await getAllWeathers(event.province);

    await dispatchEvents(results);

    context.succeed();
}