import * as fortune from 'fortune';

import { IPhoto } from '../models/photos.model';

const { methods, errors: { BadRequestError } } = fortune;

export function photoInput(context, record: IPhoto, update) {
  console.log({context, record, update});
  const { request: { method, meta: { language } } } = context;

  switch (method) {
    case methods.create:
      record.creationDate = new Date();
      break;
    case methods.update:

      console.log("UPDATE");
      if(update.replace.creationDate) {
        delete update.replace.creationDate;
      }
      update.replace.modificationDate = new Date();
      break;
  }
}
