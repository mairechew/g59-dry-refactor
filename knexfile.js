
const config = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './data/mydb.sqlite',
  },
}

module.exports = {
  development: config,
  production: config,
  test: config
}