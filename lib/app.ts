import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';

import { PhotoRoutes } from './routes/photo.routes';

const morgan = require('morgan');
class App {

  public app: express.Application;

  public photoRoutes: PhotoRoutes = new PhotoRoutes();

  public mongoUrl: string = 'mongodb://localhost/json-api-demo';

  constructor() {
    this.app = express();
    this.config();

    this.photoRoutes.routes(this.app);

    this.mongoSetup();
  }

  private config(): void {
    const morganFormat: string = 'dev';
    // add morgan as middleware
    this.app.use(morgan(morganFormat));
    // support application/json type post data
    this.app.use(bodyParser.json());        // support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));

  }

  private mongoSetup() {
    mongoose.connect(this.mongoUrl);
  }

}

export default new App().app;
