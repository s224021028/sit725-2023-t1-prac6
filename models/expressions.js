const { MongoClient, ServerApiVersion } = require("mongodb");
const url = "mongodb://localhost:27017/operations";
const client = new MongoClient(url, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

function getDatabase()
{
    try
    {
        client.connect();
        let data = client.db().collection("Expressions");
        //console.log("database connected")
        return data
    }
    catch (exception)
    {
        console.error(exception);
    }
}

module.exports = {getDatabase}