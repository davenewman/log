const operators = [
    {
        first_name: "David",
        last_name: "Newman",
        is_active: 1,
        is_on_call: 0,
        z_number: 357158
    },
    {
        first_name: "Bob",
        last_name: "Saget",
        is_active: 1,
        is_on_call: 0,
        z_number: 123456
    },
    {
        first_name: "Billy",
        last_name: "Butcher",
        is_active: 1,
        is_on_call: 0,
        z_number: 333444
    }
];


const tags = [
    {
        name: "V345",
        description: "helium bypass valve"
    },
    {
        name: "PT116",
        description: "primary hydrogen pressure (psia)"
    },
    {
        name: "PT31",
        description: "secondary hydrogen pressure (psia)"
    }

]

const logbooks = [
    {
        name: "cryo",
        logbook_id: 1
    },
    {
        name: "water",
        logbook_id: 2
    },
    {
        name: "target 4",
        logbook_id: 3
    },
]


exports.operators = operators;
exports.tags = tags;
exports.logbooks = logbooks;