const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT||5000

// Middleware
app.use(cors())
app.use(express.json());

// MongoDB Credentials
// Username: mydbuser1
// password: K9mdLWPfkefTLHkl
const uri =
  "mongodb+srv://mydbuser1:K9mdLWPfkefTLHkl@cluster0.hxk2b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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

      // POST API
      app.post('/users', async (req, res) => {
          const newUser = req.body
          const result = await userCollection.insertOne(newUser)
          console.log('hitting the post', result);
          res.json(result)
      })
      // GET API
      app.get('/users', async (req, res) => {
          const results = userCollection.find({})
          const users = await results.toArray()
          console.log('hitting the post', users);
          res.send(users)
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