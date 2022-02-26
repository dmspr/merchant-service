var mysql = require('mysql'); 

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'merchant_service',
    
});
module.exports = db
