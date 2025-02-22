import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config(); 

const url = process.env.MONGO_URI; 

let db;

const connectToDb = (callback) => {
  MongoClient.connect(url)
    .then((client) => {
      db = client.db();
      return callback(url);
    })
    .catch((err) => {
      console.log(err);
      return callback(url, err);
    });
};

const getDb = () => {
  return db;
};

export { connectToDb, getDb };
