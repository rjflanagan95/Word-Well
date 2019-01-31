var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("GET /api/words", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should find all words", function(done) {
    // Add some examples to the db to test with
    db.Word.bulkCreate([
      {
        text: "serene",
        definition: "calm, peaceful, and untroubled; tranquil",
        etymology:
          "late Middle English (describing the weather or sky as ‘clear, fine, and calm’): from Latin serenus",
        pronunciation: "blah",
        comment: "ugh"
      },
      {
        text: "rambunctious",
        definition: "uncontrollably exuberant; boisterous",
        etymology: "mid 19th century: of unknown origin",
        pronunciation: "asdfasdf",
        comment: "asdfasdf"
      }
    ]).then(function() {
      // Request the route that returns all examples
      request.get("/api/words").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("array")
          .that.has.lengthOf(2);

        expect(responseBody[0])
          .to.be.an("object")
          .that.includes({
            text: "serene",
            definition: "calm, peaceful, and untroubled; tranquil",
            etymology:
              "late Middle English (describing the weather or sky as ‘clear, fine, and calm’): from Latin serenus",
            pronunciation: "blah",
            comment: "ugh"
          });

        expect(responseBody[1])
          .to.be.an("object")
          .that.includes({
            text: "rambunctious",
            definition: "uncontrollably exuberant; boisterous",
            etymology: "mid 19th century: of unknown origin",
            pronunciation: "asdfasdf",
            comment: "asdfasdf"
          });

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});
