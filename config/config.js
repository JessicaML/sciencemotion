module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": null,
    "database": "blog-app",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.DB_USERNAME,
    "password": null,
    "database": "blog-app-test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": null,
    "database": "blog-app-production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
};
