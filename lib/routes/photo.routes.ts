import { PhotoController } from '../controllers/photo.controller';
import { PhotoController2 } from '../controllers/photo2.controller';

import * as express from 'express';

export class PhotoRoutes {
  //public photoController: PhotoController = new PhotoController();
  public photoController2 : PhotoController2 = new PhotoController2();

  public routes(app:  express.Application): void {
    app.route('/photos')
    .post(this.photoController2.add)
    .get(this.photoController2.getAll)

    app.route('/photos/:id')
    .get(this.photoController2.getById)
    .patch(this.photoController2.patch)
    .put(this.photoController2.put)
    .delete(this.photoController2.delete)
    .all((req, res) => {
      res.status(500).json({'message': 'url not found'})
    });
  }
}
