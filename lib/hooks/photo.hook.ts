import * as fortune from 'fortune';
const { methods, errors: { BadRequestError } } = fortune;

function userInput(context: Context, record, update) {
  const { request: { method, meta: { language } } } = context;

  switch(method) {
    case methods.create:
      
      break;
  }
}
