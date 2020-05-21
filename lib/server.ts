// Aqui viene el programa principal : )
import * as http from 'http';
import * as fortuneHTTP from 'fortune-http';

import { store } from './store';
import { request, response } from 'express';

const PORT = 3001;

const listener = fortuneHTTP(store, {
  // The order specifies priority of media type negotiation.
  serializers: [
    fortuneHTTP.JsonSerializer,
    fortuneHTTP.HtmlSerializer,
    fortuneHTTP.FormDataSerializer,
    fortuneHTTP.FormUrlEncodedSerializer,
  ],
});

const server = http.createServer((request, response) => {
  listener(request, response)
  .catch( error => {
    // Error logging
  });
});

server.listen(PORT);
console.log(`Server running at http://localhost:${PORT} !`);