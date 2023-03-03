const express = require("express");
const { createUser } = require("./routes/createUser");
const { listUsers } = require("./routes/listUsers");
const {deleteUser} = require("./routes/deleteUser");
 
const app = express();
const PORT = 3001;

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", req.get("Access-Control-Request-Headers"));
    next();
  
});



app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/createUser', createUser);
app.options("/createUser", (req, res) => {
    res.sendStatus(204);
});
app.get('/listUsers', listUsers);
app.options("/listUsers", (req, res) => {
    res.sendStatus(204);
});
app.post('/deleteUser', deleteUser);
app.options("/deleteUser", (req, res) => {
    res.sendStatus(204);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})