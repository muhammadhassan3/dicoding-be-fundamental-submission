const mapDBToAlbums = ({ id, name, year }) => ({ id, name, year });

const mapDBToSongs = ({ id, title, performer }) => ({ id, title, performer });

const mapDBToSong = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumId,
}) => ({ id, title, year, performer, genre, duration, albumId });

module.exports = { mapDBToAlbums, mapDBToSongs, mapDBToSong };
