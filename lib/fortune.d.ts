export as namespace fortune;

export = MainFunction;

declare function MainFunction(recordTypes: any, options: Options):any;


declare interface Options {
  /**
   * configuration array for the adapter
   */
  adapter? : any;
  hooks?: any;
  documentation?: any;
  settings?: any;
}

declare namespace MainFunction {
  export let methods: ForMethods;
  export let errors: Errors;
  
  interface ForMethods {
    create: any;
    update: any;
    delete: any;
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
}