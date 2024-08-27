import nodemailer from "nodemailer";
import { htmlToText } from "nodemailer-html-to-text";

export async function sendMail(message: string) {
  const { NAVER_EMAIL, NAVER_PASS, GMAIL_ID } = process.env;

  const transporter = nodemailer.createTransport({
    service: "naver",
    host: "smtp.naver.com",
    port: 587,
    auth: { user: NAVER_EMAIL, pass: NAVER_PASS },
  });

  transporter.use("compile", htmlToText());

  const mailOptions = {
    from: NAVER_EMAIL,
    to: GMAIL_ID,
    subject: `Burgerput에서 문의가 도착했어요!`,
    html: `
        <h1>Burgerput에서 문의가 도착했어요!</h1>
        <p>${message}</p>
        <br/>
        <p>서둘러 접속하세요!</p>
        <a href="https://burgerput-chat.site">접속</a>
    `,
  };

  await transporter.sendMail(mailOptions);
}
