import express from 'express';
import { getBody } from './helpers.js';
import pdc from 'pdc';

const server = express();
server.set('views', './views');
server.set('view engine', 'ejs');
//server.use('public');

server.get('/', function(req, res) {
  res.render('index');
});

server.post('/:format', function(req, res) {
  var contentType = req.get('Content-Type');

  if (contentType) {
    var from = contentType.split("/")[1];
    var to = req.params.format;

    getBody(req, function(body) {
      pdc(body, from, to, function(err, result) {
        if (err) res.sendStatus(400)
          else res.append('Content-Type', 'text/' + to).send(result);
      });
    });
  } else res.sendStatus(400)
});

export function listen(port) {
  server.listen(port);
  console.log("Express server listening on port %d", port);
}
