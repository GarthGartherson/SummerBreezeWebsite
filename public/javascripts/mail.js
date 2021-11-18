const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

const auth = {
  auth: {
    api_key: "3de97acdec9efc7715fc2967c2e711dd-2ac825a1-14f9e77b",
    domain: "sandbox00948fde36ef48369ff6136fa2e236d6.mailgun.org",
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
    to: "summerbreeze.thai@gmail.com",
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
