import { GenericController } from './generic.controller';

import { Request, Response } from 'express';

import { PhotoSchema, Photo, modelName, PhotoDocument } from '../models/photo.model';

import * as mongoose from 'mongoose';

export class PhotoController extends GenericController<PhotoDocument> {
  constructor() {
    super(modelName, PhotoSchema);
    console.log('PhotoController created');

  }

  post = (req: Request, res: Response) => {

    const model: mongoose.Model<PhotoDocument, {}>  = this.getModel();

    let photo: Photo = new Photo;

    photo.fromResource(req.body);

    console.log({ photo });

    const newPhoto = new model(photo);

    newPhoto.save((err, photo) => {
      // const photoClass : Photo = Photo(photo);

      console.log(photo.toResource());
      if (err) {
        res.send(err);
      } else {
        res.json(photo);
      }
    });
  }
}
