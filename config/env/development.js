module.exports = {
  env: 'development',
  db: 'mongodb://localhost/manager-tasks',
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  port: 8080,
  address: 'localhost',
  domain: 'localhost',
  mailer: {
    auth: {
      api_key: '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'
    }
  }
};
