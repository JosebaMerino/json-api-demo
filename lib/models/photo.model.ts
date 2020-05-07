import { Metadata } from './metadata.model';
import { Schema, Document } from 'mongoose';
import * as mongoose from 'mongoose';

export const modelName: string = 'Photo';

export interface IPhoto extends Metadata {
  _id: string;
  url: string;
}


export class Photo implements IPhoto {
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

    resource.data.id = this._id;
    resource.data.attributes.url = this.url;

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
}

export let PhotoSchema : Schema = new Schema({
  url: { type: String, required: true },
  creationDate: { type: Date, required: true },
  modificationDate: { type: Date, required: false },
  deletionDate: { type: Date, required: false },
});

export type PhotoDocument = Photo & Document;

export default mongoose.model<PhotoDocument>(modelName, PhotoSchema);

export class PhotoResource {
  meta?: {
    creationDate?: Date,
    modificationDate?: Date,
    deletionDate?: Date,
  };
  data: {
    type: string,
    id: string,
    attributes: {
      url: string,
    },
    links: {
      self: string,
    },
  };

  constructor() {
    this.meta.creationDate = new Date();
    this.data.type = 'photos';
  }
}
