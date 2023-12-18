const chai = require("chai")
const chaiHttp = require("chai-http")
const app = require("../server")
const expect = chai.expect

chai.use(chaiHttp)

describe("Integration testing", () => {
    describe("Request GET /", () => {
        it("should open the home page", (done) => {
            chai.request(app)
            .get("/")
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
        })
    })
    describe("Request POST /results", () => {
        it("should post data to the server and insert a data document to the database", (done) => {
            chai.request(app)
            .post("/results")
            .send({numA: "32432", numB: "213", operation: "div", showDecimal: "true"})
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.data).to.have.property("acknowledged")
                expect(res.body.data.acknowledged).to.be.true
                expect(res.body.answer).to.equal(152.26291079812208)
                done()
            })
        })
    })
    describe("Request GET /results", () => {
        before((done) => {
            chai.request(app)
            .post("/results")
            .send({numA: "190", numB: "16", operation: "mod", showDecimal: "false"})
            .end(() => {
                done()
            })
        })
        it("should retrieve all data from the database", (done) => {
            chai.request(app)
            .get("/results")
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.data).to.be.an("array")
                expect(res.body.data).to.have.length.greaterThan(0)
                expect(res.body.data.pop().ans).to.equal(14)
                done()
            })
        })
    })
    describe("Request GET /delete", () => {
        before((done) => {
            chai.request(app)
            .post("/results")
            .send({numA: "532", numB: "8311", operation: "pow", showDecimal: "false"})
            .end(() => {
                done()
            })
        })
        it("should delete all data from the database", (done) => {
            chai.request(app)
            .get("/delete")
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.data).to.have.property("acknowledged")
                expect(res.body.data.acknowledged).to.be.true
                expect(res.body.data).to.have.property("deletedCount")
                expect(res.body.data.deletedCount).to.be.greaterThan(0)
                done()
            })
        })
    })
})