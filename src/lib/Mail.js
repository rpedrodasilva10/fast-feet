import nodemailer from 'nodemailer';
import mailConfig from '../config/mail';

class Mail {
  constructor() {
    const { host, auth, secure, port } = mailConfig;

    this.transporter = nodemailer.createTransport({
      host,
      auth,
      secure,
      port,
    });
  }

  sendMail(message) {
    this.transporter.sendMail({
      ...message,
      ...mailConfig.default,
    });
  }
}

export default new Mail();
