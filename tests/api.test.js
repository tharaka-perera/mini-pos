const request = require('supertest')
const express = require('express')
const session = require('supertest-session')

const app = require('../server')

// test auth endpoints: user.js

// login
let cookie

describe('routes/api', () => {
  test('should receive auth token', async () => {
    request(app)
      .post('/api/user/login')
      .send({ email: 'test@test.com', password: 'test' })
      .expect('set-cookie', /token/)
      .expect(200)
      .end(function (err, res) {
        console.log({
          cookie: res.headers['set-cookie']
        })
        if (err) console.log('error', err)
      })
  })
  //   signup
  test('should be able to signup', async () => {
    request(app)
      .post('/api/user/signup')
      .send({ email: 'test2@test.com', password: 'test2' })
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, res) {
        console.log({
          response: res.body
        })
        if (err) console.log('error', err)
      })
  })

  // auth check
  test('should be able to authentication status', async () => {
    let token

    request(app)
      .post('/api/user/login')
      .send({ email: 'test@test.com', password: 'test' })
      .expect('set-cookie', /token/)
      .expect(200)
      .end(function (err, res) {
        request(app)
          .get('/api/user/auth')
          .set('Cookie', res.headers['set-cookie'])
          .send()
          .expect(200)
          .end((err, res2) => {
            if (err) {
              console.log('Error occured')
            } else {
              console.log('Authenticated.!')
            }
          })
      })
  })
  test('should be able to logout user', async () => {
    // log out

    request(app)
      .post('/api/user/logout')
      .expect('set-cookie', /token=;/)
      .expect(200)
      .end(function (err, res) {
        if (err) return console.log('error del', err)
        console.log('successfully logged out.!')
      })

    // request(app)
    //   .post("/api/user/")
    //   .set("Accept-Language", "en")
    //   .set("Cookie", ["myApp-token=12345667", "myApp-other=blah"])
    //   .end(function(err, result) {
    //     // test the result
    //   });
  })
})
