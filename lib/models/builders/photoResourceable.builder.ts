import { Photo } from '../photo.model';
import { ResourceableBuilder } from './resourceable.builder';
import { Resourceable } from '../resourceable.interface';

export class PhotoResourceableBuilder extends ResourceableBuilder {
  buildResourceable(): Resourceable {
    return new Photo();
  }
}
