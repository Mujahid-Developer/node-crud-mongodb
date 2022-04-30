const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT||5000

// Middleware
app.use(cors())
app.use(express.json());

// MongoDB Credentials

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hxk2b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run () {
    try {
      await client.connect();
      const database = client.db("foodMaster");
      const userCollection = database.collection("users");

      // GET API
      app.get('/users', async (req, res) => {
          const results = userCollection.find({})
          const users = await results.toArray()
          res.json(users)
      })
      // POST API
      app.post('/users', async (req, res) => {
          const newUser = req.body
          const result = await userCollection.insertOne(newUser)
          res.json(result)
      })
      //DELETE API
      app.delete('/users/:id', async(req, res)=>{
          const id = req.params.id;
          const query = {_id: ObjectId(id)}
          const result = await userCollection.deleteOne(query)
          console.log("Deleting this user with id", result);
          res.json(result)
      })

      
    } 
    finally {
        // await client.close()
    }
}
run().catch(console.dir)

app.get("/", (req, res) => {
  res.send("Wow! im learning node from programming hero");
});


app.listen(port, ()=>{
    console.log('listening on port', port);
})