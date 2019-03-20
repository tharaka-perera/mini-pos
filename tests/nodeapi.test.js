// supertest API testing util
const request = require('supertest')

// Models for database access
const User = require('../models/User')
const Cart = require('../models/Cart')

/** test server setup */
// test server imports
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')
const app = express()

// route imports
const items = require('../api/routes/items')
const cart = require('../api/routes/carts')
const user = require('../api/routes/user')

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// using static folder to load images
app.use(
  express.static(path.join(__dirname, './test_uploads'), { maxAge: 86400000 })
)

// routing requests
app.use('/api/items', items)
app.use('/api/cart', cart)
app.use('/api/user', user)

const port = process.env.PORT || 5000

// environmet variable setting
process.env.TEST_SUITE = 'cake-mini-pos-api-test'
process.env.NODE_ENV = 'test'

describe('Cake-Mini-POS', () => {
  describe('Routes and Controllers', () => {
    let server
    beforeAll(function (done) {
      server = app.listen(port, () =>
        console.log(`Server started on port ${port}`)
      )
      function clearDB() {
        for (var i in mongoose.connection.collections) {
          mongoose.connection.collections[i].remove(function () { })
        }
        return done()
      }

      if (mongoose.connection.readyState === 0) {
        mongoose.connect(
          `mongodb://localhost:27017/${process.env.TEST_SUITE}`, // <------- IMPORTANT
          function (err) {
            if (err) {
              throw err
            }
            return clearDB()
          }
        )
      } else {
        return clearDB()
      }
    })

    afterEach(function (done) {
      return done()
    })

    afterAll(done => {
      mongoose.disconnect()
      server.close()
      return done()
    })

    let users
    it('can access database and create a User', async () => {
      await new User({
        _id: new mongoose.Types.ObjectId(),
        email: 'test2@test.com',
        password: 'test'
      }).save()
      const user = await User.findOne({ email: 'test2@test.com' })

      expect(user.email).toEqual('test2@test.com')
    })

    it('should be able to signup', async () => {
      await request(app)
        .post('/api/user/signup')
        .send({ email: 'test3@test.com', password: 'test' })
        .expect('Content-Type', /json/)
        .expect(201)

      await request(app)
        .post('/api/user/signup')
        .send({ email: 'test3@test.com', password: 'test' })
        .expect('Content-Type', /json/)
        .expect(409)

      // mongoose.disconnect()
      // await request(app)
      //   .post('/api/user/signup')
      //   .send({ email: 'test3@test.com', password: 'test' })
      //   .expect(500);
      // await mongoose.connect(
      //   `mongodb://localhost:27017/${process.env.TEST_SUITE}`,
      //   function (err) {
      //     if (err) {
      //       throw err
      //     }
      //   }
      // )
    })

    it('should be able to perform user login', async () => {
      await request(app)
        .post('/api/user/login')
        .send({ email: 'test3@test.com', password: 'test' })
        .expect('set-cookie', /token/)
        .expect(200);

      await request(app)
        .post('/api/user/login')
        .send({ email: 'test3@test.com', password: 'test5' })
        .expect(401);

      await request(app)
        .post('/api/user/login')
        .send({ email: 'test5@test.com', password: 'test5' })
        .expect(401);

      // mongoose.disconnect()
      // await request(app)
      //   .post('/api/user/login')
      //   .send({})
      //   .expect(500);
      // await mongoose.connect(
      //   `mongodb://localhost:27017/${process.env.TEST_SUITE}`,
      //   function (err) {
      //     if (err) {
      //       throw err
      //     }
      //   }
      // )
    })

    it('should be able to authentication status', async () => {
      await request(app)
        .post('/api/user/login')
        .send({ email: 'test3@test.com', password: 'test' })
        .expect('set-cookie', /token/)
        .then(async res => {
          cookie = res.headers['set-cookie'][0]
            .split(',')
            .map(item => item.split(';')[0])
          expect(res.status).toEqual(200)
          await request(app)
            .get('/api/user/auth')
            .set('x-access-token', cookie[0].split('=')[1])
            .send()
            .expect(200)

          await request(app)
            .get('/api/user/auth')
            .send()
            .expect(401)
        })
    })

    it('should be able to logout user', async () => {
      await request(app)
        .post('/api/user/login')
        .send({ email: 'test3@test.com', password: 'test' })
        .expect('set-cookie', /token/)
        .then(async res => {
          cookie = res.headers['set-cookie'][0]
            .split(',')
            .map(item => item.split(';')[0])
          expect(res.status).toEqual(200)

          await request(app)
            .post('/api/user/logout')
            .set('x-access-token', cookie[0].split('=')[1])
            .send()
            .expect(200)
        })
    })

    var itemList = []

    it('should be able to create an inventory item', async () => {
      await request(app)
        .post('/api/user/login')
        .send({ email: 'test3@test.com', password: 'test' })
        .expect('set-cookie', /token/)
        .then(async res => {
          cookie = res.headers['set-cookie'][0]
            .split(',')
            .map(item => item.split(';')[0])
          expect(res.status).toEqual(200)

          const image = `${__dirname}/testFiles/7.jpg`;
          await request(app)
            .post('/api/items')
            .set('x-access-token', cookie[0].split('=')[1])
            .field({
              name: 'apple',
              productCode: '1000',
              price: '20',
              description: 'test',
              availableCount: '100'
            })
            .attach('itemImage', image)
            .expect(200)

          await request(app)
            .post('/api/items')
            .set('x-access-token', cookie[0].split('=')[1])
            .field({
              name: 'apple',
              productCode: '1000',
              price: '20',
              description: 'test',
              availableCount: '100'
            })
            .attach('itemImage2', image)
            .expect(500)

          await request(app)
            .post('/api/items')
            .set('x-access-token', cookie[0].split('=')[1])
            .send({
              name: 'orange',
              productCode: '1',
              price: '20',
              description: 'test',
              availableCount: '100'
            })
            .expect(200)

          await request(app)
            .post('/api/items')
            .set('x-access-token', cookie[0].split('=')[1])
            .send({
              name: 'water',
              productCode: '1',
              price: '20',
              description: 'test',
              availableCount: '100'
            })
            .expect(200)
        })
    })

    it('should be able to get list of inventory items', async () => {
      await request(app)
        .post('/api/user/login')
        .send({ email: 'test3@test.com', password: 'test' })
        .expect('set-cookie', /token/)
        .then(async res => {
          cookie = res.headers['set-cookie'][0]
            .split(',')
            .map(item => item.split(';')[0])
          expect(res.status).toEqual(200)

          await request(app)
            .get('/api/items')
            .set('x-access-token', cookie[0].split('=')[1])
            .send()
            .expect(200)
            .then(res => item = res.body)
        })
    })

    it('should be able to remove an inventory item', async () => {
      await request(app)
        .post('/api/user/login')
        .send({ email: 'test3@test.com', password: 'test' })
        .expect('set-cookie', /token/)
        .then(async res => {
          cookie = res.headers['set-cookie'][0]
            .split(',')
            .map(item => item.split(';')[0])
          expect(res.status).toEqual(200)

          await request(app)
            .delete(`/api/items/${item[0]._id}`)
            .set('x-access-token', cookie[0].split('=')[1])
            .send()
            .expect(200)

          await request(app)
            .delete(`/api/items/${item[0]._id}`)
            .set('x-access-token', cookie[0].split('=')[1])
            .send()
            .expect(404)
        })
    })

    // testing deprecated endpoint

    // it("should be able to add cart to user", async () => {
    //   await request(app)
    //     .post("/api/user/login")
    //     .send({ email: "test3@test.com", password: "test" })
    //     .expect("set-cookie", /token/)
    //     .then(async res => {
    //       cookie = res.headers["set-cookie"][0]
    //         .split(",")
    //         .map(item => item.split(";")[0]);
    //       expect(res.status).toEqual(200);
    //       console.log(cookie[0]);
    //       await request(app)
    //         .get("/api/items")
    //         .set("x-access-token", cookie[0].split("=")[1])
    //         .send()
    //         .expect(200)
    //         .then(async res2 => {
    //           await request(app)
    //             .post("/api/user/addcart")
    //             .set("x-access-token", cookie[0].split("=")[1])
    //             .send({ userId: res.body.userId, cart: res2.body._id })
    //             .expect(200);
    //         });
    //     });
    // });

    it('should be able to add cart to user with cart controller', async () => {
      await request(app)
        .post('/api/user/login')
        .send({ email: 'test3@test.com', password: 'test' })
        .expect('set-cookie', /token/)
        .then(async res => {
          cookie = res.headers['set-cookie'][0]
            .split(',')
            .map(item => item.split(';')[0])
          expect(res.status).toEqual(200)

          await request(app)
            .post('/api/cart')
            .set('x-access-token', cookie[0].split('=')[1])
            .send({ userId: res.body.userId })
            .expect(201)
        })
    })

    it('should be able get a cartlist from user', async () => {
      await request(app)
        .post('/api/user/login')
        .send({ email: 'test3@test.com', password: 'test' })
        .expect('set-cookie', /token/)
        .then(async res => {
          cookie = res.headers['set-cookie'][0]
            .split(',')
            .map(item => item.split(';')[0])
          expect(res.status).toEqual(200)

          await request(app)
            .post('/api/user/cartlist')
            .set('x-access-token', cookie[0].split('=')[1])
            .send({ userId: res.body.userId })
            .expect(200)
        })
    })

    it('should be able to confirm a cart', async () => {
      await request(app)
        .post('/api/user/login')
        .send({ email: 'test3@test.com', password: 'test' })
        .expect('set-cookie', /token/)
        .then(async res => {
          cookie = res.headers['set-cookie'][0]
            .split(',')
            .map(item => item.split(';')[0])
          expect(res.status).toEqual(200)

          await request(app)
            .post('/api/user/cartlist')
            .set('x-access-token', cookie[0].split('=')[1])
            .send({ userId: res.body.userId })
            .expect(200)
            .then(async res => {
              await request(app)
                .post('/api/cart/confirm')
                .set('x-access-token', cookie[0].split('=')[1])
                .send({ _id: res.body.carts[0]._id, confirmed: true })
                .expect(200)
            })
        })
    })

    it('should be able to add item to a cart', async () => {
      await request(app)
        .post('/api/user/login')
        .send({ email: 'test3@test.com', password: 'test' })
        .expect('set-cookie', /token/)
        .then(async res => {
          cookie = res.headers['set-cookie'][0]
            .split(',')
            .map(item => item.split(';')[0])
          expect(res.status).toEqual(200)

          let item = []
          await request(app)
            .get('/api/items')
            .set('x-access-token', cookie[0].split('=')[1])
            .send()
            .expect(200)
            .then(res => item = res.body)

          await request(app)
            .post('/api/user/cartlist')
            .set('x-access-token', cookie[0].split('=')[1])
            .send({ userId: res.body.userId })
            .expect(200)
            .then(async res => {
              await request(app)
                .post('/api/cart')
                .set('x-access-token', cookie[0].split('=')[1])
                .send({ _id: res.body.carts[0]._id, itm: item[0], count: 10 })
                .expect(200)

              await request(app)
                .post('/api/cart')
                .set('x-access-token', cookie[0].split('=')[1])
                .send({ _id: res.body.carts[0]._id, itm: item[0], count: 10 })
                .expect(200)

              await request(app)
                .post('/api/cart')
                .set('x-access-token', cookie[0].split('=')[1])
                .send({ _id: res.body.carts[0]._id, itm: item[1], count: 10 })
                .expect(200)
            })
        })
    })

    it('should be able to change the quantity of items in a cart', async () => {
      await request(app)
        .post('/api/user/login')
        .send({ email: 'test3@test.com', password: 'test' })
        .expect('set-cookie', /token/)
        .then(async res => {
          cookie = res.headers['set-cookie'][0]
            .split(',')
            .map(item => item.split(';')[0])
          expect(res.status).toEqual(200)

          let item = []
          await request(app)
            .get('/api/items')
            .set('x-access-token', cookie[0].split('=')[1])
            .send()
            .expect(200)
            .then(res2 => item = res2.body)
          await request(app)
            .post('/api/user/cartlist')
            .set('x-access-token', cookie[0].split('=')[1])
            .send({ userId: res.body.userId })
            .expect(200)
            .then(async res => {
              await request(app)
                .post('/api/cart')
                .set('x-access-token', cookie[0].split('=')[1])
                .send({ _id: res.body.carts[0]._id, itm: item[0]._id, count: 5 })
                .expect(200)

              await request(app)
                .post('/api/cart')
                .set('x-access-token', cookie[0].split('=')[1])
                .send({ _id: res.body.carts[0]._id, itm: "invalid", count: 5 })
                .expect(500)

              await request(app)
                .post('/api/cart')
                .set('x-access-token', cookie[0].split('=')[1])
                .send({ _id: "invalid", itm: item[0]._id, count: 5 })
                .expect(404)
            })
        })
    })

    it('should be able to remove item from a cart', async () => {
      await request(app)
        .post('/api/user/login')
        .send({ email: 'test3@test.com', password: 'test' })
        .expect('set-cookie', /token/)
        .then(async res => {
          cookie = res.headers['set-cookie'][0]
            .split(',')
            .map(item => item.split(';')[0])
          expect(res.status).toEqual(200)

          let item = []
          await request(app)
            .get('/api/items')
            .set('x-access-token', cookie[0].split('=')[1])
            .send()
            .expect(200)
            .then(res2 => item = res2.body)

          await request(app)
            .post('/api/user/cartlist')
            .set('x-access-token', cookie[0].split('=')[1])
            .send({ userId: res.body.userId })
            .expect(200)
            .then(async res => {
              await request(app)
                .post('/api/cart')
                .set('x-access-token', cookie[0].split('=')[1])
                .send({ _id: res.body.carts[0]._id, delete: "", itm: item[0]._id })
                .expect(200)
            })

          await request(app)
            .post('/api/user/cartlist')
            .set('x-access-token', cookie[0].split('=')[1])
            .send({ userId: res.body.userId })
            .expect(200)
            .then(async res => {

              await request(app)
                .post('/api/cart')
                .set('x-access-token', cookie[0].split('=')[1])
                .send({ _id: res.body.carts[0]._id, delete: "", itm: item[0] })
                .expect(500)

              await request(app)
                .post('/api/cart')
                .set('x-access-token', cookie[0].split('=')[1])
                .send({ _id: "invalid", delete: "", itm: item[0] })
                .expect(404)
            })
        })
    })

    it('should be able to get a list of items in a cart', async () => {
      await request(app)
        .post('/api/user/login')
        .send({ email: 'test3@test.com', password: 'test' })
        .expect('set-cookie', /token/)
        .then(async res => {
          cookie = res.headers['set-cookie'][0]
            .split(',')
            .map(item => item.split(';')[0])
          expect(res.status).toEqual(200)

          await request(app)
            .post('/api/user/cartlist')
            .set('x-access-token', cookie[0].split('=')[1])
            .send({ userId: res.body.userId })
            .expect(200)
            .then(async res => {
              await request(app)
                .get(`/api/cart/${res.body.carts[0]._id}`)
                .set('x-access-token', cookie[0].split('=')[1])
                .send()
                .expect(200)

              await request(app)
                .get(`/api/cart/invalid`)
                .set('x-access-token', cookie[0].split('=')[1])
                .send()
                .expect(404)
            })
        })
    })

    // it('should be able to remove a cart from carts API', async () => {
    //   await request(app)
    //     .post('/api/user/login')
    //     .send({ email: 'test3@test.com', password: 'test' })
    //     .expect('set-cookie', /token/)
    //     .then(async res => {
    //       cookie = res.headers['set-cookie'][0]
    //         .split(',')
    //         .map(item => item.split(';')[0])
    //       expect(res.status).toEqual(200)

    //       await request(app)
    //         .post('/api/user/cartlist')
    //         .set('x-access-token', cookie[0].split('=')[1])
    //         .send({ userId: res.body.userId })
    //         .expect(200)
    //         .then(async res2 => {
    //           console.log(res2.body.carts[0]._id)
    //           await request(app)
    //             .delete(`/api/cart/${res2.body.carts[0]._id}`)
    //             .set('x-access-token', cookie[0].split('=')[1])
    //             .send()
    //             .expect(200)
    //         })
    //     })
    // })

    it('should be able to remove cart from user', async () => {
      await request(app)
        .post('/api/user/login')
        .send({ email: 'test3@test.com', password: 'test' })
        .expect('set-cookie', /token/)
        .then(async res => {
          cookie = res.headers['set-cookie'][0]
            .split(',')
            .map(item => item.split(';')[0])
          expect(res.status).toEqual(200)

          await request(app)
            .post('/api/user/cartlist')
            .set('x-access-token', cookie[0].split('=')[1])
            .send({ userId: res.body.userId })
            .expect(200)
            .then(async res2 => {
              await request(app)
                .post('/api/user/removecart')
                .set('x-access-token', cookie[0].split('=')[1])
                .send({ _id: res.body.userId, cart: res2.body.carts[0]._id })
                .expect(200)
              await request(app)
                .post('/api/user/removecart')
                .set('x-access-token', cookie[0].split('=')[1])
                .send({ _id: res.body.userId, cart: '~!njgndj' })
                .expect(500)
            })

          await request(app)
            .post('/api/user/cartlist')
            .set('x-access-token', cookie[0].split('=')[1])
            .send({ userId: 'invalid' })
            .expect(500)

          await request(app)
            .post('/api/user/cartlist')
            .set('x-access-token', cookie[0].split('=')[1])
            .send({ userId: res.body.userId })
            .expect(200)
            .then(async res2 => {
              await request(app)
                .post('/api/user/removecart')
                .set('x-access-token', cookie[0].split('=')[1])
                .send({ _id: 'invalid' })
                .expect(404)
            })

          await request(app)
            .post('/api/cart')
            .set('x-access-token', cookie[0].split('=')[1])
            .send({ userId: res.body.userId })
            .expect(201)
            .then(async res => {
              await request(app)
                .delete(`/api/cart/${res.body.carts[0]}`)
                .set('x-access-token', cookie[0].split('=')[1])
                .send()
                .expect(200)
                .then(async res2 => {
                  // await request(app)
                  //   .post('/api/user/removecart')
                  //   .set('x-access-token', cookie[0].split('=')[1])
                  //   .send({ _id: res.body.userId, cart: res.body.carts[0] })
                  //   .expect(404)
                })
            })
        })
    })


    it('should be able to remove a user', async () => {
      await request(app)
        .post('/api/user/login')
        .send({ email: 'test3@test.com', password: 'test' })
        .expect('set-cookie', /token/)
        .then(async res => {
          cookie = res.headers['set-cookie'][0]
            .split(',')
            .map(item => item.split(';')[0])
          expect(res.status).toEqual(200)
          await request(app)
            .delete(`/api/user/${res.body.userId}`)
            .set('x-access-token', cookie[0].split('=')[1])
            .send()
            .expect(200)
          await request(app)
            .delete(`/api/user/jkljkk`)
            .set('x-access-token', cookie[0].split('=')[1])
            .send()
            .expect(500)
        })
    })
  })
})
