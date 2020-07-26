'use strict';

const logoutButton = new LogoutButton();

logoutButton.action = () => 
  ApiConnector.logout(response => {
    if (response.success)
      location.reload(); 
  });

  ApiConnector.current(response => {
    if (response.success)
      ProfileWidget.showProfile(response.data);
  });

  const ratesBoard = new RatesBoard();

  const ratesRequest = () => 
  ApiConnector.getStocks(response => {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }    
  });

  setInterval(exchangeRatesTable(), 60000);

  const money = new MoneyManager();

money.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(false, 'Пополнение выполнено');
        } else {
            money.setMessage(true, 'Невозможно перевести!');
        };
    });
};

money.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(false, 'Конвертирование выполнено');
        } else {
            money.setMessage(true, `Невозможно конвертировать`);
        };
    });
};

money.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(false, 'Перевод прошел');
        } else {
            money.setMessage(true, 'Перевод не прошел');
        };
    });
};

const person = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if (response.success) {
        person.clearTable();
        person.fillTable(response.data);
        money.updateUsersList(response.data);
    };
});

person.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            person.clearTable();
            person.fillTable(response.data);
            money.updateUsersList(response.data);
            person.setMessage(false, 'Пользователь успешно добавлен в адресную книгу');
        } else {
            person.setMessage(true, 'Пользователь не может быть добавлен');
        };
    });
};

person.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            person.clearTable();
            person.fillTable(response.data);
            money.updateUsersList(response.data);
            person.setMessage(false, 'Пользователь успешно удален'); 
        } else {
            person.setMessage(true, 'Невозможно удалить пользователя');
        };
    });
};