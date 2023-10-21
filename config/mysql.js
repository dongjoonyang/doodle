var mysql = require('mysql2');
var db_info = {
    host: '127.0.0.1', // localhost
    port: '3306',
    user: 'doodle',  
    password: 'doodle11',
    database: 'doodle',
    multipleStatements: true // 다중쿼리 사용    
}

module.exports = {
    init: function () {
        return mysql.createConnection(db_info);
    },
    connect: function(conn) {
        conn.connect(function(err) {
            if(err) console.error('mysql connection error : ' + err);
            else console.log('mysql is connected successfully!');
        });
    }
}