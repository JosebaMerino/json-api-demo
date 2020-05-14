export const onlyNotDeleted = {
  $or: [
    {
      deletionDate: { $exists: false },
    },
    {
      deletionDate: { $eq: null },
    },
  ],
};
export const onlyDeleted = {
  $and: [
    {
      deletionDate: { $exists: true },
    },
    {
      deletionDate: { $not: { $eq: null } },
    },
  ],
};
export const all = {};

export function queryNotDeleted(id: string): any {
  const query =
    {
      $and: [
        {
          _id: id,
        },
        onlyNotDeleted,
      ],
    };
  return query;
}

export function queryDeleted(id: string): any {
  const query =
    {
      $and: [
        {
          _id: id,
        },
        onlyDeleted,
      ],
    };
  return query;
}

export function queryAll(id: string): any {
  const query =
    {
      _id: id,
    };
  return query;
}
