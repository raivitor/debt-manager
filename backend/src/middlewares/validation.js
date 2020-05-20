const { check, param } = require('express-validator');
import { validationResult } from 'express-validator';

export const validateIdParam = [param('id').notEmpty().toInt().isInt()];

export const validateDebt = [
  check('idUser').toInt().isInt(),
  check('reason').notEmpty().trim(),
  check('date').isISO8601('yyyy-mm-dd'),
  check('value').isDecimal()
];

export const validate = (validations, optional = false) => {
  return async (req, res, next) => {
    await Promise.all(
      validations.map(validation =>
        optional ? validation.optional().run(req) : validation.run(req)
      )
    );

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(422).json({ errors: errors.array() });
  };
};
