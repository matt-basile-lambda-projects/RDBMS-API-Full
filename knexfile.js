// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './lambda.sqlite3'
    },
    useNullAsDefault: true
  },

};
