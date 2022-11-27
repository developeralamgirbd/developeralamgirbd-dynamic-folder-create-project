const {MongoClient} = require("mongodb");

// DB Connection
const uri = process.env.DATABASE_URI;

const client = new MongoClient(uri);

module.exports = {client};