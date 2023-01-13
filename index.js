const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

// Social-media
// h6FuWKuwPWAIKP3h

const uri = `mongodb+srv://${process.env.REACT_APP_user_name}:${process.env.REACT_APP_user_password}@cluster0.df9nipl.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const userRegisterCollection = client
      .db("Social-media")
      .collection("registerData");
    const userPhotoStatusCollection = client
      .db("Social-media")
      .collection("statusPhoto");
    
      const userTextStatusCollection = client.db('Social-media').collection("textStatus");
      
    const userCommentsCollection = client
      .db("Social-media")
      .collection("userComment");
    const userLikeCollection = client.db("Social-media").collection("userLike");
    const userLoveCollection = client.db("Social-media").collection("userLove");

    // registerData post
    app.post("/registerData", async (req, res) => {
      const userDat = req.body;
      const result = await userRegisterCollection.insertOne(userDat);
      res.send(result);
    });

    // social loging user put
    // app.put('/socialRegisterData', async(req, res) => {
    //   const socialUsr = req.body;
    //   const result = await userRegisterCollection.insertOne(result)
    //   res.send(result)
    // })

    //  registerData get
    app.get("/registerData", async (req, res) => {
      const query = {};
      const allUser = await userRegisterCollection.find(query).toArray();
      res.send(allUser);
    });

    // registerData by email
    app.get("/registerData/:email", async (req, res) => {
      const registerEmail = req.params.email;
      const email = { email: registerEmail };
      const userRegister = userRegisterCollection.find(email);
      const curser = await userRegister.toArray();
      res.send(curser);
    });


    //all user get
    app.get('/registerData', async (req, res) => {

      const query = {}
      const result = await userRegisterCollection.find(query).toArray()
      res.send(result)
       
    })


    // aboutSet by put
    app.put("/userabout/:email", async (req, res) => {
      const email = req.params.email;
      const about = req.body;
      const filter = { email: email };
      const upsert = { upsert: true };
      const updoc = {
        $set: about,
      };

      const result = await userRegisterCollection.updateOne(
        filter,
        updoc,
        upsert
      );
      res.send(result);

      console.log(result);
    });

    //textStatus Post
    
    app.post("/textStatus", async (req, res) => {
       
      const textStatus = req.body;
      const result = await userTextStatusCollection.insertOne(textStatus);
      res.send(result)

    })
 


    // statusWithPhoto post
    app.post("/statusPhoto/", async (req, res) => {
      const statusPhoto = req.body;
      const result = await userPhotoStatusCollection.insertOne(statusPhoto);
      res.send(result);
    });

    // statusWithPhoto get
    app.get("/statusPhotoAll", async (req, res) => {
      const query = {};
      const allStatusPhoto = await userPhotoStatusCollection
        .find(query)
        .toArray();
      res.send(allStatusPhoto);
    });

    // 1userStatus
    app.get("/statusPhotoAll/:email", async (req, res) => {
      const userEmail = req.params.email;
      const email = { email: userEmail };
      const userPost = userPhotoStatusCollection.find(email);
      const curser = await userPost.toArray();
      res.send(curser);
    });

    //comments post
    app.post("/userComment", async (req, res) => {
      const userComment = req.body;
      const result = await userCommentsCollection.insertOne(userComment);
      res.send(result);
    });

    //  comments get by status id
    app.get("/userComment/:statusId", async (req, res) => {

      const postStatusId = req.params.statusId;
      const statusId = { statusId: postStatusId };
      const userComment = userCommentsCollection.find(statusId);
      const curser = await userComment.toArray();
      res.send(curser);

    });

    //  like post
    app.post("/userLike", async (req, res) => {

      const like = req.body;
      const result = await userLikeCollection.insertOne(like);
      res.send(result);

    });
     
    // like get by status id
    app.get('/userLike/:statusId', async(req, res) => {
       const postStatusId = req.params.statusId
       const statusId = {statusId: postStatusId}
       const userLike =  userLikeCollection.find(statusId)
       const result = await userLike.toArray()
       res.send(result)
    })

    // love post
    app.post("/userLove", async (req, res) => {

      const like = req.body;
      const result = await userLoveCollection.insertOne(like);
      res.send(result);

    });
     
    // like get by status id
    app.get('/userLove/:statusId', async(req, res) => {
       const postStatusId = req.params.statusId
       const statusId = {statusId: postStatusId}
       const userLike =  userLoveCollection.find(statusId)
       const result = await userLike.toArray()
       res.send(result)
    })


  } 
  finally {
  }
}
run().catch((error) => console.log(error));

app.get("/", async (req, res) => {
  res.send("social media server is running");
});

app.listen(port, () =>
  console.log(`social media server is running by ${port}`)
);
