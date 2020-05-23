declare module 'fortune' {
  let methods: ForMethods;
  let errors: Errors;
}

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