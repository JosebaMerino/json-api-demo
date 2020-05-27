import * as fortune from 'fortune';

import { IBasicObject } from './BasicObject.class';
import { meta, IMeta } from '../models/meta.model';

const { methods, errors: { BadRequestError } } = fortune;


export class PhotoClass implements IBasicObject {
  modelName = 'photo';
  private PhotoBase = {};
  model = Object.assign(this.PhotoBase, meta);


  inputHook(context: any, record: any, update: any) {
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
  outputHook(context: any, record: any) {
    throw new Error("Method not implemented.");
  }
  
}