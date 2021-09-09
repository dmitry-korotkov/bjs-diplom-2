'use strict';

const user = new UserForm();
user.loginFormCallback = function (data) {
  console.log(data);
  ApiConnector.login(data, (res) => {
    if (res.success) {
      location.reload();
    } else {
      console.log(res.error);
    }
  });
};
