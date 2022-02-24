const port = 3001;
const express = require('express')
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const database = {
    customers: [
        { id: 1, name: "Americas Inc.", employees: 100, contactInfo: { name: "John Smith", email: "jsmith@americasinc.com"}},
        { id: 2, name: "Caribian Airlnis", employees: 1000, contactInfo: { name: "Jose Martinez", email: "martines@cair.com"}},
        { id: 3, name: "MacroSoft", employees: 540, contactInfo: { name: "Bill Paxton", email: "bp@ms.com"}},
        { id: 4, name: "United Brands", employees: 20},
        { id: 5, name: "Bananas Corp", employees: 1001, contactInfo: { name: "Xavier Hernandez", email: "xavier@bananas.com"}},
        { id: 6, name: "XPTO.com", employees: 101, contactInfo: { name: "Daniel Zuck", email: "zuckh@xpto.com"}}
    ]
};

const getSize = (customer) => {
    return customer.employees <= 100 ? "Small" : customer.employees <= 1000 ? "Medium" : "Big";
}

app.post('/', (req, res) => {
    const { name } = req.body;
    const response = {
        name, 
        timestamp: (new Date()).toDateString(),
        customers: database.customers.map(customer => {
            customer.size = getSize(customer)
            return customer;
        })
    };
    res.set('Access-Control-Allow-Origin', '*')
    return res.json(response);
});

app.listen(port, () => console.log(`Backend app listening on port ${port}!`))
