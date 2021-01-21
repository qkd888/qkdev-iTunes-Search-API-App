let server = require("../server.js");
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();
chai.use(chaiHttp);

// Testing  the get favourites endpoint

describe("GET /favourites", () => {
  it("it should get a list of favourites items", (done) => {
    chai
      .request(server)
      .get("/favourites")
      .end((err, response) => {
        response.body.should.be.a("array");
        done();
      });
  });
});

// Testing  the post favourites endpoint
describe("/POST /favourites", () => {
  it("it should post a new favourite item to the favourite items list", (done) => {
    let item = {
      artistName: "Drake",
      trackName: "One dance",
      collectionName: "Views",
      artwork:
        "https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/54/0f/dc/540fdcc7-a6df-100e-76ba-df4cf92b5805/source/100x100bb.jpg",
    };
    chai
      .request(server)
      .post("/favourites/new")
      .send(item)
      .end((err, response) => {
        response.body.should.be.a("object");
        response.body.should.have.property("status");
        response.body.should.have.property("data");

        done();
      });
  });
});
