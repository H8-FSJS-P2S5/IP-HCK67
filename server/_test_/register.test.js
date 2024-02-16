const request = require("supertest");
const app = require("../app");

const { sequelize, User } = require("../models");
const { createToken } = require("../helpers/jwt");
const { queryInterface } = sequelize;

let access_token;

const user = {
  email: "hanstu@mail.com",
  password: "hanstu",
};

beforeAll(async () => {
  try {
    let user = await User.create(user);
    access_token = createToken({ id: user.id });
    // console.log(access_token, "testing register");
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  try {
    await queryInterface.bulkDelete(
      "Users",
      {},
      {
        cascade: true,
        truncate: true,
        restartIndetity: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
});

describe("Add User", () => {
  test("Berhasil register", async () => {
    const user = {
      fullName: "hanstu2",
      email: "hanstu2@mail.com",
      password: "hanstu2",
    };
    let response = await request(app).post("/register").send(user);

    expect(response.status).toBe(201);

    const expectedBody = {
      email: "hanstu2@mail.com",
      id: response.body.id,
    };

    expect(response.body).toEqual(expectedBody);
    expect(response.body).toHaveProperty("email", user.email);
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.password).toBeUndefined();
    expect(response.body).toHaveProperty("id");
  });

  test("Email sudah terdaftar", async () => {
    try {
      const user = {
        fullName: "hanstu2",
        email: "hanstu2@mail.com",
        password: "hanstu2",
      };

      const response = await request(app).post("/register").send(user);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Email Already Exists");
    } catch (error) {
      console.log(error);
    }
  });

  test("Format Email salah / invalid", async () => {
    try {
      const user = {
        fullName: "hanstu2",
        email: "hanstu2@mail.com",
        password: "hanstu2",
      };

      const response = await request(app).post("/register").send(user);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "input must be email format"
      );
    } catch (error) {
      console.log(error);
    }
  });
});
