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

describe("Login", () => {
  test("Login Berhasil", async () => {
    const userLogin = {
      email: "hanstu2@mail.com",
      password: "hanstu2",
    };

    let response = await request(app).post("/login").send(userLogin);
    expect(response.status).toBe(200);
  });
});