const ValidationError = require("../../exceptions/ValidationError.js");
const { AlbumPayloadSchema } = require("./schema.js");

const AlbumValidator = {
  validateAlbumPayload: (payload) => {
    const result = AlbumPayloadSchema.validate(payload);

    if (result.error) {
      throw new ValidationError(result.error.message);
    }
  },
};

module.exports = AlbumValidator;
