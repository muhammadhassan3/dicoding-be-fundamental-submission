const ValidationError = require("../../exceptions/ValidationError");
const { SongsPayloadSchema, SongsQuerySchema } = require("./schema");

const SongsValidator = {
  validateSongPayload: (payload) => {
    const result = SongsPayloadSchema.validate(payload);

    if (result.error) {
      throw new ValidationError(result.error.message);
    }
  },
  validateSongQuery: (query) => {
    const result = SongsQuerySchema.validate(query);

    if (result.error) {
      throw new ValidationError(result.error.message);
    }
  },
};

module.exports = SongsValidator;
