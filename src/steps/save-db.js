import getDb from "../services/db";

export async function insertWeathers (weathers) {
    const db = getDb();
    await db.query(
        buildInsertWeathersQuery(weathers),
        ...buildValuesQuery(weathers),
    );
}

function buildInsertWeathersQuery (weathers) {
    return weathers.reduce((prev, weather, index) => {
        const paramIndex = index * 3;
        return prev + `($${paramIndex+1}, $${paramIndex+2}, $${paramIndex+3})` + (++index == weathers.length ? "" : ",");
    }, "INSERT INTO weather (weather_date, temperature, cloudeness) VALUES ");
}

function buildValuesQuery (weathers) {
    return weathers.reduce((prev, weather) => {
        return [...prev, new Date(), parseInt(weather.temperature), parseInt(weather.cloudeness)];
    }, []);
}