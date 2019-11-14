const signIn = {
  user: {
    in: ['body'],
    exists: {
      errorMessage: 'Missing user field'
    }
  },
  'user.password': {
    isLength: {
      errorMessage: 'Password should be at least 8 chars long',
      options: { min: 8 }
    },
    isAlphanumeric: {
      errorMessage: 'Password must be alphanumeric'
    }
  },
  'user.email': {
    exists: {
      errorMessage: 'Missing email'
    },
    isEmail: true,
    errorMessage: 'Email is invalid',
    custom: {
      options: email => /@wolox.com/.test(email),
      errorMessage: 'Email does not belong to Wolox domain'
    }
  }
};

const signUp = {
  ...signIn,
  'user.first_name': {
    isAlpha: {
      errorMessage: 'First name is not alphabetic'
    }
  },
  'user.last_name': {
    isAlpha: {
      errorMessage: 'Last name is not alphabetic'
    }
  }
};

module.exports = {
  signUp,
  signIn
};
