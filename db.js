const sqlite = require('sqlite3').verbose();
const mkdirp = require('mkdirp');


const {operators, tags, logbooks} = require("./defaultData");

lb_list = logbooks.flatMap(lb => [lb.logbook_id, lb.title]);
const lb_placeholders = logbooks.map(() => "(?, ?)").join(", ");

operator_list = operators.flatMap(op => [op.operator_id, op.first_name, op.last_name, op.is_active, op.is_on_call]);
const op_placeholders = operators.map(() => "(?, ?)").join(", ");

lb_list = logbooks.flatMap(lb => [lb.logbook_id, lb.title]);
// const lb_placeholders = logbooks.map(() => "(?, ?)").join(", ");







mkdirp.sync('./var/db');

const db = new sqlite.Database('./var/db/db.db');

db.serialize(function () {
    db.run(`CREATE TABLE IF NOT EXISTS "issues" ( 
        "issue_id"	INTEGER NOT NULL, 
        "title"	TEXT NOT NULL, 
        "is_resolved"	INTEGER NOT NULL, 
        PRIMARY KEY("issue_id" AUTOINCREMENT) 
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS "logbooks" (
        "logbook_id"	INTEGER NOT NULL,
        "title"	TEXT NOT NULL,
        PRIMARY KEY("logbook_id" AUTOINCREMENT)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS "operators" (
        "operator_id"	INTEGER NOT NULL,
        "first_name"	TEXT NOT NULL,
        "last_name"	TEXT NOT NULL,
        "phone"	NUMERIC,
        "email"	TEXT,
        "is_active"	INTEGER NOT NULL,
        "is_on_call"	INTEGER NOT NULL,
        PRIMARY KEY("operator_id" AUTOINCREMENT)
    )`);

    // insert default operators here

    // db.run(`INSERT OR REPLACE INTO operators (first_name, last_name, )`)

    

    db.run(`CREATE TABLE IF NOT EXISTS "tags" (
        "tag_id"	INTEGER NOT NULL,
        "name"	TEXT NOT NULL,
        "description"	TEXT,
        PRIMARY KEY("tag_id" AUTOINCREMENT)
    )`);

    // insert default tags here

    db.run(`CREATE TABLE IF NOT EXISTS "posts" (
        "post_id"	INTEGER NOT NULL,
        "author_id"	INTEGER NOT NULL,
        "date"	TEXT NOT NULL,
        "html"	TEXT NOT NULL,
        "logbook_id"	INTEGER NOT NULL,
        "is_shift_summary"	INTEGER NOT NULL,
        FOREIGN KEY("author_id") REFERENCES "operators"("operator_id") ON DELETE CASCADE,
        PRIMARY KEY("post_id" AUTOINCREMENT)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS "post_tag" (
        "post_id"	INTEGER NOT NULL,
        "tag_id"	INTEGER NOT NULL,
        FOREIGN KEY("tag_id") REFERENCES "tags"("tag_id") ON DELETE CASCADE,
        FOREIGN KEY("post_id") REFERENCES "posts"("post_id") ON DELETE CASCADE,
        PRIMARY KEY("post_id","tag_id")
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS "post_issue" (
        "post_id"	INTEGER NOT NULL,
        "issue_id"	INTEGER NOT NULL,
        PRIMARY KEY("post_id","issue_id"),
        FOREIGN KEY("issue_id") REFERENCES "issues"("issue_id") ON DELETE CASCADE,
        FOREIGN KEY("post_id") REFERENCES "posts"("post_id") ON DELETE CASCADE
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS "on_call_log" (
	"date"	TEXT NOT NULL,
	"on_call_list"	TEXT NOT NULL,
	PRIMARY KEY("date","on_call_list")
)`);



});


module.exports = db;