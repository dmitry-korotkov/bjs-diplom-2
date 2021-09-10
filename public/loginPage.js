'use strict';

const user = new UserForm();
user.loginFormCallback = function (data) {
  //console.log(data);
  ApiConnector.login(data, (res) => {
    if (res.success) {
      location.reload();
    } else {
      this.setLoginErrorMessage(res.error);
    }
  });
};

user.registerFormCallback = function (data) {
  console.log(data);
  ApiConnector.register(data, (res) => {
    if (res.success) {
      location.reload();
    } else {
      this.setMessage(res.succes, res.error);
    }
  });
};
