const dataToSignUpSession = (req, user, errMessage) => {
  req.session.inputData = {
    hasError: true,
    message: errMessage,
    email: user.email,
    password: user.password,
    "confirm-password": user["confirm-password"],
    name: user.name,
    address: user.address.address,
    city: user.address.city,
    province: user.address.province,
    postal: user.address.postal,
    unit: user.address.unit,
  };
};

const dataToLoginSession = (req, user, errMessage) => {
  req.session.inputData = {
    hasError: true,
    message: errMessage,
    email: user.email,
    password: user.password,
  };
};

const initialSignup = () => {
  return (sessionData = {
    hasError: false,
    message: "",
    email: "",
    password: "",
    "confirm-password": "",
    name: "",
    address: "",
    city: "",
    province: "",
    postal: "",
    unit: "",
  });
};

const initialLogin = () => {
    return (sessionData = {
      hasError: false,
      message: "",
      email: "",
      password: "",
    });
  };

module.exports = { dataToSignUpSession, initialSignup, dataToLoginSession, initialLogin };
