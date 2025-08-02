import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

interface SendEmailParams {
  to: string;
  subject?: string;
  text: string;
}

export const sendEmail = async ({ to, subject = 'Email Verification', text }: SendEmailParams): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,      // SMTP host, e.g., smtp.gmail.com
    port: Number(process.env.EMAIL_PORT), // SMTP port, e.g., 465 or 587
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for 587
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
  });

  await transporter.sendMail({
    from: `"${process.env.APP_NAME}" <${process.env.EMAIL_USER}>`, // Dynamic app name
    to,
    subject,
    text,
  });
};
