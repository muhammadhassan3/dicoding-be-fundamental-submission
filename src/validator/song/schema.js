const Joi = require("joi");

const SongsPayloadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().required(),
  genre: Joi.string().required(),
  performer: Joi.string().required(),
  duration: Joi.number().default(0),
  albumId: Joi.string(),
});

const SongsQuerySchema = Joi.object({
  title: Joi.string(),
  performer: Joi.string(),
});

module.exports = { SongsPayloadSchema, SongsQuerySchema };
