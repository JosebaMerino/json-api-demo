import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import * as Common from './common';

import { Metadata } from '../models/metadata.model';

import { IBasicController } from './basicController.interface';
import { Resource } from 'models/resource.interface';

export class GenericController<T extends mongoose.Document & Metadata> implements IBasicController {
  public model;
  constructor(name: string, schema: mongoose.Schema) {
    this.model = mongoose.model<T>(name, schema);
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
    this.model.find(searchCondition, (err, dedications) => {
      if (err) {
        res.send(err);
      }
      res.json(dedications);
    });
  }
  public getById = (req: Request, res: Response) => {
    this.model.findById(req.params.id, (err, dedication) => {
      if (err) {
        res.send(err);
      }
      res.json(dedication);
    });
  }

  public update = (req: Request, res: Response) => {
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

    const newDedication = new this.model(req.body);

    newDedication.save((err, dedication) => {
      if (err) {
        res.send(err);
      }
      res.json(dedication);
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
}
