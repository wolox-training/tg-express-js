exports.config = {
  environment: 'production',
  use_env_variable: 'DATABASE_URL',
  common: {
    database: {
      name: process.env.DB_NAME
    },

    session: {
      secret: process.env.SESSION_SECRET
    }
  },
  isProduction: true
};
