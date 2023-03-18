var express = require('express');
var router = express.Router();

const mydata = {
  title: 'AOT-OPS-TEST Narrative Log Book',
  operators: [
    {
      name: "Dave Newman",
      title: "Engineer",
      isQualifiedOperator: false,
      phone: "505-695-3878",
      isOnCall: true,
    },
    {
      name: "Steven Dryja",
      title: "Technician",
      isQualifiedOperator: true,
      phone: "505-695-1234",
      isOnCall: true,
    },
    {
      name: "Steven Dryja",
      title: "Technician",
      isQualifiedOperator: false,
      phone: "505-695-1234",
      isOnCall: true,
    },
    {
      name: "Steven Dryja",
      title: "Technician",
      isQualifiedOperator: false,
      phone: "505-695-1234",
      isOnCall: true,
    },
    {
      name: "Bob Saget",
      title: "Technician",
      isQualifiedOperator: false,
      phone: "505-695-1234",
      isOnCall: true,
    },
    {
      name: "Steven Dryja",
      title: "Technician",
      isQualifiedOperator: false,
      phone: "505-695-1234",
      isOnCall: true,
    },
  ]
}

const onCall = mydata.operators.filter(operator => operator.isOnCall == true);

const cryoPosts = [
  {
    author: "David Newman",
    date: "3/18/2023, 1:52:13 PM",
    relatedIssue: "This is the issue title",
    tags: ["V345", "CV500", "PT116", "TP1"],
    html: "<p>This is the post text that I have written.<p><h1>This is some large text!!! And it continues for a long time and is maybe too long to realistically fit on the screen. Not sure why I am typing in an H1 but I feel that it is necessary to convey my point.</h1>"
  },
  {
    author: "David Newman",
    date: "3/18/2023, 1:52:13 PM",
    relatedIssue: "This is the issue title",
    tags: ["V345",],
    html: "<p>This is the post text that I have written.<p>"
  },
  {
    author: "David Newman",
    date: "3/18/2023, 1:52:13 PM",
    relatedIssue: "This is the issue title",
    tags: ["V345",],
    html: "<p>This is the post text that I have written.<p>"
  },
  {
    author: "David Newman",
    date: "3/18/2023, 1:52:13 PM",
    relatedIssue: "This is the issue title",
    tags: ["V345",],
    html: "<p>This is the post text that I have written.<p>"
  },
  {
    author: "David Newman",
    date: "3/18/2023, 1:52:13 PM",
    relatedIssue: "This is the issue title",
    tags: ["V345",],
    html: "<p>This is the post text that I have written.<p>"
  },
  {
    author: "David Newman",
    date: "3/18/2023, 1:52:13 PM",
    relatedIssue: "This is the issue title",
    tags: ["V345",],
    html: "<p>This is the post text that I have written.<p>"
  },
]

const waterPosts = [
  {
    author: "David Newman",
    date: "3/18/2023, 1:52:13 PM",
    relatedIssue: "This is the issue title",
    tags: ["V345",],
    html: "<p>This is the post text that I have written.<p>"
  }
]

const target4Posts = [
  {
    author: "David Newman",
    date: "3/18/2023, 1:52:13 PM",
    relatedIssue: "This is the issue title",
    tags: ["V345",],
    html: "<p>This is the post text that I have written.<p>"
  }
]

const issuePosts = [
  {
    author: "David Newman",
    date: "3/18/2023, 1:52:13 PM",
    title: "Something is wrong",
    tags: ["V345",],
    html: "<p>This is the post text that I have written.<p>"
  }
]

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: mydata.title,
    onCall: onCall,
    cryoPosts: cryoPosts,
    waterPosts: waterPosts,
    target4Posts: target4Posts,
    issuePosts: issuePosts,
  });
});


module.exports = router;
