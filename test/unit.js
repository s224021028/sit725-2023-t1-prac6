const expect = require("chai").expect
const controllers = require("../controllers")

describe("Unit testing", () => {
    describe("Calculate", () => {
        it("should return NaN for 0 / 0", () => {
            expect(controllers.expressionsController.calculate("div", 0, 0, "false")).to.be.NaN
        })
        it("should return -Infinity for -1 / 0", () => {
            expect(controllers.expressionsController.calculate("div", -1, 0, "false")).to.equal(-Infinity)
        })
        it("should return 1 for 0 ^ 0", () => {
            expect(controllers.expressionsController.calculate("pow", 0, 0, "false")).to.equal(1)
        })
        it("should return 1 for -1 ^ 0", () => {
            expect(controllers.expressionsController.calculate("pow", -1, 0, "false")).to.equal(1)
        })
        it("should return Infinity for 99999999 ^ 99999999", () => {
            expect(controllers.expressionsController.calculate("pow", 99999999, 99999999, "false")).to.equal(Infinity)
        })
        it("should return 428.53 for 45.73 + 382.8", () => {
            expect(controllers.expressionsController.calculate("add", 45.73, 382.8, "true")).to.equal(428.53000000000003)
        })
        it("should return 39005.0 for 39015.0 - 10.0", () => {
            expect(controllers.expressionsController.calculate("sub", 39015.0, 10.0, "true")).to.equal(39005.0)
        })
        it("should return 387.0 for 22.5 * 17.2", () => {
            expect(controllers.expressionsController.calculate("mul", 22.5, 17.2, "true")).to.equal(387.0)
        })
        it("should return 152.262911 for 32432 / 213", () => {
            expect(controllers.expressionsController.calculate("div", 32432, 213, "true")).to.equal(152.26291079812208)
        })
        it("should return 14 for 190 % 16", () => {
            expect(controllers.expressionsController.calculate("mod", 190, 16, "false")).to.equal(14)
        })
    })
})