import { Document } from 'mongoose';

export abstract class Metadata extends Document {
  creationDate: Date;
  modificationDate: Date;
  deletionDate: Date;
}
