class AlbumHandler {
  constructor(albumService, songService, validator) {
    this._albumService = albumService;
    this._validator = validator;
    this._songService = songService;

    this.getAlbums = this.getAlbums.bind(this);
    this.getAlbumById = this.getAlbumById.bind(this);
    this.postAlbum = this.postAlbum.bind(this);
    this.putAlbum = this.putAlbum.bind(this);
    this.deleteAlbumById = this.deleteAlbumById.bind(this);
  }

  async getAlbums() {
    const albums = await this._albumService.getAlbums();

    return {
      status: "success",
      data: {
        albums,
      },
    };
  }

  async getAlbumById(request) {
    const { id } = request.params;
    const albums = await this._albumService.getAlbumById(id);
    const songs = await this._songService.getSongsByAlbumId(id);

    return {
      status: "success",
      data: {
        album: { ...albums, songs },
      },
    };
  }

  async postAlbum(request, h) {
    this._validator.validateAlbumPayload(request.payload);
    const { name, year } = request.payload;

    const id = await this._albumService.addAlbum({ name, year });
    const response = h.response({
      status: "success",
      message: "Album berhasil ditambahkan",
      data: {
        albumId: id,
      },
    });
    return response.code(201);
  }

  async putAlbum(request, h) {
    this._validator.validateAlbumPayload(request.payload);
    const { id } = request.params;

    const result = await this._albumService.editAlbum(id, request.payload);

    return h.response({
      status: "success",
      message: "Album berhasil diperbarui",
      data: {
        albumId: result,
      },
    });
  }

  async deleteAlbumById(request) {
    const { id } = request.params;

    await this._albumService.deleteAlbumById(id);

    return {
      status: "success",
      message: "Album berhasil dihapus",
    };
  }
}

module.exports = AlbumHandler;
