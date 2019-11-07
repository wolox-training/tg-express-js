module.exports = {
  User: {
    type: 'object',
    properties: {
      user: {
        type: 'object',
        properties: {
          first_name: {
            type: 'string',
            example: 'Tom'
          },
          last_name: {
            type: 'string',
            example: 'Engels'
          },
          email: {
            type: 'string',
            example: 'tom.engels@wolox.com.ar'
          },
          password: {
            type: 'string',
            example: '12345678abcABC'
          }
        }
      }
    }
  }
};
