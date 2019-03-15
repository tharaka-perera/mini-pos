//supertest API testing util
const request = require("supertest");

//Models for database access
const User = require("../models/User");
const Cart = require("../models/Cart");

/**test server setup */
//testing server imports
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();

//route imports
const items = require("../routes/api/items");
const cart = require("../routes/api/carts");
const user = require("../routes/api/user");

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//using static folder to load images
app.use(
  express.static(path.join(__dirname, "./test_uploads"), { maxAge: 86400000 })
);

app.use("/api/items", items);
app.use("/api/cart", cart);
app.use("/api/user", user);

const port = process.env.PORT || 5000;

// const server = app.listen(port, () =>
//   console.log(`Server started on port ${port}`)
// );

process.env.TEST_SUITE = "cake-mini-pos-api-test";
process.env.NODE_ENV = "test";
// const app = require("../server");

describe("Systems", () => {
  describe("CREATE", () => {
    afterEach(function(done) {
      mongoose.disconnect();
      return done();
    });

    afterAll(done => {
      server.close();
      return done();
    });

    beforeEach(function(done) {
      /*
          Define clearDB function that will loop through all 
          the collections in our mongoose connection and drop them.
        */
      function clearDB() {
        for (var i in mongoose.connection.collections) {
          mongoose.connection.collections[i].remove(function() {});
        }
        return done();
      }

      /*
          If the mongoose connection is closed, 
          start it up using the test url and database name
          provided by the node runtime ENV
        */
      if (mongoose.connection.readyState === 0) {
        mongoose.connect(
          `mongodb://localhost:27017/${process.env.TEST_SUITE}`, // <------- IMPORTANT
          function(err) {
            if (err) {
              throw err;
            }
            return clearDB();
          }
        );
      } else {
        return clearDB();
      }
    });

    let users;
    test("can create a system", async () => {
      await new User({
        _id: new mongoose.Types.ObjectId(),
        email: "test2@test.com",
        password: "test"
      }).save();
      const user = await User.findOne({ email: "test2@test.com" });

      expect(user.email).toEqual("test2@test.com");
    });
    // test("can create random systems", async () => {
    //   const fetchedSystems = await System.find({});

    //   expect(fetchedSystems.length).toEqual(50);
    // });
  });
  //   describe('READ', () => {
  //     let systems;

  //     beforeEach(async () => {
  //       systems = await factory.makeSystems(50);
  //     });
  //     test('target system can find nearest system to it', async () => {
  //       const nearest = await systems[0].findClosest();

  //       expect(systems.map(system => system.name)).toContain(nearest.name);
  //     });
  //     test('target system can find nearest systems within specified range', async () => {
  //       const noSystems = await systems[0].findWithinRange(0);
  //       const someSystems = await systems[0].findWithinRange(50);

  //       expect(systems.length).toEqual(50);
  //       expect(noSystems.length).toEqual(0);
  //       expect(someSystems.length).toBeGreaterThan(0);
  //       expect(someSystems.length).toBeLessThan(50);
  //     });
  //   });
  //   describe('DELETE', () => {
  //     let systems;

  //     beforeEach(async () => {
  //       const newSystems = await factory.makeSystems(2);
  //       await Promise.all(newSystems.map(system => system.addCelestials(5)));
  //       systems = await System.find({});
  //     });
  //     test('should delete system and associated celestials', async () => {
  //       await systems[0].remove();
  //       const remainingSystems = await System.find({});
  //       const remainingCelestials = await Celestial.find({});

  //       expect(remainingSystems.length).toEqual(1);
  //       expect(remainingCelestials.length).toEqual(5);
  //     });
  //   });
});
