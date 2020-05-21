import * as path from 'path';
import * as express from 'express';
import * as API from 'json-api';
import * as mongoose from 'mongoose';

const APIError = API.types.Error;
const PORT = '3001';
const ADDRESS = 'localhost';

const hostUrl = () => {
  if (ADDRESS.toUpperCase().includes('HTTP') || ADDRESS.toUpperCase().includes('HTTPS')) {
    return `${ADDRESS}:${PORT}`;
  }
  return `http://${ADDRESS}:${PORT}`;
};

mongoose.connect('mongodb://localhost/json-api-demo2');

let models = {
  Photo: require('./models/photo2.model'),
};

let adapter = new API.dbAdapters.Mongoose(models);
let registry = new API.ResourceTypeRegistry({
  photos: require('../resource-descriptions/photos'),
},{ dbAdapter: adapter });

let Controller = new API.controllers.API(registry);

// Initialize the automatic documentation.
var Docs = new API.controllers.Documentation(registry, { name: 'JSON_API_DEMO' });

// tell the lib the host name your API is served from
let opts = { host: hostUrl() };

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
  .get(apiReqHandler).patch(apiReqHandler).delete(apiReqHandler);
app.route('/:type(photos)/:id/relationships/:relationship')
  .get(apiReqHandler).post(apiReqHandler).patch(apiReqHandler).delete(apiReqHandler);

app.use((req, res, next) => {
  Front.sendError(new APIError({ status: 404, detail: 'URL not recognized' }), req, res, next);
});

// And we're done! Start 'er up!
console.log(`Starting up! Visit ${hostUrl()} to see the docs.`);
app.listen(PORT);
