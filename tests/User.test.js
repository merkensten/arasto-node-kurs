import Chai from "chai";
import ChaiHttp from "chai-http";
import { describe, it as test } from "mocha";
import app from "../Server.js";
import StatusCode from "../config/StatusCode.js";

Chai.should();
Chai.use(ChaiHttp);

const randomString = Math.random().toString(36).substring(7);

const testingNonExistentRoute = () => {
  describe("Testing a route that does not exitst", () => {
    test("Excepcting 404 not found", (done) => {
      Chai.request(app)
        .get(`/${randomString}`)
        .end((request, response) => {
          response.should.have.status(StatusCode.NOT_FOUND);
          done();
        });
    });
  });
};

describe("Testing the user api router", () => {
  testingNonExistentRoute();
});
