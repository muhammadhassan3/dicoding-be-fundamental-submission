const routes = (handler) => [
  {
    method: "GET",
    path: "/albums",
    handler: handler.getAlbums,
  },
  {
    method: "POST",
    path: "/albums",
    handler: handler.postAlbum,
  },
  {
    method: "GET",
    path: "/albums/{id}",
    handler: handler.getAlbumById,
  },
  {
    method: "PUT",
    path: "/albums/{id}",
    handler: handler.putAlbum,
  },
  {
    method: "DELETE",
    path: "/albums/{id}",
    handler: handler.deleteAlbumById,
  },
];

module.exports = routes;
