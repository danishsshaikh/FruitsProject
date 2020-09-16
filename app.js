const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'FruitsDB';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

//   insertDocuments(db, function(){
//     client.close();
//   });

findDocuments(db, function() {
    client.close();
  });
});

const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('fruits');
    // Insert some documents
    collection.insertMany([
      {
          name: "Apple",
          score: 9,
          review: "Great fruit"
      },
      {
        name: "Orange",
        score: 4,
        review: "Kinda sour"
     }
    ], function(err, result) {
        //Validations
      assert.equal(err, null);
      assert.equal(2, result.result.n);
      assert.equal(2, result.ops.length);
      console.log("Inserted 2 documents into the collection");
      callback(result);
    });
  }

  const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('fruits');
    // Find some documents
    collection.find({}).toArray(function(err, fruits) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(fruits)
      callback(fruits);
    });
  }