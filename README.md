[![Build Status](https://travis-ci.org/innowatio/iwwa-lambda-weather.svg?branch=master)](https://travis-ci.org/innowatio/iwwa-lambda-weather)
[![codecov](https://codecov.io/gh/innowatio/iwwa-lambda-weather/branch/master/graph/badge.svg)](https://codecov.io/gh/innowatio/iwwa-lambda-weather)
[![Dependency Status](https://david-dm.org/innowatio/iwwa-lambda-weather.svg)](https://david-dm.org/innowatio/iwwa-lambda-weather)
[![devDependency Status](https://david-dm.org/innowatio/iwwa-lambda-weather/dev-status.svg)](https://david-dm.org/innowatio/iwwa-lambda-weather#info=devDependencies)


# iwwa-lambda-weather

Lambda function for weather infos.

- `OPEN_WEATHER_APP_ID`

## Deployment

This project deployment is automated with Lambdafile [`lambda-boilerplate`](https://github.com/lk-architecture/lambda-boilerplate/).

### Configuration

Since we are querying [OpenWeatherMap.org](http://openweathermap.org) you must have a registered AppID on the service and provide the required environment variables:
The following environment variables are needed to configure the function:

- `OPEN_WEATHER_APP_ID`
- `KINESIS_STREAM`
- `KINESIS_PRODUCER_ID`

### Run test

In order to run tests locally a [OpenWeatherMap.org](http://openweathermap.org) AppId and the above environment
variables are needed.
Just run `npm run test` command.
