// utils/welcomeMessageTemplate.js

export const welcomeMessageTemplate = (firstName, logoUrl) => `
  <div style="background-color: #2E3440; padding: 20px; color: #ffffff; border-radius: 5px;">
    <img src="${logoUrl}" alt="GameHub Logo" style="max-width: 150px; height: 30px; margin-bottom: 20px;">
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
`;
