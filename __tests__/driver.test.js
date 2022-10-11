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
        expect(response.status).toBe(500);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "Internal server error"
        );
      });
  });
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
      .get("/drivers/4")
      .then((response) => {
        expect(response.status).toBe(500);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "Internal server error"
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
      .patch("/drivers/4")
      .then((response) => {
        expect(response.status).toBe(500);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "Internal server error"
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
        .patch("/drivers/balances/4")
        .then((response) => {
          expect(response.status).toBe(500);
          expect(response.body).toBeInstanceOf(Object);
          expect(response.body).toHaveProperty(
            "message",
            "Internal server error"
          );
        });
    });
  });
