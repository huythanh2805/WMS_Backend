import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  // Gửi email text đơn giản
  async sendSimpleMail(to: string, subject: string, text: string) {
    await this.mailerService.sendMail({
      to,
      subject,
      text, // plain text
      // html: '<b>Hello</b>' nếu không dùng template
    });
  }

  // Gửi email dùng template
  async sendMailWithTemplate({to, link, from}: {to: string, link: string, from: string}) {
    await this.mailerService.sendMail({
      to,
      from,
      subject: 'Bạn có một lời mời từ WMS',
      template: './index.pug', 
      context: {
        link,
        to,
        from,
        year: new Date().getFullYear(),
      },
    });
  }

  //reset password
  async sendResetPassword(to: string, resetLink: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'Đặt lại mật khẩu',
      template: './reset-password',
      context: { resetLink },
    });
  }
}