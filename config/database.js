module.exports = {
  "development": {
    "storage": "db/development.db",
    "dialect": "sqlite3",
  },

  "test": {
    "storage": "db/test.db",
    "dialect": "sqlite3",
  },

  "production": {
    "url": process.env.DATABASE_URL,
    "pool": {
      "max": 5,
      "min": 0,
      "idle": 100000,
    },
  },
};
