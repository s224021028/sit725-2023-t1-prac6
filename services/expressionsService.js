const models = require("../models")

let data = models.expressionsModel.getDatabase()

async function getAllExpressions()
{
    try 
    {
        return await data.find({}).toArray()
    }
    catch (error) 
    {
        console.error(error);
    }
}

async function deleteAllExpressions()
{
    try
    {
        return await data.deleteMany({})
    }
    catch (error)
    {
        console.error(error)
    }
}

function postExpression(operation, numA, numB, ans, callback)
{
    var expression = {operation: operation, numA: numA, numB: numB, ans: ans}
    data.insertOne(expression, callback)
}

module.exports = {getAllExpressions, postExpression, deleteAllExpressions}