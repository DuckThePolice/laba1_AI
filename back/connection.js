import "dotenv/config";
var USER = process.env.MYSQL_USER || "";
var PASSWORD = process.env.MYSQL_PASSWORD || "";
var DBNAME = process.env.MYSQL_DBNAME || "";
var HOST = process.env.MYSQL_HOST || "";
var PORT = process.env.MYSQL_PORT || "";
export var storage = new Sequelize(DBNAME, USER, PASSWORD, {
    host: HOST,
    dialect: "mysql",
    port: +PORT,
});
storage.sync({ alter: true });
