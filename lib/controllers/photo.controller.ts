import { GenericController } from './generic.controller';
import * as Common from './common';

import { Request, Response } from 'express';

import { PhotoSchema, Photo, modelName, PhotoDocument, PhotoResource } from '../models/photo.model';

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

      let pphoto : Photo = new Photo();

      pphoto.fromJSON(photo);

      console.log(pphoto);
      if (err) {
        res.send(err);
      } else {
        res.json(pphoto.toResource());
      }
    });
  }

  getById = (req: Request, res: Response) => {
    this.model.findById(req.params.id, (err, photo) => {
      const pphoto = new Photo();
      pphoto.fromJSON(photo);
      if (err) {
        res.send(err);
      }
      res.json(pphoto.toResource());
    });
  }

  getAll = (req: Request, res: Response) => {
     // console.log(this.model);
    // Para buscar solo los que no estan borrados
    let searchCondition;

    const queryParameters = req.query;

    if (this.boooleanParser(String(queryParameters.onlyDeleted))) {
      searchCondition = Common.onlyDeleted;
      console.log('Only deleted');
    } else if (this.boooleanParser(String(queryParameters.all))) {
      searchCondition = Common.all;
      console.log('All');
    } else {
      console.log('Only not deleted');
      searchCondition = Common.onlyNotDeleted;
    }

    console.log(searchCondition);
    /*
    if (all === true) {
      searchCondition = Common.all;
    } else {
      searchCondition = Common.onlyNotDeleted;
    }*/
    this.model.find(searchCondition, (err, photos: Array<any>) => {
      const resultResources : Array<PhotoResource> = [];

      photos.forEach(photo => {
        resultResources.push(this.JSONtoResource(photo));
      });

      if (err) {
        res.send(err);
      }
      res.json(resultResources);
    });
  }

  
  /**
   * Casts a string to a boolean
   * @returns boolean. null if it can't cast
   */
  private boooleanParser = (param: string) => {
    let resul: boolean;
    if (param && param.match(/^((true)|(false))$/)) {
      console.log('MATCHES');
      resul = Boolean(JSON.parse(param));
      console.log({ resul });
    } else {
      console.log('Not MATCHES');
      resul = null;
    }

    return resul;
  }

  private JSONtoResource( json: any ): PhotoResource {
    const photo = new Photo();

    photo.fromJSON(json);

    return photo.toResource();
  }
}
