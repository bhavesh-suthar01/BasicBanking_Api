const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const app = express()


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'basicbanking'
});

app.use(express.json())

app.use(express.urlencoded({
    extended: true
}));

app.use(cors());

app.get('/api/alluser', (req, res) => {

    const sqlAlluser = "SELECT * FROM `user`"
    db.query(sqlAlluser, (err, result) => {
        res.send(result);
    })
})
app.get('/api/alltransaction', (req, res) => {

    const sqlAlluser = "SELECT * FROM `transaction`"
    db.query(sqlAlluser, (err, result) => {
        res.send(result);
    })
})
app.put('/api/update', (req, res) => {
    const name = req.body.name;
    const amount = req.body.amount;

    const sqlupdate = "UPDATE `user` SET `balance`=? WHERE `name`= ?"

    db.query(sqlupdate, [amount, name], (err, result) => {
        res.send(result);
        console.log(err)
    });


})
app.post('/api/insert/transaction', (req, res) => {

    const sender = req.body.sender;
    const receiver = req.body.receiver;
    const amount = req.body.amount;
    const date = req.body.date;

    const sqlInsert = "INSERT INTO transaction (sender, receiver, amount, date) VALUES (?,?,?,?);"

    db.query(sqlInsert, [sender, receiver, amount, date], (err, result) => {
        res.send(result);
    })
})

app.listen(3002, () => {
    console.log("Running on port 3002");
})