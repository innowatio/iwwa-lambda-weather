import dotenv from "dotenv";

dotenv.config();

export const OPEN_WEATHER_APP_ID = process.env.OPEN_WEATHER_APP_ID;
export const KINESIS_STREAM = process.env.KINESIS_STREAM;
export const KINESIS_PRODUCER_ID = process.env.KINESIS_PRODUCER_ID;