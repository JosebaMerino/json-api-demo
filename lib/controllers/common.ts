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
