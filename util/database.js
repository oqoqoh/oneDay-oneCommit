import { MongoClient } from 'mongodb';
import 'dotenv';

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.cd7qlxk.mongodb.net/?retryWrites=true&w=majority`;

const options = { useNewUrlParser: true };
let connectDB;

if (process.env.NODE_ENV === 'development') {
    if (!global._mongo) {
        global._mongo = new MongoClient(url, options).connect();
    }
    connectDB = global._mongo;
} else {
    connectDB = new MongoClient(url, options).connect();
}
export { connectDB };
