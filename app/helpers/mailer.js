const nodemailer = require('nodemailer');
const config = require('../../config').common.mailer;

module.exports = nodemailer.createTransport(config);
