const isEmpty = (value) => {
  return !value || value.trim() === "";
};

const userCredsValid = (email, password, confirmedPassword) => {
  return (
    email &&
    email.includes("@") &&
    password &&
    password.trim().length > 7 &&
    confirmedPassword === password
  );
};

const userInputIsValid = (user) => {
  return (
    userCredsValid(user.email, user.password, user["confirm-password"]) &&
    !isEmpty(user.name) &&
    !isEmpty(user.address.address) &&
    !isEmpty(user.address.postal) &&
    !isEmpty(user.address.city) &&
    !isEmpty(user.address.province)
  );
};

module.exports = userInputIsValid;
