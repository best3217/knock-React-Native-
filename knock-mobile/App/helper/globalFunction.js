export const validateEmail = (email) => {
  if (email?.length) {
    const mailFormat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return mailFormat.test(email);
  }
  return false;
};