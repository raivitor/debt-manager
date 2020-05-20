module.exports = {
  dialect: 'postgres',
  host: process.env.HOST,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DB,
  port: process.env.PORT || 5432,
  define: {
    timestamps: true,
    underscored: true
  }
};

/*
module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'fl0r14n0p0l1s',
  database: 'debt_db',
  define: {
    timestamps: true,
    underscored: true
  }
};
*/
