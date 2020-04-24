const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const app = express();

app.use(cors());
app.use(bodyParser.json());
const uri = process.env.DB_PATH;

let client = new MongoClient(uri, { useNewUrlParser: true });


app.get('/foodItems', (req, res) => {
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("redOnion").collection("foodItems");
        collection.find().toArray((err, documents)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(documents);
            }
        })
        client.close();
      });
})

app.get('/foodItems/:key', (req, res) => {
    const key = req.params.key;
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("redOnion").collection("foodItems");
        collection.find({key}).toArray((err, documents)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(documents[0]);
            }
        })
        client.close();
      });
})

app.post('/addFoodItems', (req, res) => {
    const foodItems = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("redOnion").collection("foodItems");
        collection.insert(foodItems, (err, result) => {
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(result.ops[0]);
            };
        })
        client.close();
    });
});

app.listen(4000, () => console.log('Listening 4000'));