import Joi from "joi";
import mongoose from "mongoose";

const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
}, "ObjectId Validation");

export const createChatSchema = Joi.object({
  users: Joi.array()
    .items(
      objectId.messages({
        "any.invalid": `"users" must contain valid ObjectIds`,
      })
    )
    .min(1)
    .required()
    .messages({
      "array.base": `"users" must be an array`,
      "array.min": `"users" must contain at least one user`,
      "any.required": `"users" is required`,
    }),
  name: Joi.string().trim().required().messages({
    "string.empty": `"name" cannot be empty`,
    "any.required": `"name" is required`,
  }),
  admin: objectId.required().messages({
    "any.required": `"admin" is required`,
    "any.invalid": `"admin" must be a valid ObjectId`,
  }),
  isGroup: Joi.boolean().required().messages({
    "any.required": `"isGroup" is required`,
    "boolean.base": `"isGroup" must be a boolean`,
  }),
});

export const chatIdParamSchema = Joi.object({
  chatId: objectId.required().messages({
    "any.required": `"chatId" is required`,
    "any.invalid": `"chatId" must be a valid ObjectId`,
  }),
});

export const editChatSchema = Joi.object({
  name: Joi.string().trim().optional(),

  users: Joi.array().items(objectId).min(1).optional().messages({
    "array.min": `"users" must have at least 1 member`,
    "any.invalid": `All "users" must be valid ObjectIds`,
  }),

  isGroup: Joi.boolean().valid(true).required().messages({
    "any.only": `"isGroup" must be true to edit a chat`,
  }),
});
