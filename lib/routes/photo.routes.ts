import { PhotoController } from '../controllers/photo.controller';
import { PhotoController2 } from '../controllers/photo2.controller';


export class PhotoRoutes {
  //public photoController: PhotoController = new PhotoController();
  public photoController2 : PhotoController2 = new PhotoController2();


  public routes(app): void {
    app.route('/photos')
    .post(this.photoController2.add)
    .get(this.photoController2.getAll)

    app.route('/photos/:id')
    .get(this.photoController2.getById)
    // .patch(this.photoController2.patch)
    .put(this.photoController2.update)
    // .delete(this.photoController.delete);
  }
}
