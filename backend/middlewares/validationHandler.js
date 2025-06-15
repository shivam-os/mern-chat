import qs from "qs";
import { REQ } from "../config/constants.js";
import { ApiError } from "../helpers/ApiError.js";

export const validationHandler = (schema, reqField) => (req, res, next) => {
  const { error: schemaError } = schema.validate(
    reqField === REQ.QUERY
      ? qs.parse(req[reqField], { plainObjects: true })
      : req[reqField],
    {
      abortEarly: false,
    }
  );

  if (schemaError) {
    const validationErrors = schemaError.details.map(
      (detail) => detail.message
    );

    throw new ApiError(400, "Check input fields again!", validationErrors);
  }

  next();
};
