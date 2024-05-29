// utils/recaptchaUtils.ts

export const verifyRecaptcha = async (token: string | null) => {
  const response = await fetch('/api/verify-recaptcha', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });

  const data = await response.json();
  return data.success;
};
