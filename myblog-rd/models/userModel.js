
const db = require('../models/db');

module.exports = {
    saveNameAndPwd(username, password){
        return db.query('insert into t_user set ?', {
            username, 
            password
        });
    },
    getByNameAndPwd(username, password){
        return db.query('select * from t_user where username=? and password=?', [username, password]);
    }   
}