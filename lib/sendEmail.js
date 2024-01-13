import { createTransport } from "nodemailer";
const sendEmail = async (options) => {
  // Create Transporter
  const transporter = createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "alex.bosco64@ethereal.email",
      pass: "Yc43axGFhx7tWNtjK9",
    },
  });
  // Define Mail Options
  const mailOptions = {
    from: '"Fred Foo 👻" <foo@example.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  // send email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
