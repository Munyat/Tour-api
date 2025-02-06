const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  //1create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    //ACtivate in gmail "less secure app" option
  });

  //2 define the email option
  const mainOptions = {
    from: 'Brian Kipkirui Cheruiyot',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html
  };

  //3Actually send the email
  await transporter.sendMail(mainOptions);
};

module.exports = sendEmail;
