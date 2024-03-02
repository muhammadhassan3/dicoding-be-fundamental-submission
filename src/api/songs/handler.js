class SongsHandler {
  constructor(songService, validator) {
    this._songService = songService;
    this._validator = validator;

    this.postSong = this.postSong.bind(this);
    this.getSongs = this.getSongs.bind(this);
    this.getSongById = this.getSongById.bind(this);
    this.putSong = this.putSong.bind(this);
    this.deleteSong = this.deleteSong.bind(this);
  }

  async postSong(req, h) {
    this._validator.validateSongPayload(req.payload);

    const id = await this._songService.addSong(req.payload);
    return h
      .response({
        status: "success",
        message: "Data berhasil ditambahkan",
        data: {
          songId: id,
        },
      })
      .code(201);
  }

  async getSongs(req) {
    this._validator.validateSongQuery(req.query);

    const songs = await this._songService.getSongs(req.query);

    return {
      status: "success",
      data: {
        songs,
      },
    };
  }

  async getSongById(req) {
    const { id } = req.params;

    const result = await this._songService.getSongById(id, req.payload);

    return {
      status: "success",
      data: {
        song: result,
      },
    };
  }

  async putSong(req) {
    this._validator.validateSongPayload(req.payload);
    const { id } = req.params;

    await this._songService.editSong(id, req.payload);

    return {
      status: "success",
      message: "Data berhasil diperbarui",
    };
  }

  async deleteSong(req) {
    const { id } = req.params;

    await this._songService.deleteSong(id);

    return {
      status: "success",
      message: "Data berhasil dihapus",
    };
  }
}

module.exports = SongsHandler;
