const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const { db } = require('./dbConfig')
const { Query } = require("./query")
const bcrypt = require("bcrypt")
require("dotenv").config()


const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ extended: true }))
app.use(cors({ extended: true }))

// db.connect((e) => {
//     if (e) {
//      console.log(e) 
//     } else {
//         console.log("successfully connected")
//     }
// })



app.post("/sign-up", async (req,res) => {
    const user = req.body.name
    const email = req.body.email
    const password = req.body.password
    const passwordConfirmation = req.body.passwordConfirmation
    const hashedPassword = await bcrypt.hash(req.body.password,10);
    const hashedConfirmPassword = await bcrypt.hash(req.body.confirmPassword,10);


    if (password == passwordConfirmation) {}
        else {
            console.log("Password does not match! Try again")
        }

    db.getConnection ( async (err, connection)=> {
        if (err) throw (err)

        const searchUser = "SELECT * FROM USER WHERE emailid = ?"
        const search_query = mysql.format(searchUser,[email])

        // const sqlInsert = "INSERT INTO USER VALUES (?, ?, ?, ?)"
        // const insert_query = mysql.format(sqlInsert,[null, user, email, hashedPassword])
        

    await connection.query(search_query, async (err, result) => {
        if (err) throw (err)
        if (result.length != 0) {
        //  connection.release()
         console.log("User already exists")
         res.sendStatus(409) 
        } else {
            await Query(`INSERT INTO USER VALUES ('${null}', '${email}', '${password}'), '${user}'`)
            res.sendStatus(201)
        }
    })
    })
      

})

app.post("/login", async (res, req) => {
    const email = req.body.email
    const password = req.body.password


    db.getConnection ( async (err, connection)=> {
    if (err) throw (err)

    const searchUser = "Select * from userTable where user = ?"
    const search_query = mysql.format(searchUser,[email])

    await connection.query (search_query, async (err, result) => {
    connection.release()
    
    if (err) throw (err)
    if (result.length == 0) {
    console.log("User does not exist")
    res.sendStatus(404)
    } 
    else {
        const hashedPassword = result[0].password
        if (await bcrypt.compare(password, hashedPassword)) {
        console.log("---------> Login Successful")
        res.send(`${user} is logged in!`)
        } 
        else {
        console.log("---------> Password Incorrect")
        alert("Password incorrect!")
        res.sendStatus(404)
        } 
    }
    }) 
    }) 

})

port = process.env.port || 8000

app.listen(port, (req, res) => {
    console.log("running at " + port)
})
