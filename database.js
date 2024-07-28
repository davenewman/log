const sqlite = require('sqlite3').verbose();
const mkdirp = require('mkdirp');


const { operators, tags, logbooks } = require("./defaultData");

const lb_list = logbooks.flatMap(lb => [lb.logbook_id, lb.title]);
const lb_placeholders = logbooks.flatMap(() => "(?, ?)").join(", ");

const operator_list = operators.flatMap(op => [op.operator_id, op.first_name, op.last_name, op.is_active, op.is_on_call, op.z_number]);
const op_placeholders = operators.map(() => "(?, ?, ?, ?, ?, ?)").join(", ");

const tag_list = tags.flatMap(tg => [tg.tag_id, tg.name, tg.description]);
const tag_placeholders = tags.map(() => "(?, ?, ?)").join(", ");

mkdirp.sync('./var/db');

const db = new sqlite.Database('./var/db/db.db');

db.serialize(function () {
    db.run(`CREATE TABLE IF NOT EXISTS "issues" ( 
        "issue_id"	INTEGER NOT NULL, 
        "title"	TEXT NOT NULL UNIQUE, 
        "is_resolved"	INTEGER NOT NULL, 
        PRIMARY KEY("issue_id" AUTOINCREMENT) 
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS "logbooks" (
        "logbook_id"	INTEGER NOT NULL,
        "title"	TEXT NOT NULL UNIQUE,
        PRIMARY KEY("logbook_id" AUTOINCREMENT)
    )`);



    const insertLogbooks = `INSERT OR REPLACE INTO logbooks (logbook_id, title) VALUES ${lb_placeholders}`;
    db.run(insertLogbooks, lb_list, function (err) {
        if (err) {
            console.log(err);
        }
        // console.log(this.lastID);
    })

    db.run(`CREATE TABLE IF NOT EXISTS "operators" (
        "operator_id"	INTEGER NOT NULL,
        "first_name"	TEXT NOT NULL,
        "last_name"	TEXT NOT NULL,
        "phone"	NUMERIC,
        "email"	TEXT,
        "is_active"	INTEGER NOT NULL,
        "is_on_call" INTEGER NOT NULL,
        "z_number" NUMERIC UNIQUE NOT NULL,
        PRIMARY KEY("operator_id" AUTOINCREMENT)
    )`);

    // insert default operators here
    const insertOPs = `INSERT OR REPLACE INTO operators (operator_id, first_name, last_name, is_active,
                        is_on_call, z_number) VALUES ${op_placeholders}`
    db.run(insertOPs, operator_list, function (err) {
        if (err) {
            console.log(err);
        }
        // console.log(this.lastID);
    })

    // db.run(`INSERT OR REPLACE INTO operators (first_name, last_name, )`)



    db.run(`CREATE TABLE IF NOT EXISTS "tags" (
        "tag_id"	INTEGER NOT NULL,
        "name"	TEXT NOT NULL UNIQUE,
        "description"	TEXT,
        PRIMARY KEY("tag_id" AUTOINCREMENT)
    )`);

    // insert default tags here

    const insertTags = `INSERT OR REPLACE INTO tags (tag_id, name, description) VALUES ${tag_placeholders}`;
    db.run(insertTags, tag_list, function (err) {
        if (err) {
            console.log(err);
        }
    })

    db.run(`CREATE TABLE IF NOT EXISTS "posts" (
        "post_id"	INTEGER NOT NULL,
        "author_id"	INTEGER NOT NULL,
        "date"	TEXT NOT NULL,
        "html"	TEXT NOT NULL,
        "logbook_id"	INTEGER NOT NULL,
        "is_shift_summary"	INTEGER NOT NULL,
        FOREIGN KEY("author_id") REFERENCES "operators"("operator_id") ON DELETE CASCADE ON UPDATE CASCADE,
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


function getTable(table_name, req, res, next) {
    // returns an entire table

    const qry = `SELECT * FROM ${table_name}`;

    return new Promise((resolve) => {
        db.all(qry, [], function (err, rows) {
            if (err) { return next(err); }
            resolve(rows);
        })
    })
}


function postNewIssue(issueTitle, resolved) {
    const qry = `INSERT INTO issues (title, is_resolved) VALUES (?, ?)`;
    return new Promise((resolve) => {
        db.run(qry, [issueTitle, resolved], function(err) {
            if (err) {
                console.log(err);
                // return next(err);
            }
            resolve(this.lastID);
        })
    })
}

function postNewEntry(operator, date, html, logbook, shift_summary) {
    const qry = `INSERT INTO posts (author_id, date, html, logbook_id, is_shift_summary)
    VALUES (?, ?, ?, ?, ?)`

    return new Promise((resolve) => {
        db.run(qry, [operator, date.toISOString(), html, logbook, shift_summary], function(err) {
            if (err) {
                console.log(err)
            }
            resolve(this.lastID);
        })
    })
    
}

function postPostTag(post_id, tag_id) {
    const qry = `INSERT INTO post_tag (post_id, tag_id) VALUES (?, ?)`;
    return new Promise((resolve) => {
        db.run(qry, [post_id, tag_id], function(err) {
            if (err) {
                console.log(err);
            }
            resolve(this.lastID);
        })
    })

}

function postPostIssue(post_id, issue_id) {
    const qry = `INSERT INTO post_issue (post_id, issue_id) VALUES (?, ?)`;
    return new Promise((resolve) => {
        db.run(qry, [post_id, issue_id], function(err) {
            if (err) {
                console.log(err);
            }
            resolve(this.lastID);
        })
    })
}


async function testing() {
    // const ops = await getOperators();
    // console.log(ops);

    const logbooks = await getTable("logbooks");
    const operators = await getTable("operators");
    const issues = await getTable("issues");
    const tags = await getTable("tags");

}

// testing();
exports.db = db;
exports.getTable = getTable;
exports.postNewIssue = postNewIssue;
exports.postNewEntry = postNewEntry;
exports.postPostIssue = postPostIssue;
exports.postPostTag = postPostTag;