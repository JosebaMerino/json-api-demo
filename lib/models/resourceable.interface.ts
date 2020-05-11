import { Resource } from './resource.interface';

export interface Resourceable {
  
  /**
   * Transforms the content to a Resource
   * @returns Resource
   */
  toResource : () => Resource;

  /**
   * Transfers Resource data to internal object
   * @param resource resource to transfer
   */
  fromResource: (resource: Resource) => void;
  fromJSON: (json: any) => void;
}
