import { PhotoController } from '../controllers/photo.controller';

export class PhotoRoutes {
  public photoController: PhotoController = new PhotoController();

  public routes(app): void {
    app.route('/photos')
    .post(this.photoController.post)
    .get(this.photoController.getAll)

    app.route('/photos/:id')
    .get(this.photoController.getById)
    // .patch(this.photoController.patch)
    // .put(this.photoController.update)
    // .delete(this.photoController.delete);
  }
}
