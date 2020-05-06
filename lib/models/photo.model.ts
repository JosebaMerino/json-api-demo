import { Metadata } from './metadata.model';
import { Schema, Document } from 'mongoose';
import * as mongoose from 'mongoose';

export const modelName: string = 'Photo';

export class Photo extends Metadata {
  url: string;
}

export let PhotoSchema : Schema = new Schema({
  url: { type: String, required: true },
  creationDate: { type: Date, required: true },
  modificationDate: { type: Date, required: false },
  deletionDate: { type: Date, required: false },
});

export default mongoose.model<Photo>(modelName, PhotoSchema);
