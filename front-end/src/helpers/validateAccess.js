const minLengthPassword = 6;
const emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const validateRegister = ({ email, name, password }) => {
  const minLengthName = 12;
  const emailIsValid = emailFormat.test(email);
  const nameIsValid = name.length >= minLengthName;
  const passwordIsValid = password.length >= minLengthPassword;
  return emailIsValid && passwordIsValid && nameIsValid;
};

export const validateLogin = ({ email, password }) => {
  const emailIsValid = emailFormat.test(email);
  const passwordIsValid = password.length >= minLengthPassword;
  return emailIsValid && passwordIsValid;
};
