var validate = require('express-jsonschema').validate;
var modelSchemas = require('require-all')({
  dirname     :  __dirname + '/controllers',
  filter      :  /(.+Controller)\.js$/,
  excludeDirs :  /^\.(git|svn)$/,
  recursive   : true
});

module.exports = function() {
  return function validator(req, res, next) {
    if (req.method == 'POST' || req.method == 'PATCH') {
      var urlParts = req.url.split('/');

      var model = (urlParts[2].split('?'))[0].slice(0, -1);
      if (model == 'user') {
        return next();
      } else {
        validate({
          body: modelSchemas[model]
        })(req, res, next);
      }
    } else {
      return next();
    }
  }
};