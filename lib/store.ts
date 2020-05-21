import * as fortune from 'fortune';


// Type definition
const recordTypes = {
  photo: {
    url: String,
  },
};

// Adapter interface
/*
const pgAdapter = require('fortune-postgres')

const adapter = [ pgAdapter, {
  // In this example, the Postgres adapter requires the connection URL.
  url: 'postgres://postgres@localhost:5432/app_db'
} ]

const store = fortune(recordTypes, { adapter })
*/

export const store = fortune(recordTypes);
