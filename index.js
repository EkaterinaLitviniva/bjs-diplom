require('dotenv').config();
const { PORT, PUBLIC_PATH, INDEX_FILE, HOME_FILE } = process.env;
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync', {
    serialize: (data) => encrypt(JSON.stringify(data)),
    deserialize: (data) => JSON.parse(decrypt(data))
  });
const db = low(new FileSync('db.json'));
if(!db.get('users').value())
    setDefaultUser(db);

const app = express();
app.use(cookieParser());
app.use(session({secret: 'your secret here'}));
app.use(morgan('tiny'));
app.use(express.static(`${__dirname}/${PUBLIC_PATH}`));

const api = require('./routes');
app.use(bodyParser.json());
app.use('/', api);
app.use(morgan('tiny'));

app.get('*', function (request, response) {
    if(request.session.authorized){
      response.sendFile(path.resolve(`${__dirname}/${PUBLIC_PATH}`, HOME_FILE));
    }else{
      response.sendFile(path.resolve(`${__dirname}/${PUBLIC_PATH}`, INDEX_FILE));
    }
});

app.listen(PORT, () => console.log(`Server started at ${PORT}`));


function setDefaultUser(database){
    database.defaults({
        users: [
          { 
            created_at: "2019-10-15T05:28:25.593Z", 
            login: "oleg@demo.ru", 
            password: "demo", 
            id: "1", 
            isAuthorized: false,
            balance: {RUB: 1000, USD: 20, EUR: 20, NTC: 3000}
          },{ 
            created_at: "2019-11-16T05:28:25.593Z", 
            login: "ivan@demo.ru", 
            password: "demo", 
            id: "2", 
            isAuthorized: false,
            netocoins: 100,
            balance: {RUB: 20, USD: 0, EUR: 0, NTC: 100}
          },{ 
            created_at: "2019-5-14T05:28:25.593Z", 
            login: "petr@demo.ru", 
            password: "demo", 
            id: "3", 
            isAuthorized: false,
            balance: {RUB: 20000, USD: 300, EUR: 500, NTC: 50000}
          }
        ],
        favorites: {
          1: ["2", "3"],
          2: ["1", "3"],
          3: ["2"],
        }
      }).write()
}