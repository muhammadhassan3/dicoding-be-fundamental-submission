const route = require("./routes");
const SongsHandler = require("./handler");

module.exports = {
  name: "songs",
  version: "1.0.0",
  register: async (server, { service, validator }) => {
    const handler = new SongsHandler(service, validator);
    server.route(route(handler));
  },
};
