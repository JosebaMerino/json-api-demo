import * as fortune from 'fortune';
import * as mongoAdapter from 'fortune-mongodb';

import { hooks } from './hooks/hooks';

import { Photo } from './models/photos.model';
import { Book } from './models/books.model';

// Type definition
const recordTypes = {
  photo: Photo,
  book: Book,
};


// Adapter interface
const adapter = [mongoAdapter, {
  // In this example, the Postgres adapter requires the connection URL.
  url: 'mongodb://localhost/jsonAPIDemo',
}];

export const store = fortune(recordTypes, { adapter, hooks });
