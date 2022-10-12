const app = require('../app');
const request = require("supertest");
const { User, School, Subscription, TopUp } = require('../models');
const {signToken} = require("../helpers/jwt");

let access_token;

const user = {
    fullName: "Maria Mercedes",
    email: "mercedes@gmail.com",
    password: "12345",
    phoneNumber: "08123456789",
    address: "Jalan Pegangsaan Timur No. 56",
    latitude: "-6.203988",
    longitude: "106.845031",
    childrenName: "Rosalinda",
    balance: 0
};

const school = {
  name: 'Highschool of nowhere',
  address: 'Classified information',
  latitude: 'Classified information',
  longitude: 'Classified information'
}

const sub = {
  type: 'Classified information',
  price: 696969,
  status: 'Classified information',
  startDate: new Date(),
  endDate: new Date(),
  goHomeTime: 'Classified information',
  toShoolTime: 'Classified information',
  SchoolId: 1,
  DriverId: 1
}

beforeAll((done) => {
  School.create(school)
    .then(_ => {
      return Subscription.create(sub)
    })
    .then(_ => {
      return User.create(user)
    })
    .then((result) => {
      const payload = {
        id: result.id
      };
      access_token = signToken(payload);
      
      const gross = 5000000
      TopUp.create({
        gross,
        UserId: result.id,
        status: 'pending'
      })
      done();
    })
    .catch((err) => {
      done(err);
    });;
});

afterAll((done) => {
    User.destroy({ truncate: true, cascade: true, restartIdentity: true})
      .then(_ => {
        return School.destroy({ truncate: true, cascade: true, restartIdentity: true})
      })
      .then(_ => {
        return Subscription.destroy({ truncate: true, cascade: true, restartIdentity: true})
      })
      .then(_ => {
        return TopUp.destroy({ truncate: true, cascade: true, restartIdentity: true})
      })
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
});

describe("User Test", () => {

    //? POST User Register
    describe("POST /users/register", () => {
      test("201 Success Register -- should create new user", (done) => {
        request(app)
          .post("/users/register")
          .send({
            fullName: "Wanda Maximoff",
            email: "wanda@gmail.com",
            password: "12345",
            phoneNumber: "08123456789",
            address: "Jalan Pegangsaan Timur No. 56",
            latitude: "-6.203988",
            longitude: "106.845031",
            childrenName: "Bobby",
            balance: 0
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
            expect(status).toBe(201);
            expect(body).toHaveProperty("id", expect.any(Number));
            expect(body).toHaveProperty("email", "wanda@gmail.com");
            return done();
          });
      });

      test("400 Failed Register -- should return error if fullName is null", (done) => {
        request(app)
          .post("/users/register")
          .send({
            email: "mercedes@gmail.com",
            password: "12345",
            phoneNumber: "08123456789",
            address: "Jalan Pegangsaan Timur No. 56",
            latitude: "-6.203988",
            longitude: "106.845031",
            childrenName: "Rosalinda"
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Name is required");
            return done();
          });
      });

      test("400 Failed Register -- should return error if email is null", (done) => {
        request(app)
          .post("/users/register")
          .send({
            fullName: "Maria Mercedes",
            password: "12345",
            phoneNumber: "08123456789",
            address: "Jalan Pegangsaan Timur No. 56",
            latitude: "-6.203988",
            longitude: "106.845031",
            childrenName: "Rosalinda"
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Email is required");
            return done();
          });
      });
      
      test("400 Failed Register -- should return error if password is null", (done) => {
        request(app)
          .post("/users/register")
          .send({
            fullName: "Maria Mercedes",
            email: "mercedes@gmail.com",
            phoneNumber: "08123456789",
            address: "Jalan Pegangsaan Timur No. 56",
            latitude: "-6.203988",
            longitude: "106.845031",
            childrenName: "Rosalinda"
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Password is required");
            return done();
          });
      });

      test("400 Failed Register -- should return error if phoneNumber is null", (done) => {
        request(app)
          .post("/users/register")
          .send({
            fullName: "Maria Mercedes",
            email: "mercedes@gmail.com",
            password: "12345",
            address: "Jalan Pegangsaan Timur No. 56",
            latitude: "-6.203988",
            longitude: "106.845031",
            childrenName: "Rosalinda"
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Phone Number is required");
            return done();
          });
      });

      test("400 Failed Register -- should return error if address is null", (done) => {
        request(app)
          .post("/users/register")
          .send({
            fullName: "Maria Mercedes",
            email: "mercedes@gmail.com",
            password: "12345",
            phoneNumber: "08123456789",
            latitude: "-6.203988",
            longitude: "106.845031",
            childrenName: "Rosalinda"
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Address is required");
            return done();
          });
      });

      test("400 Failed Register -- should return error if latitude is null", (done) => {
        request(app)
          .post("/users/register")
          .send({
            fullName: "Maria Mercedes",
            email: "mercedes@gmail.com",
            password: "12345",
            phoneNumber: "08123456789",
            address: "Jalan Pegangsaan Timur No. 56",
            longitude: "106.845031",
            childrenName: "Rosalinda"
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Latitude is required");
            return done();
          });
      });

      test("400 Failed Register -- should return error if longitude is null", (done) => {
        request(app)
          .post("/users/register")
          .send({
            fullName: "Maria Mercedes",
            email: "mercedes@gmail.com",
            password: "12345",
            phoneNumber: "08123456789",
            address: "Jalan Pegangsaan Timur No. 56",
            latitude: "-6.203988",
            childrenName: "Rosalinda"
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Longitude is required");
            return done();
          });
      });

      test("400 Failed Register -- should return error if childrenName is null", (done) => {
        request(app)
          .post("/users/register")
          .send({
            fullName: "Maria Mercedes",
            email: "mercedes@gmail.com",
            password: "12345",
            phoneNumber: "08123456789",
            address: "Jalan Pegangsaan Timur No. 56",
            latitude: "-6.203988",
            longitude: "106.845031"
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Your child name is required");
            return done();
          });
      });
    });

    //? POST User Login
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
    
        test("401 Failed Login - should return error if email not registered", (done) => {
          request(app)
            .post("/users/login")
            .send({
              email: "sample@gmail.com",
              password: "12345",
            })
            .end((err, res) => {
              if (err) return done(err);
              const { body, status } = res;
              expect(status).toBe(401);
              expect(body).toHaveProperty("message", "Invalid email/password");
              return done();
            });
        });

        test("401 Failed Login - should return error if entered wrong password", (done) => {
          request(app)
            .post("/users/login")
            .send({
              email: "wanda@gmail.com",
              password: "123456",
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

    //! GET User Balance
    describe("GET /users/balances/:userId", () => {
        test("200 Success Read -- should return user balance", (done) => {
          request(app)
            .get("/users/balances/1")
            .set('access_token', access_token)
            .end((err, res) => {
              if (err) return done(err);
              const { body, status } = res;
              expect(status).toBe(200);
              expect(body).toHaveProperty("balance", expect.any(Number));
              return done();
            });
        });
        
        test("401 Failed invalid access_token -- should return error", (done) => {
          request(app)
            .get("/users/balances/1")
            .set('access_token', 'wrong_token')
            .end((err, res) => {
              if (err) return done(err);
              const { body, status } = res;
              expect(status).toBe(401);
              expect(body).toHaveProperty("message", "Invalid token");
              return done();
            });
        });
        
        test("401 Failed no access_token -- should return error", (done) => {
          request(app)
            .get("/users/balances/1")
            .end((err, res) => {
              if (err) return done(err);
              const { body, status } = res;
              expect(status).toBe(401);
              expect(body).toHaveProperty("message", "Unauthorized");
              return done();
            });
        });

        test("404 Fail Read -- should return error if id is not in database", (done) => {
          request(app)
            .get("/users/balances/1000")
            .set('access_token', access_token)
            .end((err, res) => {
              if (err) return done(err);
              const { body, status } = res;
              expect(status).toBe(404);
              expect(body).toHaveProperty("message", "Data Not Found");
              return done();
            });
        });

        test("401 Fail Authenticate -- should return error message if there is no access_token", (done) => {
          request(app)
            .get("/users/balances/1")
            .end((err, res) => {
              if (err) return done(err);
              const { body, status } = res;
              expect(status).toBe(401);
              expect(body).toHaveProperty("message", "Unauthorized");
              return done();
            });
        });

        test("401 Fail Authenticate -- should return error message if access token not valid", (done) => {
          request(app)
            .get("/users/balances/1")
            .set('access_token', access_token + 'aa')
            .end((err, res) => {
              if (err) return done(err);
              const { body, status } = res;
              expect(status).toBe(401);
              expect(body).toHaveProperty("message", "Invalid token");
              return done();
            });
        });
    });

    //! PATCH User Balance
    describe('PATCH /users/balances/:userId', () => {
      test("200 Success Read -- should return user balance", (done) => {
        const balance = '1000000'
        request(app)
          .patch("/users/balances/1")
          .set('access_token', access_token)
          .send(balance)
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
            expect(status).toBe(200);
            expect(body).toHaveProperty("message", "success update balance");
            return done();
          });
      });

      test("401 failed wrong token -- should return error", (done) => {
        const balance = '1000000'
        request(app)
          .patch("/users/balances/1")
          .set('access_token', 'wrong token')
          .send(balance)
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Invalid token");
            return done();
          });
      });

      test("401 failed no token -- should return error", (done) => {
        const balance = '1000000'
        request(app)
          .patch("/users/balances/1")
          .send(balance)
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Unauthorized");
            return done();
          });
      });
    })

    // POST User Topup
    describe('POST /user/topup', () => {
      test("200 Success transaction -- should return message success topup", (done) => {
        const gross = '5000000'

        request(app)
          .post("/users/topup")
          .set('access_token', access_token)
          .send({ gross })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
            expect(status).toBe(201);
            expect(body).toBeInstanceOf(Object)
            expect(body).toHaveProperty("token", expect.any(String));
            expect(body).toHaveProperty("redirect_url", expect.any(String));
            return done();
          });
      });
    })

    // POST User Balance
    describe('POST /users/balances', () => {
      test("200 Success TopUp -- should return message success topup", (done) => {
        const check = {
          transaction_status: 'capture',
          gross_amount: '5000000',
          order_id: '1-1665508477051',
        }

        request(app)
          .post("/users/balances")
          .send(check)
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
            expect(status).toBe(200);
            expect(body).toBeInstanceOf(Object)
            expect(body).toHaveProperty("message", expect.any(String));
            return done();
          });
      });
      
      test("200 Failed TopUp -- should return message topup failed", (done) => {
        const check = {
          transaction_status: 'deny',
          gross_amount: '5000000',
          order_id: '1-1665508477051',
        }

        request(app)
          .post("/users/balances")
          .send(check)
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
            expect(status).toBe(200);
            expect(body).toBeInstanceOf(Object)
            expect(body).toHaveProperty("message", 'top up failed');
            return done();
          });
      });
    })

    //! POST User School
    describe("POST /users/schools", () => {
        test("201 Success Add -- should return success message", (done) => {
          request(app)
            .post("/users/schools")
            .send({
              name: "SDN Gondangdia 03 Pagi",
              address: "Jalan Probolinggo No. 20",
              latitude: "-6.195543",
              longitude: "106.838822"
            })
            .set('access_token', access_token)
            .end((err, res) => {
              if (err) return done(err);
              const { body, status } = res;
              expect(status).toBe(201);
              expect(body).toHaveProperty("message", "success create school");
              return done();
            });
        });
  
        test("400 Failed Add -- should return error if name is null", (done) => {
          request(app)
            .post("/users/schools")
            .send({
            address: "Jalan Probolinggo No. 20",
            latitude: "-6.195543",
            longitude: "106.838822"
            })
            .set('access_token', access_token)
            .end((err, res) => {
              if (err) return done(err);
              const { body, status } = res;
              expect(status).toBe(400);
              expect(body).toHaveProperty("message", "Name is required");
              return done();
            });
        });
  
        test("400 Failed Add -- should return error if address is null", (done) => {
          request(app)
            .post("/users/schools")
            .send({
            name: "SDN Gondangdia 03 Pagi",
            latitude: "-6.195543",
            longitude: "106.838822"
            })
            .set('access_token', access_token)
            .end((err, res) => {
              if (err) return done(err);
              const { body, status } = res;
              expect(status).toBe(400);
              expect(body).toHaveProperty("message", "Address is required");
              return done();
            });
        });
  
        test("400 Failed Add -- should return error if latitude is null", (done) => {
          request(app)
            .post("/users/schools")
            .send({
            name: "SDN Gondangdia 03 Pagi",
            address: "Jalan Probolinggo No. 20",
            longitude: "106.838822"
            })
            .set('access_token', access_token)
            .end((err, res) => {
              if (err) return done(err);
              const { body, status } = res;
              expect(status).toBe(400);
              expect(body).toHaveProperty("message", "Latitude is required");
              return done();
            });
        });
  
        test("400 Failed Add -- should return error if longitude is null", (done) => {
          request(app)
            .post("/users/schools")
            .send({
            name: "SDN Gondangdia 03 Pagi",
            address: "Jalan Probolinggo No. 20",
            latitude: "-6.195543"
            })
            .set('access_token', access_token)
            .end((err, res) => {
              if (err) return done(err);
              const { body, status } = res;
              expect(status).toBe(400);
              expect(body).toHaveProperty("message", "Longitude is required");
              return done();
            });
        });
    });

    //! GET User School
    describe('GET /users/schools', () => {
      test('200 Success Get -- should return schools', (done) => {
        request(app)
            .get("/users/schools")
            .set('access_token', access_token)
            .end((err, res) => {
              const { body, status } = res;
              expect(status).toBe(200);
              expect(body).toBeInstanceOf(Object);
              return done();
            });
      })
    })

    //! POST User Subscription
    describe("POST /users/subscriptions", () => {
        test("201 Success Add -- should return success message", (done) => {
          request(app)
            .post("/users/subscriptions")
            .send({
                type: "weekly",
                price: 200000,
                goHomeTime: "14.00",
                toShoolTime: "07.00",
                DriverId: 1,
                SchoolId: 1
            })
            .set('access_token', access_token)
            .end((err, res) => {
              if (err) return done(err);
              const { body, status } = res;
              expect(status).toBe(201);
              expect(body).toHaveProperty("message", "success create subscription 2");
              return done();
            });
        });
        
        test("401 Failed access_token does not match -- should return error", (done) => {
          request(app)
            .post("/users/subscriptions")
            .send({
                type: "weekly",
                price: 200000,
                goHomeTime: "14.00",
                toShoolTime: "07.00",
                DriverId: 1,
                SchoolId: 1
            })
            .set('access_token', 'wrong_token')
            .end((err, res) => {
              if (err) return done(err);
              const { body, status } = res;
              expect(status).toBe(401);
              expect(body).toHaveProperty("message", "Invalid token");
              return done();
            });
        });
        
        test("401 Failed access_token does not exist -- should return error", (done) => {
          request(app)
            .post("/users/subscriptions")
            .send({
                type: "weekly",
                price: 200000,
                goHomeTime: "14.00",
                toShoolTime: "07.00",
                DriverId: 1,
                SchoolId: 1
            })
            .end((err, res) => {
              if (err) return done(err);
              const { body, status } = res;
              expect(status).toBe(401);
              expect(body).toHaveProperty("message", "Unauthorized");
              return done();
            });
        });

        test("400 Failed Add -- should return error if type is null", (done) => {
          request(app)
            .post("/users/subscriptions")
            .send({
              price: 200000
            })
            .set('access_token', access_token)
            .end((err, res) => {
              if (err) return done(err);
              const { body, status } = res;
              expect(status).toBe(400);
              expect(body).toHaveProperty("message", "type is required");
              return done();
            });
        });
  
        test("400 Failed Add -- should return error if price is null", (done) => {
          request(app)
            .post("/users/subscriptions")
            .send({
              type: "weekly"
            })
            .set('access_token', access_token)
            .end((err, res) => {
              if (err) return done(err);
              const { body, status } = res;
              expect(status).toBe(400);
              expect(body).toHaveProperty("message", "Price is required");
              return done();
            });
        });
    });

    //! GET User Subscription
    describe("GET /users/subscriptions/:id", () => {
      test("200 Success Read -- should return subscription detail", (done) => {
        request(app)
          .get("/users/subscriptions/1")
          .set('access_token', access_token)
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
            expect(status).toBe(200);
            expect(body).toHaveProperty("id", expect.any(Number));
            expect(body).toHaveProperty("type", expect.any(String));
            expect(body).toHaveProperty("price", expect.any(Number));
            expect(body).toHaveProperty("status", expect.any(String));
            expect(body).toHaveProperty("startDate", expect.any(String));
            expect(body).toHaveProperty("endDate", expect.any(String));
            expect(body).toHaveProperty("goHomeTime", expect.any(String));
            expect(body).toHaveProperty("toShoolTime", expect.any(String));
            expect(body).toHaveProperty("SchoolId", expect.any(Number));
            expect(body).toHaveProperty("DriverId", expect.any(Number));
            expect(body).toHaveProperty("createdAt", expect.any(String));
            expect(body).toHaveProperty("updatedAt", expect.any(String));
            return done();
          });
      });

      test("404 Failed Read -- should return error if id is not in database", (done) => {
        request(app)
          .get("/users/subscriptions/1000")
          .set('access_token', access_token)
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
            expect(status).toBe(404);
            expect(body).toHaveProperty("message", "Data Not Found");
            return done();
          });
      });

      test("401 Failed no token -- should return error", (done) => {
        request(app)
          .get("/users/subscriptions/1000")
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Unauthorized");
            return done();
          });
      });

      test("401 Failed wrong token -- should return error", (done) => {
        request(app)
          .get("/users/subscriptions/1000")
          .set('access_token', 'wrong token')
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Invalid token");
            return done();
          });
      });
    });

  //! PATCH User Subscription
  describe("PATCH /users/subscriptions/:id", () => {
    test("201 Success Update -- should return success message", (done) => {
      request(app)
        .patch("/users/subscriptions/1")
        .set('access_token', access_token)
        .send({ status: 'nonactive'})
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(201);
          expect(body).toHaveProperty("message", "success update subscription with id: 2");
          return done();
        });
    });

    test("404 Failed Read -- should return error if id is not in database", (done) => {
      request(app)
        .patch("/users/subscriptions/1000")
        .set('access_token', access_token)
        .send({ status: 'nonactive'})
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(404);
          expect(body).toHaveProperty("message", "Data Not Found");
          return done();
        });
    });

    test("401 Failed no token -- should return error", (done) => {
      request(app)
        .patch("/users/subscriptions/1000")
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Unauthorized");
          return done();
        });
    });

    test("401 Failed wrong token -- should return error", (done) => {
      request(app)
        .patch("/users/subscriptions/1000")
        .set('access_token', 'wrong token')
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Invalid token");
          return done();
        });
    });
  });

  //! GET User Detail
  describe("GET /users/:id", () => {
    test("200 Success Read -- should return user detail", (done) => {
      request(app)
        .get("/users/1")
        .set('access_token', access_token)
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(200);
          expect(body).toHaveProperty("user");
          return done();
        });
    });

    test("404 Failed Read -- should return error if id is not in database", (done) => {
      request(app)
        .get("/users/69")
        .set('access_token', access_token)
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(404);
          expect(body).toHaveProperty("message", "Data Not Found");
          return done();
        });
    });

    test("401 Failed no token -- should return error", (done) => {
      request(app)
        .get("/users/1")
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Unauthorized");
          return done();
        });
    });

    test("401 Failed wrong token -- should return error", (done) => {
      request(app)
        .get("/users/1")
        .set('access_token', 'wrong token')
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Invalid token");
          return done();
        });
    });
  });

  //! Get User Chat
  describe('GET /users/chat/:userId', () => {
    test("200 Success Read -- should return user detail", (done) => {
      request(app)
        .get("/users/chat/1")
        .set('access_token', access_token)
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(200);
          expect(body).toHaveProperty("id", expect.any(Number));
          expect(body).toHaveProperty("fullName", expect.any(String));
          expect(body).toHaveProperty("email", expect.any(String));
          expect(body).toHaveProperty("password", expect.any(String));
          expect(body).toHaveProperty("phoneNumber", expect.any(String));
          expect(body).toHaveProperty("address", expect.any(String));
          expect(body).toHaveProperty("latitude", expect.any(String));
          expect(body).toHaveProperty("longitude", expect.any(String));
          expect(body).toHaveProperty("childrenName", expect.any(String));
          expect(body).toHaveProperty("balance", expect.any(Number));
          expect(body).toHaveProperty("SubscriptionId");
          expect(body).toHaveProperty("createdAt", expect.any(String));
          expect(body).toHaveProperty("updatedAt", expect.any(String));
          return done();
        });
    });

    test("404 Failed Read -- should return error if id is not in database", (done) => {
      request(app)
        .get("/users/1000")
        .set('access_token', access_token)
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(404);
          expect(body).toHaveProperty("message", "Data Not Found");
          return done();
        });
    });

    test("401 Failed no token -- should return error", (done) => {
      request(app)
        .get("/users/1")
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Unauthorized");
          return done();
        });
    });

    test("401 Failed wrong token -- should return error", (done) => {
      request(app)
        .get("/users/1")
        .set('access_token', 'wrong token')
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Invalid token");
          return done();
        });
    });
  })
});