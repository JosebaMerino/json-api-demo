import { meta, IMeta } from './meta.model';

const PhotoBase =  {
  url: String,
  book: ['book', 'photos'],
};


interface IPhotoBase {
  url: String;
  book: String[];
}

export type IPhoto = IMeta & IPhotoBase;
export const Photo = Object.assign(PhotoBase, meta);