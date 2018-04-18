const expect = require("chai").expect;
const request = require("supertest");
const url = "http://localhost:3000";
const app = require("../app");
const homeSearchroute = require("../routes/homeSearch");

// testing main root get route
describe("main application route", function() {
    it("should return 200 response", function(done) {
        request(app).get("/")
        .expect(200)
        .expect(/ZillowApp/, done)
    });
});

describe("homeSearch route", function() {
    it("should return 200 response", function(done) {
        request(app).get("/homeSearch")
        .expect(200)
        .expect(/ZillowApp/, done)
    });
});
