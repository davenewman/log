var express = require('express');
var router = express.Router();

const mydata = {
    title: 'AOT-OPS-TEST Narrative Log Book',
    onCall: [
        {
            name: "Dave Newman",
            title: "Engineer",
            isQualifiedOperator: false,
            phone: "505-695-3878"
        },
        {
            name: "Steven Dryja",
            title: "Technician",
            isQualifiedOperator: true,
            phone: "505-695-1234"
        },
        {
            name: "Steven Dryja",
            title: "Technician",
            isQualifiedOperator: false,
            phone: "505-695-1234"
        },
        {
            name: "Steven Dryja",
            title: "Technician",
            isQualifiedOperator: false,
            phone: "505-695-1234"
        },
        {
            name: "Steven Dryja",
            title: "Technician",
            isQualifiedOperator: false,
            phone: "505-695-1234"
        },
        {
            name: "Steven Dryja",
            title: "Technician",
            isQualifiedOperator: false,
            phone: "505-695-1234"
        },
    ],

    operators: [
        {
            name: "Jordon Marquis",
            id: 1
        },
        {
            name: "Steven Dryja",
            id: 2
        },
        {
            name: "Joshua Ortega",
            id: 3
        },
        {
            name: "Matthew Wilson",
            id: 4
        },
        {
            name: "Ryan Smeltzer",
            id: 5
        },
        {
            name: "David Newman",
            id: 6
        },
    ],

    issues: [
        {
            issue_id: 1,
            title: "Issue title",
            logbook: "Cryo"
        },
        {
            issue_id: 2,
            title: "Some sort of water issue",
            logbook: "Water"
        },

    ],

    tags: [
        "V345",
        "CV500",
        "TP1",
        "TP13",
        "SW07",
    ]
}

router.get('/', function (req, res, next) {
    res.render('newentry', {
        title: mydata.title,
        onCall: mydata.onCall,
        operators: mydata.operators,
        issues: mydata.issues,
        tags: mydata.tags,
    });
});

module.exports = router;
