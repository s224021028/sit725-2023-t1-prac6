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

async function postExpression(operation, numA, numB, ans)
{
    try
    {
        var expression = {operation: operation, numA: numA, numB: numB, ans: ans}
        return await data.insertOne(expression)
    }
    catch (error)
    {
        console.error(error)
    }
}

module.exports = {getAllExpressions, postExpression, deleteAllExpressions}