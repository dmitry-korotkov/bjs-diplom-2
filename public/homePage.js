const logOut = new LogoutButton();
logOut.action = function () {
  ApiConnector.logout((res) => {
    if (res.success) {
      location.reload();
    }
  });
};
