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
      function clearDB () {
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
          console.log(cookie[0])
          await request(app)
            .post('/api/user/logout')
            .set('x-access-token', cookie[0].split('=')[1])
            .send()
            .expect(200)
        })
    })

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
          console.log(cookie[0])
          await request(app)
            .post('/api/items')
            .set('x-access-token', cookie[0].split('=')[1])
            .send({
              name: 'apple',
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
          console.log(cookie[0])
          await request(app)
            .get('/api/items')
            .set('x-access-token', cookie[0].split('=')[1])
            .send()
            .expect(200)
            .then(res => console.log(res.body))
        })
    })

    // testing dep endpoint

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
          console.log(cookie[0])
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
          console.log(cookie[0])
          await request(app)
            .post('/api/user/cartlist')
            .set('x-access-token', cookie[0].split('=')[1])
            .send({ userId: res.body.userId })
            .expect(200)
            .then(res => console.log(res.body))
        })
    })

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
          console.log(cookie[0])
          await request(app)
            .post('/api/user/cartlist')
            .set('x-access-token', cookie[0].split('=')[1])
            .send({ userId: res.body.userId })
            .expect(200)
            .then(async res2 => {
              await console.log(res2.body.carts[0]._id)
              await request(app)
                .post('/api/user/removecart')
                .set('x-access-token', cookie[0].split('=')[1])
                .send({ _id: res.body.userId, cart: res2.body.carts[0]._id })
                .expect(200)
              await request(app)
                .post('/api/user/removecart')
                .set('x-access-token', cookie[0].split('=')[1])
                .send({ _id: res.body.userId, cart: '~!njgndj' })
                .expect(200)
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
            .post('/api/user/removecart')
            .set('x-access-token', cookie[0].split('=')[1])
            .send({ _id: res.body.userId, cart: 'invalid' })
            .expect(404)
        })
    })
  })
})
