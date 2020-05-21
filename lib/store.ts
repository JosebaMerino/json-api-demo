import * as fortune from 'fortune';
import * as mongoAdapter from 'fortune-mongodb';

import { Photo } from './models/photos.model';


// Type definition
const recordTypes = {
  photo: Photo,
};

// Adapter interface

const adapter = [ mongoAdapter, {
  // In this example, the Postgres adapter requires the connection URL.
  url: 'mongodb://localhost/jsonAPIDemo',
} ];

export const store = fortune(recordTypes, { adapter });
