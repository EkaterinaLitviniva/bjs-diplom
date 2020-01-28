class ApiConnector {
    /**
     * Пробует парсить тело ответа, если оно существует
     *
     * @static
     * @param {*} response body of response (empty object if does not exist)
     * @returns {Promise<Object>} parsed body
     * @memberof ApiConnector
     */
    static async _parseResponseBody(response) {
        try {
            return { response, responseBody: await response.json() };
        } catch (e) {
            return { responseBody: {}, response };
        }
    }

    /**
     * Отправляет запрос на авторизацию пользователя
     *
     * @static
     * @param {*} { username, password }
     * @param {Function} callback-функция с ошибкой `error` в качестве первого параметра (null если ошибки нет) и телом `data` в качестве второго параметра
     * @memberof ApiConnector
     */
    static login({ login, password }, callback) {
        const asyncPart = async () => {
            const body = JSON.stringify({login,password});

            const response = await fetch('/user/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body,
            });
            return await ApiConnector._parseResponseBody(response);
        };
        asyncPart()
            .then(({ response, responseBody }) => {
                if (response.ok) {
                    callback(null, responseBody);
                } else {
                    callback(responseBody, null);
                }
            })
            .catch(e => {
                console.error("Ошибка: ", e);
                callback(e, null);
            });
    }

    /**
     * Отправляет запрос на создание пользователя с переданными параметрами
     *
     * @static
     * @param {*} { username, password }
     * @param {Function} callback-функция с ошибкой `error` в качестве первого параметра (null если ошибки нет) и телом `data` в качестве второго параметра
     * @memberof ApiConnector
     */
    static register({login, password}, callback) {
        const asyncPart = async () => {
            const body = JSON.stringify({login, password});

            const response = await fetch('user/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body,
            });
            return await ApiConnector._parseResponseBody(response);
        };
        asyncPart()
            .then(({ response, responseBody }) => {
                if (response.ok) {
                    callback(null, responseBody);
                } else {
                    callback(responseBody, null);
                }
            })
            .catch(e => {
                console.error("Ошибка: ", e);
                callback(e, null);
            });
    }

    /**
     * Отправляет запрос на получение текущего авторизованного пользователя
     *
     * @static
     * @param {Function} callback-функция с ошибкой `error` в качестве первого параметра (null если ошибки нет) и телом `data` в качестве второго параметра
     * @memberof ApiConnector
     */
    static current(callback) {
        const asyncPart = async () => {

            const response = await fetch('user/current', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            });
            return await ApiConnector._parseResponseBody(response);
        };
        asyncPart()
            .then(({ response, responseBody }) => {
                if (response.ok) {
                    callback(null, responseBody);
                } else {
                    callback(responseBody, null);
                }
            })
            .catch(e => {
                console.error("Ошибка: ", e);
                callback(e, null);
            });
    }

    /**
     * Отправляет запрос деавторизацию пользователя
     *
     * @static
     * @param {Function} callback-функция с ошибкой `error` в качестве первого параметра (null если ошибки нет) и телом `data` в качестве второго параметра
     * @memberof ApiConnector
     */
    static logout(callback) {
        const asyncPart = async () => {

            const response = await fetch('user/logout', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
            });
            return await ApiConnector._parseResponseBody(response);
        };
        asyncPart()
            .then(({ response, responseBody }) => {
                if (response.ok) {
                    callback(null, responseBody);
                } else {
                    callback(responseBody, null);
                }
            })
            .catch(e => {
                console.error("Ошибка: ", e);
                callback(e, null);
            });
    }

    /**
     * Отправляет запрос на перевод денег авторизованного пользователя тому пользователю, чье имя передано
     *
     * @static
     * @param {*} { to, amount }
     * @param {Function} callback-функция с ошибкой `error` в качестве первого параметра (null если ошибки нет) и телом `data` в качестве второго параметра
     * @memberof ApiConnector
     */
/*    static transferMoney({ to, amount }, callback) {
        const asyncPart = async () => {
            const body = JSON.stringify({ to, amount });

            const response = await fetch('/api/wallet/transfer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
                credentials: 'include',
            });
            return await ApiConnector._parseResponseBody(response);
        };
        asyncPart()
            .then(({ response, responseBody }) => {
                if (response.ok) {
                    callback(null, responseBody);
                } else {
                    callback(responseBody, null);
                }
            })
            .catch(e => {
                callback(e, null);
            });
    }*/

    /**
     * Отправляет запрос на добавление денег авторизованному пользователю
     *
     * @static
     * @param {*} { currency, amount }
     * @param {Function} callback-функция с ошибкой `error` в качестве первого параметра (null если ошибки нет) и телом `data` в качестве второго параметра
     * @memberof ApiConnector
     */
/*    static addMoney({ currency, amount }, callback) {
        const asyncPart = async () => {
            const body = JSON.stringify({ currency, amount });

            const response = await fetch('/api/wallet/add-money', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
                credentials: 'include',
            });
            return await ApiConnector._parseResponseBody(response);
        };
        asyncPart()
            .then(({ response, responseBody }) => {
                if (response.ok) {
                    callback(null, responseBody);
                } else {
                    callback(responseBody, null);
                }
            })
            .catch(e => {
                callback(e, null);
            });
    }*/

    /**
     * Отправляет запрос на конвертацию денег авторизованного пользователя из одной валюты в другую
     *
     * @static
     * @param {*} { fromCurrency, targetCurrency, targetAmount }
     * @param {Function} callback-функция с ошибкой `error` в качестве первого параметра (null если ошибки нет) и телом `data` в качестве второго параметра
     * @memberof ApiConnector
     */
/*    static convertMoney({ fromCurrency, targetCurrency, targetAmount }, callback) {
        const asyncPart = async () => {
            const body = JSON.stringify({ fromCurrency, targetCurrency, targetAmount });

            const response = await fetch('/api/wallet/convert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
                credentials: 'include',
            });
            return await ApiConnector._parseResponseBody(response);
        };
        asyncPart()
            .then(({ response, responseBody }) => {
                if (response.ok) {
                    callback(null, responseBody);
                } else {
                    callback(responseBody, null);
                }
            })
            .catch(e => {
                callback(e, null);
            });
    }*/

    /**
     * Отправляет запрос на получение курсов валют (последние 100 записей)
     *
     * @static
     * @param {Function} callback-функция с ошибкой `error` в качестве первого параметра (null если ошибки нет) и телом `data` в качестве второго параметра
     * @memberof ApiConnector
     */
    static getStocks(callback) {
        const asyncPart = async () => {
            const response = await fetch('/stocks', {
                method: 'GET',
            });
            return await ApiConnector._parseResponseBody(response);
        };
        asyncPart()
            .then(({ response, responseBody }) => {
                if (response.ok) {
                    callback(null, responseBody);
                } else {
                    callback(responseBody, null);
                }
            })
            .catch(e => {
                console.error("Ошибка: ", e);
                callback(e, null);
            });
    }
}