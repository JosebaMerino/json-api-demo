import { GenericController } from './generic.controller';

import { PhotoSchema, Photo, modelName } from '../models/photo.model';

export class PhotoController extends GenericController<Photo> {
  constructor() {
    console.log('PhotoController constructed');
    super(modelName, PhotoSchema);
  }
}
