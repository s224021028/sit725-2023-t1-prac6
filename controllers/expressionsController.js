const services = require("../services")

function homeView(res)
{
    res.render("index.html");
}

async function getAllExpressions(req, res)
{
    var result = await services.expressionsService.getAllExpressions()
    //console.log("get data success")
    res.json({data: result})
}

async function deleteAllExpressions(req, res)
{
    var result = await services.expressionsService.deleteAllExpressions()
    //console.log("delete data success")
    res.json({data: result})
}

async function postExpression(req, res)
{
    var operation = req.body.operation
    var numA = parseFloat(req.body.numA)
    var numB = parseFloat(req.body.numB)
    var showDecimal = req.body.showDecimal
    var ans = calculate(operation, numA, numB, showDecimal)
    var result = await services.expressionsService.postExpression(operation, numA, numB, ans)
    res.json({data: result, answer: ans})
}

function calculate(operation, numA, numB, showDecimal)
{
    var ans = 0
    if (operation == "add")
    {
        ans = numA + numB
    }
    else if (operation == "sub")
    {
        ans = numA - numB
    }
    else if (operation == "mul")
    {
        ans = numA * numB
    }
    else if (operation == "div")
    {
        ans = numA / numB
    }
    else if (operation == "mod")
    {
        ans = numA % numB
    }
    else if (operation == "pow")
    {
        ans = numA ** numB
    }
    if (showDecimal == "true")
        return ans
    else
    {
        return Math.round(ans)
    }
}

module.exports = {getAllExpressions, postExpression, deleteAllExpressions, homeView, calculate}