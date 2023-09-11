import nodeMailer from "nodemailer";
import "dotenv/config";

class NodeMailer {
  static sendEmail(recipients, affair, content, res) {
    const transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASSWORD_EMAIL,
      },
    });

    const mailOptions = {
      from: process.env.USER_EMAIL,
      subject: affair,
      html: content,
      to:recipients
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return res.error("fallo" + error);
      } else {
        return res.success("sisisis");
      }
    });
  }
}

export default NodeMailer;
