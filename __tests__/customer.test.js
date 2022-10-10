const app = require('../app');
const request = require("supertest");
const { User } = require('../models');

const user = {
    fullName: "Maria Mercedes",
    email: "mercedes@gmail.com",
    password: "12345",
    phoneNumber: "08123456789",
    address: "Jalan Pegangsaan Timur No. 56",
    houseCoordinate: "-6.203988, 106.845031",
    childrenName: "Rosalinda",
    balance: 0
};

afterAll((done) => {
    User.destroy({ truncate: true, cascade: true, restartIdentity: true})
    .then(() => {
    done();
    })
    .catch((err) => {
    done(err);
    });
});

describe("User Test", () => {

    //POST User Register
    describe("POST /users/register", () => {
      test("201 Success Register -- should create new user", (done) => {
        request(app)
          .post("/users/register")
          .send(user)
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
            expect(status).toBe(201);
            expect(body).toHaveProperty("id", expect.any(Number));
            expect(body).toHaveProperty("email", user.email);
            return done();
          });
      });
    });

    //POST User Login
    describe("POST /users/login", () => {
        test("200 Success Login -- should return access token", (done) => {
          request(app)
            .post("/users/login")
            .send(user)
            .end((err, res) => {
              if (err) return done(err);
              const { body, status } = res;
              expect(status).toBe(200);
              expect(body).toHaveProperty("access_token", expect.any(String));
              return done();
            });
        });
    
        test("401 Failed Login - should return error", (done) => {
          request(app)
            .post("/users/login")
            .send({
              email: "sample@gmail.com",
              password: "inipassword",
            })
            .end((err, res) => {
              if (err) return done(err);
              const { body, status } = res;
              expect(status).toBe(401);
              expect(body).toHaveProperty("message", "Invalid email/password");
              return done();
            });
        });
    });

    //GET User Balance
    describe("GET /users/balances/:userId", () => {
        test("200 Success Read -- should return user balance", (done) => {
          request(app)
            .get("/users/balances/1")
            .end((err, res) => {
              if (err) return done(err);
              const { body, status } = res;
              expect(status).toBe(200);
              expect(body).toHaveProperty("balance", expect.any(Number));
              return done();
            });
        });
    });

    //PATCH User Balance
    describe("PATCH /users/balances/:userId", () => {
        test("201 Success Update -- should return success message", (done) => {
          request(app)
            .patch("/users/balances/1")
            .send({
                balance: 10000
            })
            .end((err, res) => {
              if (err) return done(err);
              const { body, status } = res;
              expect(status).toBe(201);
              expect(body).toHaveProperty("message", "success update balance with user id: 1");
              return done();
            });
        });
    });

    //POST User Subsrciption
    describe("POST /users/subscriptions", () => {
        test("201 Success Add -- should return success message", (done) => {
          request(app)
            .patch("/users/balances/1")
            .send({
                balance: 10000
            })
            .end((err, res) => {
              if (err) return done(err);
              const { body, status } = res;
              expect(status).toBe(201);
              expect(body).toHaveProperty("message", "success update balance with user id: 1");
              return done();
            });
        });
    });
});