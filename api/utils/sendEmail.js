const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASS_ID,
      },
    });

    await transport.sendMail({
      from: `"LastWord" <applastword@gmail.com>`,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email has been send");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendEmail };
