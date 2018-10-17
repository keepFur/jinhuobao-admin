/*
 * 数据层的工厂
 */
let mysql = require("mysql");
let Config = require('./config');
let Blog = require("./blog");
let Group = require("./group");
let Todo = require("./todo");
let Material = require("./material");
let env = process.env.NODE_ENV === 'production' ? 'pro' : 'dev';
let pool = mysql.createPool({
    host: Config[env].keepfur_blog_db.host,
    user: Config[env].keepfur_blog_db.user,
    password: Config[env].keepfur_blog_db.password,
    database: Config[env].keepfur_blog_db.database,
    port: Config[env].keepfur_blog_db.port,
    multipleStatements: Config[env].keepfur_blog_db.multipleStatements,
    insecureAuth: true
});
module.exports = {
    blog: new Blog(pool),
    group: new Group(pool),
    todo: new Todo(pool),
    material: new Material(pool),
};