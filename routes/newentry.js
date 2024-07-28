var express = require('express');
var router = express.Router();
const {db, getTable, postNewIssue, postNewEntry, postPostIssue, postPostTag} = require("../database");


router.get('/', async function (req, res, next) {

    const title = "Home Log";

    const data = await Promise.all([getTable("logbooks"), getTable("operators"),
                            getTable("issues"), getTable("tags")
    ]);

    // const logbooks = data[0].map()
    console.log(data[1]);
    console.log(data[2]);
    console.log(data[3]);
    console.log(data[0])

    res.render('newentry', {
        title: title,
        logbooks: data[0],
        operators: data[1],
        issues: data[2],
        tags: data[3],
    });
});



router.post('/', async function (req, res, next) {
    console.log(req.body);
    
for (const logbook_id of req.body.logbooks) {
    if (req.body.newIssue) {
        const newest_issue_id = await postNewIssue(req.body.newIssue, 0)
        req.body.issues.push(newest_issue_id)  ;
        console.log(`newest issue id = ${newest_issue_id}`);
    }

    const newest_post_id = await postNewEntry(req.body.author, 
        new Date(), req.body.htmlData, logbook_id, req.body.isShiftSummary
    );

    console.log(`newest post id = ${newest_post_id}`);

    // now make all post_issue entries
    // await Promise.all(postPostIssue())

    





}
    




    res.sendStatus(200);
})

module.exports = router;
