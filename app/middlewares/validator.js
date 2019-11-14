const { checkSchema, validationResult } = require('express-validator');
const errors = require('../errors');

const validate = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    return next();
  }
  const extractedErrors = validationErrors.array().map(err => ({ [err.param]: err.msg }));

  throw errors.schemaError({ validationErrors: extractedErrors });
};

const validateSchemaAndFail = schema => [checkSchema(schema), validate];

module.exports = { validateSchemaAndFail };
