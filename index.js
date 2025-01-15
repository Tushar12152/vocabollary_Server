const express = require('express')
const app = express()
const cors=require('cors')
const port = process.env.PORT||5001
require('dotenv').config()


app.use(cors())
app.use(express.json())




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tgzt8q2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {


    const userCollections = client.db("vocabollary_db").collection("users");
    const courseCollections = client.db("vocabollary_db").collection("courses");


    app.post('/users',async (req,res)=>{
        const user= req.body
        // console.log(user)
        const result= await userCollections.insertOne(user) 
        res.send(result)

    })

    app.get('/users',async(req,res)=>{
      const result= await userCollections.find().toArray()
         res.send(result)
    })

    app.post ('/courses',async(req,res)=>{
       const course=req.body;
       console.log(course)

    })



    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/',(req,res)=>{
    res.send('vocabolary learning is running....')
})


app.listen(port, () => {
  console.log(`This server is going on port : ${port}`)
})