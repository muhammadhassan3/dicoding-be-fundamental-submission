exports.up = (pgm) => {
  pgm.createTable("albums", {
    id: {
      type: "VARCHAR(20)",
      primaryKey: true,
      unique: true,
      notNull: true,
    },
    name: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    year: {
      type: "INTEGER",
      notNUll: true,
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
  });
};

exports.down = (pgm) => {
  pgm.dropTable("albums");
};
