const { checkSchema, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  validationErrors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    validationErrors: extractedErrors
  });
};

const validateSchemaAndFail = schema => [checkSchema(schema), validate];

module.exports = { validate, validateSchemaAndFail };
