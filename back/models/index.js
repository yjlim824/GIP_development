const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
//const config2 = require('../config/toyconfig')[env];

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config); //node, mysql 연결해줌 
//const sequelize2 = new Sequelize(config2.database, config2.username, config2.password, config2); //node, mysql 연결해줌 


db.User = require('./user')(sequelize, Sequelize); //모델 연결
db.Logs = require('./logs')(sequelize, Sequelize); //모델 연결
//db.Report = require('./report')(sequelize, Sequelize);


Object.keys(db).forEach(modelName => { // 모델연결한거 하나하나 등록
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
//db.sequelize2 = sequelize2;

module.exports = db;
