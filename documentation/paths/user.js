module.exports = {
  '/users': {
    post: {
      tags: ['CRUD operations'],
      description: 'Sign Up user',
      operationId: 'signUp',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User'
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          description: 'New user was created'
        },
        409: {
          description: 'User already exists',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'User´s email already exists',
                internal_code: 'user_exists_error'
              }
            }
          }
        },
        422: {
          description: 'Invalid parameters',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'Password must be alphanumeric and have a length of 8 or more characters',
                internal_code: 'user_exists_error'
              }
            }
          }
        }
      }
    }
  }
};
