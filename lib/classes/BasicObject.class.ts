export interface IBasicObject {
  modelName: String;
  model: any;

  inputHook(context, record, update);
  outputHook(context, record);
}