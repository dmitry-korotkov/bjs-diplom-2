const logOut = new LogoutButton();
logOut.action = function () {
  ApiConnector.logout((res) => {
    if (res.success) {
      location.reload();
    }
  });
};

ApiConnector.current((res) => {
  //console.log(res);
  if (res.success) {
    ProfileWidget.showProfile(res.data);
  }
});

const rates = new RatesBoard();

function getRates() {
  ApiConnector.getStocks((res) => {
    if (res.success) {
      rates.clearTable();
      rates.fillTable(res.data);
    }
  });
}

getRates();
setInterval(getRates, 60000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = function (data) {
  ApiConnector.addMoney(data, (res) => {
    console.log(res);
    if (res.success) {
      ProfileWidget.showProfile(res.data);
      this.setMessage(res.success, 'Пополнение баланса произошло успешно!');
    } else {
      this.setMessage(res.success, res.error);
    }
  });
};

moneyManager.conversionMoneyCallback = function (data) {
  ApiConnector.convertMoney(data, (res) => {
    if (res.success) {
      ProfileWidget.showProfile(res.data);
      this.setMessage(res.success, 'Конвертация произошла успешно!');
    } else {
      this.setMessage(res.success, res.error);
    }
  });
};

moneyManager.sendMoneyCallback = function (data) {
  ApiConnector.transferMoney(data, (res) => {
    if (res.success) {
      ProfileWidget.showProfile(res.data);
      this.setMessage(res.success, 'Валюта переведена успешно!');
    } else {
      this.setMessage(res.success, res.error);
    }
  });
};

const favorit = new FavoritesWidget();

ApiConnector.getFavorites((res) => {
  if (res.success) {
    favorit.clearTable();
    favorit.fillTable(res.data);
    moneyManager.updateUsersList(res.data);
  }
});

favorit.addUserCallback = function (data) {
  ApiConnector.addUserToFavorites(data, (res) => {
    if (res.success) {
      this.clearTable();
      this.fillTable(res.data);
      moneyManager.updateUsersList(res.data);
      this.setMessage(res.success, 'Пользователь добавлен!');
    } else {
      this.setMessage(res.success, res.error);
    }
  });
};

favorit.removeUserCallback = function (data) {
  ApiConnector.removeUserFromFavorites(data, (res) => {
    if (res.success) {
      this.clearTable();
      this.fillTable(res.data);
      moneyManager.updateUsersList(res.data);
      this.setMessage(res.success, 'Пользователь удален!');
    } else {
      this.setMessage(res.success, res.error);
    }
  });
};
