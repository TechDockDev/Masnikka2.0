import { createTransport } from "nodemailer";
const sendEmail = async (options) => {
  // Create Transporter
  const transporter = createTransport({
    host: "us2.smtp.mailhostbox.com",
    port: 587,
    auth: {
      user: "noreply@masnikka.com",
      pass: "vNIvihX8",
    },
  });
  // Define Mail Options
  const mailOptions = {
    from: '"masnikka" <noreply@masnikka.com',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  // send email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
