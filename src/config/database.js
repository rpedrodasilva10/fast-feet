module.exports = {
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'fastfeet',
  dialect: 'postgres',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
