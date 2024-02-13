import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

const gamehubLogo =
  "https://res.cloudinary.com/dn4gfzlhq/image/upload/v1696412102/g6rc63rwcygeqzbavdsj.png";

export const sendWelcomeEmail = async (email, firstName) => {
  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: "Welcome to Adex GameHub",
    html: `
      <div style="background-color: #2E3440; padding: 20px; color: #ffffff; border-radius: 5px">
        <img src="${gamehubLogo}" alt="GameHub Logo" style="max-width: 150px; height: 30px; margin-bottom: 20px;">
        <div style="text-align: center;">
          <h1 style="font-size: 24px; margin-bottom: 20px;">Welcome to GameHub, ${firstName}!</h1>
          <p style="font-size: 16px;">We're excited to have you join our gaming community.</p>
          <p style="font-size: 16px;">Get ready for an immersive gaming experience with GameHub.</p>
          <p style="font-size: 16px;">If you have any questions or need assistance, feel free to reach out.</p>
          <p style="font-size: 16px;">Enjoy your gaming journey with us!</p>
          <br>
          <p style="font-size: 16px;">Best regards,</p>
          <p style="font-size: 16px;">The GameHub Team</p>
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};
