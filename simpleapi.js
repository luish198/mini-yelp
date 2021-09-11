// npm install express
// node simple-api.js
// fetch("http://localhost:8080")

const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
app.get("/restaurants", (req, res) => {
    res.json({
        "data": [{
                "id": "1",
                "name": "Restaurant 1",
                "address": "Address 1",
                "phone": "123456789",
                "website": "www.restaurant1.com",
                "cuisine": "Italian"
            },
            {
                "id": "2",
                "name": "Restaurant 2",
                "address": "Address 2",
                "phone": "123456789",
                "website": "www.restaurant2.com",
                "cuisine": "Mexican"
            },
        ]
    });
});

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});