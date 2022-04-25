import Chai from "chai";
import ChaiHttp from "chai-http";
import { describe, it as test } from "mocha";
import app from "../Server.js";
import StatusCode from "../config/StatusCode.js";

Chai.should();
Chai.use(ChaiHttp);

const randomString = Math.random().toString(36).substring(7);
const user = {
  username: randomString,
  password: randomString,
};
const userId = "626575758a717fe54e67cb90";

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

const createUser = () => {
  describe("Testing create post method for user entity (Post)", () => {
    test("expecting a user to be created", (done) => {
      Chai.request(app)
        .post("/user")
        .send(user)
        .end((error, response) => {
          response.should.have.status(StatusCode.CREATED);
          response.body.should.be.a("object");
          response.body.should.have.property("username").eq(user.username);
          response.body.should.have.property("password").eq(user.password);
          done();
        });
    });
  });
};

const getAllusers = () => {
  describe("Fetching all users (Get)", () => {
    test("expecting to return all the users from the db", (done) => {
      Chai.request(app)
        .get("/user")
        .end((error, response) => {
          response.should.have.status(StatusCode.OK);
          response.body.should.be.a("array");
          response.body.length.should.be.eql(response.body.length);
          done();
        });
    });
  });
};
const updateUser = () => {
  describe("Updating a user (Put)", () => {
    test("expecting a user to be updated", (done) => {
      Chai.request(app)
        .put(`/user/${userId}`)
        .send(user)
        .end((error, response) => {
          response.should.have.status(StatusCode.OK);
          response.body.should.be.a("object");
          response.body.should.have.property("username").eq(user.username);
          response.body.should.have.property("password").eq(user.password);
          response.body.should.have.property("_id").eq(userId);
          done();
        });
    });
  });
};
const deleteUser = () => {
  describe("Deleting a user (Delete)", () => {
    test("expecting a user to be deleted", (done) => {
      Chai.request(app)
        .delete(`/user/${userId}`)
        .end((error, response) => {
          response.should.have.status(StatusCode.OK);
          done();
        });
    });
  });
};

describe("Testing the user api router", () => {
  testingNonExistentRoute();
  createUser();
  getAllusers();
  updateUser();
  deleteUser();
});
