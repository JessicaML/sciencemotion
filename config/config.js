module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": null,
    "database": "sciencemotion",
    "host": "",
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.DB_USERNAME,
    "password": null,
    "database": "sciencemotion-test",
    "host": "",
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": null,
    "database": "sciencemotion-production",
    "host": "",
    "dialect": "postgres"
  }
};
