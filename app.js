let express = require('express');
let compression = require('compression');
let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let cors = require('cors');

let routerHlp = require('./helpers/router');
let index = require('./routes/index');
let apiDatabase = require('./routes/api_database');
let apiSign = require('./routes/api_sign');
let apiBot = require('./routes/api_bot');

let apiImage = require('./routes/api_image');

const CHATSHIER = require('./config/chatshier');

let corsCfg = { // the attributes of CORS must be lower case
    origin: CHATSHIER.CORS.ORIGIN,
    methods: CHATSHIER.CORS.METHODS,
    allowedHeaders: CHATSHIER.CORS.ALLOWED_HEADERS,
    credentials: CHATSHIER.CORS.CREDENTIALS
};

let app = express();
app.use(compression());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));

app.use(cors(corsCfg));
app.use(cookieParser());

// API JWT 權限驗證
app.use('/api/', apiDatabase);

module.exports = app;
