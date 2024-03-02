exports.up = (pgm) => {
  pgm.createTable(
    "songs",
    {
      id: {
        type: "VARCHAR(20)",
        primaryKey: true,
      },
      title: {
        type: "VARCHAR(50)",
        notNull: true,
      },
      year: {
        type: "INTEGER",
        notNull: true,
      },
      genre: {
        type: "VARCHAR(15)",
        notNull: true,
      },
      performer: {
        type: "VARCHAR(50)",
        notNull: true,
      },
      duration: {
        type: "INTEGER",
        default: "0",
      },
      album_id: {
        type: "VARCHAR(20)",
      },
      createdAt: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("current_timestamp"),
      },
      updatedAt: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("current_timestamp"),
      },
    },
    {
      constraints: {
        foreignKeys: {
          columns: "album_id",
          references: "albums",
          onUpdate: "cascade",
          onDelete: "cascade",
        },
      },
    }
  );
};

exports.down = (pgm) => {
  pgm.dropTable("songs");
};
