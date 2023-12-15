const chai = require("chai")
const chaiHttp = require("chai-http")
const app = require("../server")
const services = require("../services")
const expect = chai.expect

chai.use(chaiHttp)

describe("Request", () => {
    describe("GET /results", () => {
        it("should retrieve all data from the database", (done) => {
            chai.request(app)
            .get("/results")
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.data).to.be.an("array").of.length.greaterThanOrEqual(0)
                done()
            })
        })
    })
    describe("GET /delete", () => {
        it("should delete all data from the database", (done) => {
            chai.request(app)
            .get("/delete")
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.data).to.have.property("acknowledged")
                expect(res.body.data.acknowledged).to.be.true
                done()
            })
        })
    })
    describe("POST /results", () => {
        var defaultPostExpression = services.expressionsService.postExpression
        it("should return NaN for 0/0", function(done) {
            services.expressionsService.postExpression = function(operation, numA, numB, ans, callback)
            {
                callback(null, true);
            }
            chai.request(app)
            .post("/results")
            .send({numA: "0", numB: "0", operation: "div", showDecimal: "false"})
            .end((err, res) => {
                services.expressionsService.postExpression = defaultPostExpression
                expect(res).to.have.status(200)
                expect(res.body.data).to.be.null
                done()
            })
        })
        it("should return Infinity for 1/0", function(done) {
            services.expressionsService.postExpression = function(operation, numA, numB, ans, callback)
            {
                callback(null, true);
            }
            chai.request(app)
            .post("/results")
            .send({numA: "1", numB: "0", operation: "div", showDecimal: "false"})
            .end((err, res) => {
                services.expressionsService.postExpression = defaultPostExpression
                expect(res).to.have.status(200)
                expect(res.body.data).to.be.null
                done()
            })
        })
        it("should return -Infinity for -1/0", function(done) {
            services.expressionsService.postExpression = function(operation, numA, numB, ans, callback)
            {
                callback(null, true);
            }
            chai.request(app)
            .post("/results")
            .send({numA: "-1", numB: "0", operation: "div", showDecimal: "false"})
            .end((err, res) => {
                services.expressionsService.postExpression = defaultPostExpression
                expect(res).to.have.status(200)
                expect(res.body.data).to.be.null
                done()
            })
        })
        it("should return 1 for 0^0", function(done) {
            services.expressionsService.postExpression = function(operation, numA, numB, ans, callback)
            {
                callback(null, true);
            }
            chai.request(app)
            .post("/results")
            .send({numA: "0", numB: "0", operation: "pow", showDecimal: "false"})
            .end((err, res) => {
                services.expressionsService.postExpression = defaultPostExpression
                expect(res).to.have.status(200)
                expect(res.body.data).to.equal(1)
                done()
            })
        })
        it("should return -1 for -1^0", function(done) {
            services.expressionsService.postExpression = function(operation, numA, numB, ans, callback)
            {
                callback(null, true);
            }
            chai.request(app)
            .post("/results")
            .send({numA: "-1", numB: "0", operation: "pow", showDecimal: "false"})
            .end((err, res) => {
                services.expressionsService.postExpression = defaultPostExpression
                expect(res).to.have.status(200)
                expect(res.body.data).to.equal(1)
                done()
            })
        })
        it("should return Infinity for 99999999^99999999", function(done) {
            services.expressionsService.postExpression = function(operation, numA, numB, ans, callback)
            {
                callback(null, true);
            }
            chai.request(app)
            .post("/results")
            .send({numA: "99999999", numB: "99999999", operation: "pow", showDecimal: "false"})
            .end((err, res) => {
                services.expressionsService.postExpression = defaultPostExpression
                expect(res).to.have.status(200)
                expect(res.body.data).to.be.null
                done()
            })
        })
    })
})