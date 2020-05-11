import { GenericController, ControllerConfig } from './generic.controller';
import { PhotoDocument, modelName, PhotoSchema } from '../models/photo.model';
import { PhotoResourceableBuilder } from '../models/builders/photoResourceable.builder';

export class PhotoController2 extends GenericController<PhotoDocument> {

  constructor() {
    super(new ControllerConfig(modelName, PhotoSchema, new PhotoResourceableBuilder()));
    console.log('PhohotoController2');
  }
}
