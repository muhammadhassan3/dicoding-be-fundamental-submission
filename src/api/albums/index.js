const AlbumsHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "albums",
  version: "1.0.0",
  register: async (server, { albumService, songService, validator }) => {
    const handler = new AlbumsHandler(albumService, songService, validator);
    server.route(routes(handler));
  },
};
