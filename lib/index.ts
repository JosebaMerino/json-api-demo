import * as path from 'path';
import * as express from 'express';
import * as API from 'json-api';
import * as mongoose from 'mongoose';

const APIError = API.types.Error;

mongoose.connect('mongodb://localhost/json-api-demo2');

let models = {
  Photo: require('./models/photo2.model'),
};

let adapter = new API.dbAdapters.Mongoose(models);
let registry = new API.ResourceTypeRegistry({},{ dbAdapter: adapter });

let Controller = new API.controllers.API(registry);

// Initialize the automatic documentation.
var Docs = new API.controllers.Documentation(registry, { name: 'JSON_API_DEMO' });

// tell the lib the host name your API is served from
let opts = { host: 'http://127.0.0.1:3000' };

// Initialize the express app + front controller
let app = express();
let Front = new API.httpStrategies.Express(Controller, Docs, opts);
let apiReqHandler = Front.apiRequest;

// ENABLE CORS
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', Front.docsRequest);
app.route('/:type(photos)')
  .get(apiReqHandler).post(apiReqHandler).patch(apiReqHandler);
app.route('/:type(photos)/:id')
  .get(apiReqHandler).post(apiReqHandler).patch(apiReqHandler);
app.route('/:type(photos)/:id/relationships/:relationship')
  .get(apiReqHandler).post(apiReqHandler).patch(apiReqHandler);

app.use((req, res, next) => {
  Front.sendError(new APIError({ status: 404 }), req, res, next);
});

// And we're done! Start 'er up!
console.log('Starting up! Visit 127.0.0.1:3000 to see the docs.');
app.listen(3000);
