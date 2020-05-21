import * as API from 'json-api';
const RESOURCE = API.Resource;

module.exports = {
  urlTemplates: {
    self: '/photos/{id}',
    relationship: '/photos/{ownerId}/relationships/{path}',
  },
  /**
   * An optional function called on each resource provided by the client (i.e.
   * in a POST or PATCH request) before it's sent to the adapter for saving. You
   * can transform the data here as necessary or pre-emptively reject the
   * request. If you enable `transformLinkage` in your resource type
   * description, this will also receive ResourceIdentifier objects. See README
   * for details/caveats.
   *
   * @param {Resource} resource - The resource to be transformed
   * @param {Object} meta - Some information about the context in which the
   *   resource appeared.
   * @param {Object} extras - Various useful objects (e.g., the request object
   *   from your server's http library and the json-api lib; the resource type
   *   registry; etc.)
   * @param {Function} superFn - The beforeSave function on the parent
   *   resource type, if any
   * @returns {Resource|undefined|Promise<Resource|undefined>} - The transformed resource
   * @throws Can throw an error (APIError or Error) to abort the request
   */
  beforeSave: (resource: API.Resource, meta, extras, superFn) => {
    if (resource.attrs.creationDate === null || !resource.attrs.creationDate) {
      resource.attrs.creationDate = new Date();
    }
    return resource;
  },
  /**
   * An optional function called on each resource after it's found by the
   * adapter but before it's sent to the client. This lets you do things like
   * hide fields that some users aren't authorized to see. If you enable
   * `transformLinkage` in your resource type description, this will also
   * receive ResourceIdentifier objects. See README for details/caveats.
   *
   * @param {Resource} resource - The resource to be transformed
   * @param {Object} meta - Some information about the context in which the
   *   resource appeared.
   * @param {Object} extras - Various useful objects (e.g., the request object
   *   from your server's http library and the json-api lib; the resource type
   *   registry; etc.)
   * @param {Function} superFn - The beforeRender function on the parent
   *   resource type, if any
   * @returns {Resource|undefined|Promise<Resource|undefined>} - The transformed resource
   * @throws Can throw an error (APIError or Error) to abort the request
   */
  beforeRender: (resource: API.Resource, meta, extras, superFn) => {
    // Add a simulated "principalOf" link, which is the inverse of
    // the School.principal relationship. Don't fill it with contents
    // (by default), but do provide a link to the data on the school side.
    /*
    resource.relationships.principalOf = API.Relationship.of({
      data: null,
      links: {
        related: ({ type, ownerId }) =>
          `http://127.0.0.1:3000/schools?filter=(principal,${ownerId})`,
      },
      owner: { type: resource.type, id: resource.id, path: 'principalOf'},
    });
    */

    if (resource.attrs.creationDate === null) {
      resource.attrs.creationDate = undefined;
    }
    return resource;
  },
};
