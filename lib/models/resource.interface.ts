export interface Resource {
  meta?: Meta;
  data: Data;
}

interface Data {
  type: string;
  id?: string;
  attributes?: object;
  relationships?: object[];
  links?: object;
}

interface Meta {
  creationDate?: Date;
  modificationDate?: Date;
  deletionDate?: Date;
}
