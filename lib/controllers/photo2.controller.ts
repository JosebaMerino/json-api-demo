import { GenericController } from './generic.controller';
import { PhotoDocument, modelName, PhotoSchema } from '../models/photo.model';
import { PhotoResourceableBuilder } from '../models/builders/photoResourceable.builder';

export class PhotoController2 extends GenericController<PhotoDocument> {
  constructor() {
    super(modelName, PhotoSchema, new PhotoResourceableBuilder());
    console.log('PhohotoController2');
  }
}
