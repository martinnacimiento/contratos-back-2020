const { Client } = require("pg");
const { config } = require("../config");

const connectionData = {
  user: encodeURIComponent(config.dbUser),
  host: config.dbHost,
  database: config.dbName,
  password: encodeURIComponent(config.dbPassword),
  port: config.dbPort,
};

const client = new Client(connectionData);
client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})
module.exports = {
  query: (text, params) => client.query(text, params),
};
