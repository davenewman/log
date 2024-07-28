/*
    To prevent from creating duplicates of any items I insert,
    I need to either specify "UNIQUE" on some specific column
    or I can specify the primary key for each row.

    using "UNIQUE" implies that the records will be reinserted
    with new primary keys. While the foreign key should be updated
    or cascaded in the posts table, that won't be true in the "on call"
    log and I don't want unintended behavior.

    In fact, I may want to change the "on call" table to be truly
    relational.

    That said, I'm just going to include the primary key values in the 
    seed data.
*/

const operators = [
    {
        operator_id: 1,
        first_name: "David",
        last_name: "Newman",
        is_active: 1,
        is_on_call: 0,
        z_number: 357158
    },
    {
        operator_id: 2,
        first_name: "Bob",
        last_name: "Saget",
        is_active: 1,
        is_on_call: 0,
        z_number: 123456
    },
    {
        operator_id: 3,
        first_name: "Billy",
        last_name: "Butcher",
        is_active: 1,
        is_on_call: 0,
        z_number: 333444
    }
];


const tags = [
    {
        tag_id: 1,
        name: "V345",
        description: "helium bypass valve"
    },
    {
        tag_id: 2,
        name: "PT116",
        description: "primary hydrogen pressure (psia)"
    },
    {
        tag_id: 3,
        name: "PT31",
        description: "secondary hydrogen pressure (psia)"
    }

]

const logbooks = [
    {
        logbook_id: 1,
        title: "cryo",
    },
    {
        logbook_id: 2,
        title: "water",
    },
    {
        logbook_id: 3,
        title: "target 4",
    },
]


exports.operators = operators;
exports.tags = tags;
exports.logbooks = logbooks;