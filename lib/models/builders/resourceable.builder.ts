import { Resourceable } from '../resourceable.interface';
export abstract class ResourceableBuilder{
  abstract buildResourceable(): Resourceable;
}