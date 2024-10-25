// app/utils/emailUtils

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

const gamehubLogo =
  "https://res.cloudinary.com/dn4gfzlhq/image/upload/v1694532366/ade_ljooff.png";

export const sendWelcomeEmail = async (email, firstName) => {
  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: "Welcome to Adex GameHub",
    html: `
    <div style="background-color: #2E3440; padding: 20px; color: #ffffff; border-radius: 5px;">
      <img src="${gamehubLogo}" alt="GameHub Logo" style="max-width: 150px; height: 30px; margin-bottom: 20px;">
      <div style="text-align: center;">
        <h1 style="font-size: 24px; margin-bottom: 20px;">Welcome to Adex GameHub, ${firstName}!</h1>
        <p style="font-size: 16px;">We're thrilled to have you join our gaming community.</p>
        <p style="font-size: 16px;">As a member of GameHub, you'll have access to a world of exciting games and exclusive content.</p>
        <p style="font-size: 16px;">Be sure to check out the latest features and connect with fellow gamers.</p>
        <p style="font-size: 16px;">If you have any questions or need assistance, feel free to reach out to our support team.</p>
        <p style="font-size: 16px;">Happy gaming!</p>
        <br>
        <p style="font-size: 16px;">Best regards,</p>
        <p style="font-size: 16px;">The Adex GameHub Team</p>
      </div>
    </div>
  `,
  };

  return transporter.sendMail(mailOptions);
};

const gamehub = process.env.NEXTAUTH_URL;

export const sendResetPasswordEmail = async (email, resetLink, username) => {
  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: "Reset Your Password - Adex GameHub",
    html: `
      <div style="background-color: #2E3440; padding: 20px; color: #ffffff; border-radius: 5px">
        <img src="${gamehubLogo}" alt="GameHub Logo" style="max-width: 150px; height: 30px; margin-bottom: 20px;">
        <div style="text-align: center;">
          <h1 style="font-size: 24px; margin-bottom: 20px;">Reset Your Password</h1>
          <p style="font-size: 16px;">You or Someone attempted to reset the password for your account ${username} on <a href="${gamehub}" style="color: orange;">Adex GameHub</a>. Click the link below to reset your password:</p>
          <a href="${resetLink}" style="display: inline-block; background-color: #FF2E51; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px;">Reset Password</a>
          <br>
          <p style="font-size: 16px; margin-top: 20px;">If you did not request a password reset, please ignore this email.</p>
          <br>
          <p style="font-size: 16px;">Best regards,</p>
          <p style="font-size: 16px;">The Adex GameHub Team</p>
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

export const sendPasswordChangeEmail = async (email, firstName) => {
  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: "Your Password Has Been Changed - Adex GameHub",
    html: `
      <div style="background-color: #2E3440; padding: 20px; color: #ffffff; border-radius: 5px;">
        <img src="${gamehubLogo}" alt="GameHub Logo" style="max-width: 150px; height: 30px; margin-bottom: 20px;">
        <div style="text-align: center;">
          <h1 style="font-size: 24px; margin-bottom: 20px;">Password Change Notification</h1>
          <p style="font-size: 16px;">Hello ${firstName},</p>
          <p style="font-size: 16px;">This is a confirmation that the password for your account on <a href="${gamehub}" style="color: orange;">Adex GameHub</a> has been successfully changed.</p>
          <p style="font-size: 16px;">If you did not make this change, please contact our support team immediately.</p>
          <br>
          <p style="font-size: 16px;">Best regards,</p>
          <p style="font-size: 16px;">The Adex GameHub Team</p>
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};



export const sendSupportEmail = async (name, email, message) => {
  const mailOptions = {
    from: email,
    to: process.env.USER, // Replace with your support email
    subject: "Support Request",
    html: `
      <div style="background-color: #2E3440; padding: 30px; color: #ffffff; border-radius: 8px; font-family: Arial, sans-serif;">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="${gamehubLogo}" alt="GameHub Logo" style="max-width: 150px; height: auto;">
        </div>
        <div style="text-align: left; max-width: 600px; margin: 0 auto;">
          <h1 style="font-size: 26px; margin-bottom: 20px; text-align: center;">Support Request</h1>
          <p style="font-size: 18px; line-height: 1.6;">Dear Support Team,</p>
          <p style="font-size: 18px; line-height: 1.6;">You have received a new support request. Please find the details below:</p>
          <p style="font-size: 18px; line-height: 1.6;"><strong>Name:</strong> ${name}</p>
          <p style="font-size: 18px; line-height: 1.6;"><strong>Email:</strong> ${email}</p>
          <p style="font-size: 18px; line-height: 1.6;"><strong>Message:</strong></p>
          <p style="font-size: 18px; line-height: 1.6;">${message}</p>
          <br>
          <p style="font-size: 18px; line-height: 1.6;">Best regards,</p>
          <p style="font-size: 18px; line-height: 1.6;">The GameHub Team</p>
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};
