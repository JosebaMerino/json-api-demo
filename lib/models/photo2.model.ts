import { Metadata } from './metadata.model';
import { Resourceable } from './resourceable.interface';
import { Resource } from './resource.interface';


import { Schema, Document } from 'mongoose';
import * as mongoose from 'mongoose';

const modelName: string = 'Photo';

const PhotoSchema : Schema = new Schema({
  url: { type: String, required: true },
  creationDate: { type: Date, required: false },
  modificationDate: { type: Date, required: false },
  deletionDate: { type: Date, required: false },
});

// export default mongoose.model<PhotoDocument>(modelName, PhotoSchema);
module.exports = mongoose.model(modelName, PhotoSchema);
