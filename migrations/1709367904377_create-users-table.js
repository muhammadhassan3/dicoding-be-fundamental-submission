exports.up = (pgm) => {
  pgm.createTable("users", {
    id: {
      type: "VARCHAR(20)",
      primaryKey: true,
    },
    username: {
      type: "VARCHAR(25)",
      notNull: true,
      unique: true,
    },
    password: {
      type: "TEXT",
      notNull: true,
    },
    fulname: {
      type: "TEXT",
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
    pgm.dropTable('pgm', {
        cascade: true
    })
};
