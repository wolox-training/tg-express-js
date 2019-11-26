exports.config = {
  environment: 'production',
  common: {
    database: {
      name: process.env.DB_NAME
    },

    session: {
      secret: process.env.SESSION_SECRET,
      expiresIn: process.env.SESSION_EXPIRES_IN
    }
  },
  isProduction: true
};
