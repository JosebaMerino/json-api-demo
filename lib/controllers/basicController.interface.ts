import { Request, Response } from 'express';

export interface IBasicController {

  // CRUD -> Create, Read, Update & Delete

  getAll(req: Request, res: Response);
  getById(req: Request, res: Response);

  add(req: Request, res: Response);

  update(req: Request, res: Response);
  patch(req: Request, res: Response);

  delete(req: Request, res: Response);

}
