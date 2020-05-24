export as namespace fortune;
export let methods: ForMethods;
export let errors: Errors;

export = Main


interface ForMethods {
  create;
  update;
  delete;
}

interface Errors {
  BadRequestError;
}

// Input hooks
interface Context {
  request: Request & ForRequest;
}

interface ForRequest {
  meta: ForMeta;
}

interface ForMeta {
  language;
}