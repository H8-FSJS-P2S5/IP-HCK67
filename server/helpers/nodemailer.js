const nodemailer = require("nodemailer");

const sendEmail = (recipientEmail) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "muhammadsubhantarmedi@gmail.com",
      pass: process.env.pass,
    },
  });

  const mailOptions = {
    from: "muhammadsubhan9727@gmail.com",
    to: recipientEmail,
    subject:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    text: "Selamat anda telah terdaftar di Hanstu!",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = sendEmail;
