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
  public model;
  public resourceableBuilder: ResourceableBuilder;

  constructor(config: ControllerConfig) {
    this.model = mongoose.model<T>(config.modelName, config.schema);
    this.resourceableBuilder = config.resourceableBuilder;
  }

  public getModel() {
    return this.model;
  }

  public test = (req: Request, res: Response) => {
    console.log(this);
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
    const queryParameters = req.query;
    const id = req.params.id;
    let searchCondition: any;
    if (this.booleanParser(String(queryParameters.all))) {
      searchCondition = Common.queryAll(id);
    } else {
      searchCondition = Common.queryNotDeleted(id);
    }
    this.model.findOne(searchCondition, (err, document) => {
      if (err) {
        res.send(err);
      } else if (!document) {
        res.status(404).send({});
      } else {
        res.json(this.JSONtoResource(document));
      }
    });
  }

  public patch = (req: Request, res: Response) => {
    this.update(req, res, false);
  }

  public put = (req: Request, res: Response) => {
    this.update(req, res, true);
  }

  private update = (req: Request, res: Response, replace: boolean) => {

    const reqResource : Resource = req.body;

    this.model.findById(req.params.id, (err, document) => {
      if (err) {
        res.send(err);
      } else {
        if (!reqResource.meta) {
          reqResource.meta = {};
        }

        reqResource.meta.creationDate = document.creationDate;
        reqResource.meta.modificationDate = new Date();
        reqResource.meta.deletionDate = document.deletionDate ? document.deletionDate : undefined ;
        reqResource.data.id = document._id;

        console.log(reqResource);

        const resourceable : Resourceable = this.resourceableBuilder.buildResourceable();

        resourceable.fromResource(reqResource);

        console.log(resourceable);

        if (replace) {
          this.model.findOneAndReplace(
          { _id: req.params.id },
          resourceable,
          { new: true },
          (err, document) => {
            if (err) {
              res.send(err);
            } else {
              res.json(this.JSONtoResource(document));
            }
          },
          );
        } else {
          this.model.findOneAndUpdate(
            { _id: req.params.id },
            resourceable,
            { new: true },
            (err, document) => {
              if (err) {
                res.send(err);
              }
              res.json(this.JSONtoResource(document));
            });
        }
      }
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
      this.model.remove(Common.queryDeleted(req.params.id), (err, writeOpResult) => {
        console.log({writeOpResult});
        if (err) {
          res.send(err);
        } else if (writeOpResult.deletedCount === 0) {
          res.status(404).send({});
        } else {
          res.status(204).send({});
        }
      });
    } else {
      // Hace un borrado logico
      // It makes a logic delete
      console.log(Common.queryNotDeleted(req.params.id));
      this.model.updateOne(
        Common.queryNotDeleted(req.params.id),
        { deletionDate: new Date() },
        (err, writeOpResult) => {
          if (err) {
            console.log('ha ocurrido un error');
            res.send(err);
          } else if (writeOpResult.nModified === 1) {
            console.log('borrado corectamente');
            res.status(204).json({});
          } else if (writeOpResult.nModified === 0) {
            console.log('No se ha borrado nada');
            res.status(404).json({});
          }
        },
    );
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
    });
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
