import { Request, Response } from 'express';

export interface IBasicController {

  // CRUD -> Create, Read, Update & Delete

  getAll(req: Request, res: Response): void;
  getById(req: Request, res: Response): void;

  add(req: Request, res: Response): void;

  patch(req: Request, res: Response): void;
  put(req: Request, res: Response): void;

  delete(req: Request, res: Response): void;

}
