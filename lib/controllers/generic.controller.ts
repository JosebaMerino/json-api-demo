import { Request, Response } from 'express';
import { Document, Schema } from 'mongoose';
import * as mongoose from 'mongoose';
import * as Common from './common';

import { Metadata } from '../models/metadata.model';
import { ResourceableBuilder } from '../models/builders/resourceable.builder';

import { IBasicController } from './basicController.interface';
import { Resourceable } from 'models/resourceable.interface';
import { Resource } from 'models/resource.interface';

export class GenericController<T extends mongoose.Document & Metadata> implements IBasicController {
  public model: mongoose.Model<Document, {}>;
  public resourceableBuilder: ResourceableBuilder;

  constructor(config: ControllerConfig) {
    this.model = mongoose.model<T>(config.modelName, config.schema);
    this.resourceableBuilder = config.resourceableBuilder;
  }


  public getModel() {
    return this.model;
  }

  public test = (req: Request, res: Response) => {
    console.log(this)
    console.log(this.model);
    res.json(this.model);
  }

  public getAll = (req: Request, res: Response) => {
   // console.log(this.model);
    // Para buscar solo los que no estan borrados
    let searchCondition;

    const queryParameters = req.query;

    if (this.booleanParser(String(queryParameters.onlyDeleted))) {
      searchCondition = Common.onlyDeleted;
      console.log('Only deleted');
    } else if (this.booleanParser(String(queryParameters.all))) {
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
    this.model.find(searchCondition, (err, documents : any[]) => {
      const resultResources : Resource[] = [];

      documents.forEach((document) => {
        resultResources.push(this.JSONtoResource(document));
      });

      if (err) {
        res.send(err);
      }
      res.json(resultResources);
    });
  }
  public getById = (req: Request, res: Response) => {
    this.model.findById(req.params.id, (err, document) => {
      if (err) {
        res.send(err);
      }
      res.json(this.JSONtoResource(document));
    });
  }

  public update = (req: Request, res: Response) => {
    /* 
    const body : T = req.body;

    body.modificationDate = new Date();

    this.model.findById(req.params.id, (err, dedication) => {
      if (err) {
        res.send(err);
      } else {
        body.creationDate = dedication.creationDate;
        body.deletionDate = dedication.deletionDate;
        this.model.findOneAndReplace(
          { _id: req.params.id },
          body,
          { new: true },
          (err, dedication: T) => {
            if (err) {
              res.send(err);
            } else {
              res.json(dedication);
            }
          },
          );
      }
    });
    */
  }

  public patch = (req: Request, res: Response) => {

    const body : T = req.body;

    body.modificationDate = new Date();

    this.model.findOneAndUpdate(
      { _id: req.params.id },
      body,
      { new: true },
      (err, dedication) => {
        if (err) {
          res.send(err);
        }
        res.json(dedication);
      });
  }
  public delete = (req: Request, res: Response) => {

    let fisicalDelete: Boolean = false;

    if (req.query.fisical) {
      fisicalDelete = Boolean(JSON.parse(String(req.query.fisical)));
    }

    if (fisicalDelete) {
      // Hace un borrado fisico
      // It makes a fisical delete
      this.model.remove({ _id: req.params.id }, (err) => {
        if (err) {
          res.send(err);
        }
        res.json({ msg: 'Deleted succesfully forever!' });
      });
    } else {
      // Hace un borrado logico
      // It makes a logic delete
      this.model.updateOne({ _id: req.params.id }, { deletionDate: new Date() }, (err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ msg: 'Deleted succesfully!' });
        }
      });
    }
  }
  public add = (req: Request, res: Response) => {
    const resourceable : Resourceable = this.resourceableBuilder.buildResourceable();

    resourceable.fromResource(req.body);

    const newDocument = new this.model(resourceable);

    newDocument.save((err, document) => {
      if (err) {
        res.send(err);
      } else {
        res.send(this.JSONtoResource(document));
      }
    })
  }

  /**
   * Casts a string to a boolean
   * @returns boolean. null if it can't cast
   */
  private booleanParser = (param: string) => {
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

  private JSONtoResource(json: any): Resource {
    const resourceable: Resourceable = this.resourceableBuilder.buildResourceable();
    resourceable.fromJSON(json);
    return resourceable.toResource();
  }

}
/**
 * Class used to configure a GenericController
 */
export class ControllerConfig {
  modelName: string;
  schema: Schema;
  resourceableBuilder: ResourceableBuilder;

  constructor(modelName: string, schema: Schema, resourceableBuilder: ResourceableBuilder) {
    this.modelName = modelName;
    this.schema = schema;
    this.resourceableBuilder = resourceableBuilder;
  }
}
