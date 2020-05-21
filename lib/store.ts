import * as fortune from 'fortune';
import * as memAdapter from 'fortune-';

const recordTypes = {
  photo: {
    url: String,
  },
};

export const store = fortune(recordTypes);