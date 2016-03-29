module.exports = {
  env: 'development',
  db: 'mongodb://localhost/manager-tasks',
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  port: 8080,
  address: 'localhost',
  domain: 'localhost',
  db_debug: true,
  logger: 'dev',
  mailer: {
    auth: {
      api_key: process.env.SEND_GRID_KEY
    }
  }
};
