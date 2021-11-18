const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

const auth = {
  auth: {
    api_key: process.env.MAILGUN_API,
    domain: process.env.DOMAIN_KEY,
  },
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (email, subject, arrayCart, emailObject) => {
  // find file template
  const emailTemplateSource = fs.readFileSync(
    path.join(__dirname, "../templates/emailTemplate.ejs"),
    "utf8"
  );

  // compile ejs
  const template = ejs.compile(emailTemplateSource);

  //   passes in object and array
  let htmlToSend = template({
    emailObject,
    arrayCart,
  });

  const mailOptions = {
    from: email,
    to: process.env.TARGET_EMAIL,
    // to: ["summerbreeze.thai@gmail.com", email],
    subject,
    html: htmlToSend,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log(err, null);
    } else {
      console.log(`Sent`);
    }
  });
};

module.exports = sendMail;
