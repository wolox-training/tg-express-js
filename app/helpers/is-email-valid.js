module.exports = email => {
  const wolox_email_regex = /@wolox.com/;
  return wolox_email_regex.test(email);
};
