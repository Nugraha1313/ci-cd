require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const router = require("./routes");
const Sentry = require("@sentry/node");

const { SENTRY_DSN, ENVIRONMENT } = process.env;

Sentry.init({
  environment: ENVIRONMENT,
  dsn: SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    // Automatically instrument Node.js libraries and frameworks
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],

var indexRouter = require('./routes/index');

var app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', indexRouter);

// app.listen(HTTP_PORT, () => console.log('running on port', HTTP_PORT));

module.exports = app