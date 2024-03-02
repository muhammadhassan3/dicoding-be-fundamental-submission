/* eslint-disable no-undef */
const dotenv = require("dotenv");
dotenv.config();

const Hapi = require("@hapi/hapi");
const albums = require("./api/albums");
const AlbumService = require("./services/AlbumService");
const AlbumsValidator = require("./validator/album");
const ClientError = require("./exceptions/ClientError");
const songs = require("./api/songs");
const SongService = require("./services/SongService");
const SongsValidator = require("./validator/song");

const init = async () => {
  const albumService = new AlbumService();
  const songService = new SongService();
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.ext("onPreResponse", (request, h) => {
    const { response } = request;

    if (response instanceof ClientError) {
      const newResponse = h
        .response({
          status: "fail",
          message: response.message,
        })
        .code(response.statusCode);

      return newResponse;
    }

    return h.continue;
  });

  await server.register([
    {
      plugin: albums,
      options: {
        albumService: albumService,
        songService: songService,
        validator: AlbumsValidator,
      },
    },
    {
      plugin: songs,
      options: {
        service: songService,
        validator: SongsValidator,
      },
    },
  ]);

  server
    .start()
    .then(() => {
      console.log(`Server berhasil dijalankan pada ${server.info.uri}`);
    })
    .catch((e) => {
      console.log(e);
    });
};

init();
