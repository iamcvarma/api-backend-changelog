import { validationResult } from "express-validator";

export const handleInpupErrors = (req, res, next) => {
  const errors = validationResult(req);
  //error
  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ errors: errors.array() });
  } else {
    next();
  }
};
