const routes = (handler) => [
  {
    method: "POST",
    path: "/songs",
    handler: handler.postSong,
  },
  {
    method: "GET",
    path: "/songs",
    handler: handler.getSongs,
  },
  {
    method: "GET",
    path: "/songs/{id}",
    handler: handler.getSongById,
  },
  {
    method: "PUT",
    path: "/songs/{id}",
    handler: handler.putSong,
  },
  {
    method: "DELETE",
    path: "/songs/{id}",
    handler: handler.deleteSong,
  },
];

module.exports = routes;
