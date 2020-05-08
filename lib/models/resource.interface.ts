export interface Resource {
  meta?: object;
  data: Data;
}

interface Data {
  type: string;
  id?: string;
  attributes?: object;
  relationships?: object[];
  links?: object;
}
