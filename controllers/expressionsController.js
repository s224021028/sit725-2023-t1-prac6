const services = require("../services")

function homeView(res)
{
    res.render("index.html");
}

async function getAllExpressions(req, res)
{
    try
    {
        var result = await services.expressionsService.getAllExpressions()
        //console.log("get data success")
        res.json({data: result})
    }
    catch (err)
    {
        console.error(err)
    }
}

async function deleteAllExpressions(req, res)
{
    try
    {
        var result = await services.expressionsService.deleteAllExpressions()
        //console.log("delete data success")
        res.json({data: result})
    }
    catch (err)
    {
        console.error(err)
    }
}

function postExpression(req, res)
{
    var operation = req.body.operation
    var numA = parseFloat(req.body.numA)
    var numB = parseFloat(req.body.numB)
    var showDecimal = req.body.showDecimal
    var ans = calculate(operation, numA, numB, showDecimal)
    services.expressionsService.postExpression(operation, numA, numB, ans, (err, result) => {
        if(err)
            console.error(err)
        else
            res.json({data: ans})
    })
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
        console.log(Math.round(ans))
        return Math.round(ans)
    }
}

module.exports = {getAllExpressions, postExpression, deleteAllExpressions, homeView}