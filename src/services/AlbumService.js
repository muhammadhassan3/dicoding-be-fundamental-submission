const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const ClientError = require("../exceptions/ClientError");
const NotFoundError = require("../exceptions/NotFoundError");
const { mapDBToAlbums } = require("../utils/Mapper");

class AlbumService {
  constructor() {
    this._pool = new Pool();
  }

  async addAlbum({ name, year }) {
    const id = `album-${nanoid(12)}`;
    const query = {
      text: "INSERT INTO albums(id, name, year) VALUES ($1, $2, $3) RETURNING id",
      values: [id, name, year],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new ClientError("Album gagal ditambahkan");
    }

    return result.rows[0].id;
  }

  async getAlbums() {
    const query = {
      text: "SELECT id, name, year FROM ALBUMS",
      values: [],
    };

    const result = await this._pool.query(query);

    return result.rows.map(mapDBToAlbums);
  }

  async getAlbumById(id) {
    const query = {
      text: "SELECT id, name, year FROM albums where id = $1",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("Album tidak ditemukan");
    }

    return mapDBToAlbums(result.rows[0]);
  }

  async editAlbum(id, { name, year }) {
    const query = {
      text: "UPDATE albums SET name=$1, year=$2 WHERE id=$3 RETURNING id",
      values: [name, year, id],
    };

    const result = await this._pool.query(query).catch((e) => {
      console.log(e);
    });

    if (!result.rowCount) {
      throw new NotFoundError("Gagal memperbarui album. id tidak ditemukan");
    }

    return result.rows[0];
  }

  async deleteAlbumById(id) {
    const query = {
      text: "DELETE FROM albums where id=$1 RETURNING id",
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError("Gagal menghapus album, id tidak ditemukan");
    }
  }
}

module.exports = AlbumService;
