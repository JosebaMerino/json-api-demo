import { Metadata } from './metadata.model';
import { Resourceable } from './resourceable.interface';
import { Resource } from './resource.interface';

import { ControllerConfig } from '../controllers/generic.controller';

import { Schema, Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { PhotoResourceableBuilder } from './builders/photoResourceable.builder';

const modelName: string = 'Photo';

interface IPhoto extends Metadata {
  _id: string;
  url: string;
}

class Photo implements IPhoto, Resourceable {
  creationDate: Date;
  modificationDate: Date;
  deletionDate: Date;
  _id: string;
  url: string;

  /**
   * Generates a PhotoResource using class attributes
   * @returns PhotoResource
   */
  toResource = (): PhotoResource => {
    const resource: PhotoResource = new PhotoResource();

    // map data fields
    resource.data.id = this._id;
    resource.data.attributes.url = this.url;
    resource.data.links = {
      self: `/photos/${this._id}`,
    };

    // map meta fields
    resource.meta.creationDate = this.creationDate;
    resource.meta.modificationDate = this.modificationDate;
    resource.meta.deletionDate = this.deletionDate;

    return resource;
  }

  /**
   * Fills itself with the attributes from PhotoResource
   * @param resource PhotoResource to cast
   */
  fromResource = (resource: PhotoResource): void => {
    const resourceData = resource.data;
    if (resourceData.type === 'photos') {
      this._id = resourceData.id;
      this.url = resourceData.attributes.url;

      if (resource.meta) {
        this.creationDate = resource.meta.creationDate;
        this.modificationDate = resource.meta.modificationDate;
        this.deletionDate = resource.meta.deletionDate;

      } else {
        this.creationDate = new Date();
      }
    }
  }

  fromJSON = (json : any) : void => {
    if (json) {
      console.log(json);
      this.creationDate = json.creationDate;
      this.modificationDate = json.modificationDate;
      this.deletionDate = json.deletionDate;
      this._id = json._id;
      this.url = json.url;
      console.log(this);
    }
  }
}

let PhotoSchema : Schema = new Schema({
  url: { type: String, required: true },
  creationDate: { type: Date, required: true },
  modificationDate: { type: Date, required: false },
  deletionDate: { type: Date, required: false },
});

// export default mongoose.model<PhotoDocument>(modelName, PhotoSchema);
module.exports = mongoose.model(modelName, PhotoSchema);

class PhotoResource implements Resource {
  meta?: {
    creationDate?: Date,
    modificationDate?: Date,
    deletionDate?: Date,
  };
  data: {
    type: string,
    id?: string,
    attributes?: {
      url: string,
    },
    links?: {
      self: string,
    },
  };

  constructor() {
    if (!this.meta) {
      this.meta = {};
    }
    this.meta.creationDate = new Date();

    if (!this.data) {
      this.data = {
        type: 'photos',
      };
      this.data.attributes = {
        url:undefined,
      };
    }
  }
}