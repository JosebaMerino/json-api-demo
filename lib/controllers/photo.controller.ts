import { GenericController } from './generic.controller';

import { Request, Response } from 'express';

import { PhotoSchema, Photo, modelName, PhotoDocument} from '../models/photo.model';

export class PhotoController extends GenericController<PhotoDocument> {
  constructor() {
    super(modelName, PhotoSchema);
    console.log('PhotoController created');

  }

  post = (req: Request, res: Response) => {

    const model = this.getModel();

    let photo: Photo = new Photo;

    photo.fromResource(req.body);

    console.log({photo});

    const newPhoto = new model(photo);

    newPhoto.save((err, photo) => {
      const photoClass : Photo = Photo(photo);
      console.log(photo);
      if (err) {
        res.send(err);
      } else {
        res.json(photo);
      }
    });
  }
}
