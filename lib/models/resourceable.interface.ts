import { Resource } from './resource.interface';

export interface Resourceable {
  toResource : () => Resource;
  fromResource: (resource: Resource) => void;
  fromJSON: (json: any) => void;
}
