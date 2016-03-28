module.exports = {
  env: 'production',
  db: process.env.OPENSHIFT_MONGODB_DB_URL + 'managertasks',
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  port: process.env.OPENSHIFT_NODEJS_PORT,
  address: process.env.OPENSHIFT_NODEJS_IP,
  domain: process.env.OPENSHIFT_APP_DNS,
  mailer: {
    auth: {
      api_key: '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'
    }
  }
};
