const request = require("supertest");
const app = require("../app");
const axios = require("axios")
const { sequelize, User, Lodging } = require("../models/index");
const { jwtSign } = require("../helpers/jwt");
const { queryInterface } = sequelize;
const fs = require("fs");

let access_token_user;

const user = {
  email: "hans@mail.com",
  password: "hans",
};

beforeAll(async () => {
  try {
    let user1 = await User.create(user);
    access_token_admin = jwtSign({ id: admin.id, role: "Admin" });

  

    const lodging = {
      id: "top101",
      title: "sabtu bersama bapak",
      description: "blablablablabla",
      image:
        "https://m.media-amazon.com/images/M/MV5BMjQ4YThhOGYtYmFmOS00YmQ3LThkN2QtNTQ2YTg3NmFkNDk2XkEyXkFqcGdeQXVyNjIwMTgzMTg@._V1_.jpg",
      year: 2017,
    };
    lodgingById = dataLodging.id;
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  try {
    await queryInterface.bulkDelete("Users", null, {
      cascade: true,
      truncate: true,
      restartIndetity: true,
    });
  } catch (error) {
    console.log(error);
  }
});

describe("Delete", () => {
  test("Berhasil menghapus data Entitas Utama berdasarkan params id yang diberikan", async () => {
    try {
      const movie = await axios.destroy({
        id: "top101",
        title: "sabtu bersama bapak",
        description: "blablablablabla",
        image:
          "https://m.media-amazon.com/images/M/MV5BMjQ4YThhOGYtYmFmOS00YmQ3LThkN2QtNTQ2YTg3NmFkNDk2XkEyXkFqcGdeQXVyNjIwMTgzMTg@._V1_.jpg",
        year: 2017,
      });

      const response = await request(app)
        .delete(`/movies/${id}`)
        .send(movie)
        .set("Authorization", `Bearer ${access_token_user}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message");
    } catch (error) {
      console.log(error);
    }
  });

  test("Gagal menjalankan fitur karena belum login", async () => {
    try {
      const user = {
        email: "",
        password: "",
      };

      const movie = await axios.destroy({
        id: "top101",
        title: "sabtu bersama bapak",
        description: "blablablablabla",
        image:
          "https://m.media-amazon.com/images/M/MV5BMjQ4YThhOGYtYmFmOS00YmQ3LThkN2QtNTQ2YTg3NmFkNDk2XkEyXkFqcGdeQXVyNjIwMTgzMTg@._V1_.jpg",
        year: 2017,
      });

      const response = await request(app)
        .delete(`/movies/${id}`)
        .send(movie, user)
        .set("Authorization", `Bearer invalid`);
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
    } catch (error) {
      console.log(error);
    }
  });

  test("Gagal menjalankan fitur karena token yang diberikan tidak valid", async () => {
    try {
      const movie = await axios.destroy({
        id: "top101",
      title: "sabtu bersama bapak",
      description: "blablablablabla",
      image:
        "https://m.media-amazon.com/images/M/MV5BMjQ4YThhOGYtYmFmOS00YmQ3LThkN2QtNTQ2YTg3NmFkNDk2XkEyXkFqcGdeQXVyNjIwMTgzMTg@._V1_.jpg",
      year: 2017,
      UserId: 3
      
      });

      const response = await request(app)
        .delete(`/movies/${id}`)
        .send(movie)
        .set("Authorization", `Bearer invalid`);
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
    } catch (error) {
      console.log(error);
    }
  });

  test("Gagal karena id entity yang dikirim tidak terdapat di database", async () => {
    try {
      const movies = await axios.destroy({
        id: "top101",
        title: "sabtu bersama bapak",
        description: "blablablablabla",
        image:
          "https://m.media-amazon.com/images/M/MV5BMjQ4YThhOGYtYmFmOS00YmQ3LThkN2QtNTQ2YTg3NmFkNDk2XkEyXkFqcGdeQXVyNjIwMTgzMTg@._V1_.jpg",
        year: 2017,
        UserId: 3
      });

      const response = await request(app)
        .delete(`/movies/top101`)
        .send(movies)
        .set("Authorization", `Bearer invalid`);
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message");
    } catch (error) {
      console.log(error);
    }
  });

  test("Gagal menjalankan fitur ketika Staff menghapus entity yang bukan miliknya", async () => {
    try {
      const movie = await axios.destroy({
        id: "top101",
        title: "sabtu bersama bapak",
        description: "blablablablabla",
        image:
          "https://m.media-amazon.com/images/M/MV5BMjQ4YThhOGYtYmFmOS00YmQ3LThkN2QtNTQ2YTg3NmFkNDk2XkEyXkFqcGdeQXVyNjIwMTgzMTg@._V1_.jpg",
        year: 2017,
        UserId: 3
      });

      const response = await request(app)
        .delete(`/movies/top2`)
        .send(movie)
        .set("Authorization", `Bearer invalid`);
      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty("message");
    } catch (error) {
      console.log(error);
    }
  });
});
