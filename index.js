const express = require('express')
const bodyParser = require('body-parser');
const cors= require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tivbg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const port = 5000;

const app = express()

app.use(cors());
app.use(bodyParser.json());




const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true  });
client.connect(err => {
  const tasksRegistration = client.db("volunteerNetwork").collection("tasks");
   app.post('/addRegistration',(req,res) => {
          const newRegistration= req.body;
          tasksRegistration.insertOne(newRegistration)
          .then( result =>{
              res.send(result.insertedCount > 0);
          })
          console.log(newRegistration);
   })
 
});


app.listen(port)