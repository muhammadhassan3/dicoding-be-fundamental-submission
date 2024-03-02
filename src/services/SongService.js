const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const ClientError = require("../exceptions/ClientError");
const NotFoundError = require("../exceptions/NotFoundError");
const { mapDBToSong, mapDBToSongs } = require("../utils/Mapper");

class SongService {
  constructor() {
    this._pool = new Pool();
  }

  async addSong({ title, year, performer, genre, duration, albumId }) {
    const id = "song-" + nanoid(12);
    const query = {
      text: "INSERT INTO songs(id, title, year, performer, genre, duration, album_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
      values: [id, title, year, performer, genre, duration, albumId || null],
    };

    const result = await this._pool.query(query).catch((e) => {
      console.log(query.values);
      console.log(e);
    });

    if (!result.rows[0].id) {
      throw new ClientError("Lagu gagal ditambahkan");
    }

    return result.rows[0].id;
  }

  async getSongs({ title, performer }) {
    let query = "SELECT id, title, performer FROM songs";

    if (title || performer) {
      query += " where ";

      if (title && !performer) {
        query += `lower(title) like '%${title.toLowerCase()}%'`;
      } else if (performer && !title) {
        query += `lower(performer) like '%${performer.toLowerCase()}%'`;
      } else {
        query += `lower(title) like '%${title.toLowerCase()}%' and lower(performer) like '%${performer.toLowerCase()}%'`;
      }
    }

    const result = await this._pool.query(query).catch((e) => {
      console.log(e);
    });
    return result.rows.map(mapDBToSongs);
  }

  async getSongById(id) {
    const query = {
      text: "SELECT id, title, year, performer, genre, duration, album_id FROM songs WHERE id=$1",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Lagu tidak ditemukan");
    }

    return mapDBToSong(result.rows[0]);
  }

  async getSongsByAlbumId(albumId) {
    const query = {
      text: "SELECT id, title, performer from songs where album_id = $1",
      values: [albumId],
    };

    const result = await this._pool.query(query);

    return result.rows.map(mapDBToSongs);
  }

  async editSong(id, { title, year, genre, performer, duration, albumId }) {
    const query = {
      text: "UPDATE songs SET title=$1, year=$2, genre=$3, performer=$4, duration=$5, album_id=$6 where id=$7 RETURNING id",
      values: [title, year, genre, performer, duration, albumId, id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("Gagal mengubah lagu, id tidak ditemukan");
    }

    return result.rows[0].id;
  }

  async deleteSong(id) {
    const query = {
      text: "DELETE FROM songs WHERE id=$1 RETURNING id",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("Gagal menghapus lagi, id tidak ditemukan");
    }
  }
}

module.exports = SongService;
