export class PhotoResource {
  meta?: {
    creationDate: Date,
    modificationDate: Date,
    deletionDate: Date,
  };
  data: {
    type: string,
    id: string,
    attributes: {
      url: string,
    },
    links: {
      self: string,
    },
  };
}
