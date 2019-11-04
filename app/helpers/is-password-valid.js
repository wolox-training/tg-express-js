module.exports = password => {
  const alphanumeric_regex = /^[a-z0-9]+$/i;
  return alphanumeric_regex.test(password) && password.length >= 8;
};
