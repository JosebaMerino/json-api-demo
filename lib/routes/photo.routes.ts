import { PhotoController } from '../controllers/photo.controller';

export class PhotoRoutes {
  public photoController: PhotoController = new PhotoController();

  public routes(app): void {
    app.route('/photos')
    .get(this.photoController.getAll)
    .post(this.photoController.add);

    app.route('/photos/:id')
    .get(this.photoController.getById)
    .patch(this.photoController.patch)
    .put(this.photoController.update)
    .delete(this.photoController.delete);
  }
}
