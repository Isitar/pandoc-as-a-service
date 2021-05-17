export function getBody(req, callback) {
  var buf = '';

  req.setEncoding('utf8');

  req.on('data', function(chunk) {
    buf += chunk
  });

  req.on('end', function() {
    callback(buf.trim());
  });
}
