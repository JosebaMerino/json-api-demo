import { Metadata } from './metadata.model';
import { Resourceable } from './resourceable.interface';
import { Resource } from './resource.interface';

import { Schema, Document } from 'mongoose';
import * as mongoose from 'mongoose';

export const modelName: string = 'Photo';

export interface IPhoto extends Metadata {
  _id: string;
  url: string;
}

export class Photo implements IPhoto, Resourceable {
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
    console.log(json);
    this.creationDate = json.creationDate;
    this.modificationDate = json.modificationDate;
    this.deletionDate = json.deletionDate;
    this._id = json._id;
    this.url = json.url;
  }
}

export let PhotoSchema : Schema = new Schema({
  url: { type: String, required: true },
  creationDate: { type: Date, required: true },
  modificationDate: { type: Date, required: false },
  deletionDate: { type: Date, required: false },
});

export type PhotoDocument = Photo & Document;

export default mongoose.model<PhotoDocument>(modelName, PhotoSchema);

export class PhotoResource implements Resource {
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
