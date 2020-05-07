import { Document } from 'mongoose';

export abstract class Metadata {
  creationDate: Date;
  modificationDate: Date;
  deletionDate: Date;
}
