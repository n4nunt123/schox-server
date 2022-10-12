const request = require("supertest");
const app = require("../app.js");

//* login
describe("POST /drivers/login", () => {
  test("POST /drivers/login - success test", () => {
    const payload = {
      email: "joemurray@gmail.com",
      password: "password",
    };
    return request(app)
      .post("/drivers/login")
      .send(payload)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
      });
  });
  test("POST /drivers/login - error test", () => {
    const payload = {
      email: "joemurra@gmail.com",
      password: "password",
    };
    return request(app)
      .post("/drivers/login")
      .send(payload)
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "Invalid email/password"
        );
      });
  });
  test('POST /drivers/login - error test wrong password', () => {
    const payload = {
      email: "joemurray@gmail.com",
      password: "passwordooooooooooooo",
    };
    return request(app)
      .post("/drivers/login")
      .send(payload)
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "Invalid email/password"
        );
      });
  })
});

//* GET all drivers
describe("GET /drivers", () => {
  test("GET /drivers - success test", () => {
    return request(app)
      .get("/drivers")
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
      });
  });
});

//* GET one drivers
describe("GET /drivers/:driverId", () => {
  test("GET /drivers/:driverId - success test", () => {
    return request(app)
      .get("/drivers/1")
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
      });
  });

  test("GET /drivers/:driverId - error test", () => {
    return request(app)
      .get("/drivers/69")
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "Driver not found"
        );
      });
  });
});

//* UPDATE status drivers
describe("PATCH /drivers/:driverId", () => {
  const payload = {
    driverStatus: "Avaible",
  };
  test("PATCH /drivers/:driverId - success test", () => {
    return request(app)
      .patch("/drivers/1")
      .send(payload)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "success update status driver"
        );
      });
  });

  test("PATCH /drivers/:driverId - error test", () => {
    return request(app)
      .patch("/drivers/69")
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "Driver not found"
        );
      });
  });
});

//* UPDATE balance drivers
describe("PATCH /drivers/balances/:driverId", () => {
  const payload = {
    balance: 100000,
  };
  test("PATCH /drivers/balances/:driverId - success test", () => {
    return request(app)
      .patch("/drivers/balances/1")
      .send(payload)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "success update driver balance with driver id: 1"
        );
      });
  });

  test("PATCH /drivers/balances/:driverId - error test", () => {
    return request(app)
      .patch("/drivers/balances/69")
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "Driver not found"
        );
      });
  });
});

describe('GET /drivers/chat/:id', () => {
  test('GET /drivers/chat/:id - success test', () => {
    return request(app)
      .get('/drivers/chat/1')
      .then((response) => {
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('fullName')
        expect(response.body).toHaveProperty('email')
        expect(response.body).toHaveProperty('carLicenseNumber')
        expect(response.body).toHaveProperty('carType')
        expect(response.body).toHaveProperty('imgUrl')
      })
  })
  
  test('GET /drivers/chat/:id - failed test', () => {
    return request(app)
      .get('/drivers/chat/69')
      .then((response) => {
        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Driver not found");
      })
  })
})