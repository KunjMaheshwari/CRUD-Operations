import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

// connecting to the mysql db
const db = mysql.createConnection({
    host:"localhost",
    user:"MySQL80",
    password:"test123",
    database:"test"
})

// writing the express middleware -> this allows to send any file as a client.
app.use(express.json());
app.use(cors());

//home page 
app.get('/', (req,res)=>{
    res.json("Hello, this is the backend");
})

app.get('/books', (req,res)=>{
    const q = "SELECT * FROM books"
    // this will display the data from the mysql to the website
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data);
    });
})


//Inserting the books 
app.post("/books", (req,res)=>{
    const q = "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];

    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Books has been created successfully.");
    });
});

app.delete('/books/:id', (req,res)=>{
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?"

    db.query(q,[bookId], (err, data)=>{
        return res.json("Books has been deleted successfully.");
    })
})

// listening to the port 8800
app.listen(8800, ()=>{
    console.log("Connected to the backend!");
})