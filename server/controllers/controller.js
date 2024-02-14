const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User, Favorite } = require("../models");
const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.google_client);
const midtransClient = require("midtrans-client");
const MIDTRANS_API_SERVER = process.env.MIDTRANS_API_SERVER;

class Controller {
  static async register(req, res, next) {
    try {
      const { fullName, email, password } = req.body;
      const user = await User.create({ fullName, email, password });
      res.status(201).json({
        id: user.id,
        email: user.email,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      // console.log("masuk <<<<<<<");
      const { email, password } = req.body;

      if (!email) {
        throw { status: 400, message: "Email is required" };
      }

      if (!password) {
        throw { status: 400, message: "Password is required" };
      }

      const userLogin = await User.findOne({
        where: {
          email,
        },
      });

      if (!userLogin) {
        throw { status: 401, message: "Invalid email/password" };
      }

      const comparedPassword = comparePassword(password, userLogin.password);

      if (!comparedPassword) {
        throw { status: 401, message: "Invalid email/password" };
      }

      console.log(userLogin);

      const payload = {
        id: userLogin.id,
      };

      const access_token = createToken(payload);

      res.status(200).json({
        access_token,
        id: userLogin.id,
        status: userLogin.status,
      });
    } catch (error) {
      console.error(error);
      next(error);

      const status = error.status || 500;
      res.status(status).json({ error: error.message });
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.headers.google_token,
        audience: process.env.google_client,
      });
      const payload = ticket.getPayload();

      let user = await User.findOne({ where: { email: payload.email } });
      if (!user) {
        user = await User.create({
          email: payload.email,
          fullName: payload.name,
          password: String(Math.random()),
          status: "basic",
        });
      }

      // console.log(user, "data user google controller"); // Untuk debugging
      const payloadId = {
        id: user.id,
      };

      const access_token = createToken(payloadId);
      res.status(200).json({ access_token, id: user.id, status: user.status });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getData(req, res, next) {
    // get all data
    const options = {
      method: "GET",
      url: "https://imdb-top-100-movies.p.rapidapi.com/",
      headers: {
        "X-RapidAPI-Key": "8f700fb766msh567b7b5c944d5fep1a4fe2jsnf974fae038ac",
        "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
      },
    };
    try {
      const response = await axios.request(options);
      res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getDataById(req, res, next) {
    // get by id
    const { id } = req.params;
    const options = {
      method: "GET",
      url: `https://imdb-top-100-movies.p.rapidapi.com/${id}`,
      headers: {
        "X-RapidAPI-Key": "8f700fb766msh567b7b5c944d5fep1a4fe2jsnf974fae038ac",
        "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
      },
    };
    console.log(options, "<<<<<<<<<getdatabyid");
    try {
      const response = await axios.request(options);
      console.log(response, "masukkk<<<<<<<<");
      res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getFav(req, res, next) {
    try {
      const dataFav = await Favorite.findAll({
        where: {
          UserId: req.user.id,
        },
      });
      res.status(200).json(dataFav);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async addToFav(req, res, next) {
    // add fav
    const { id } = req.params;
    // const { movieId } = req.body; // ini adalah id balikan dari imdb (id: top2)
    console.log(id, ">>>>id");
    const options = {
      method: "GET",
      url: `https://imdb-top-100-movies.p.rapidapi.com/${id}`,
      headers: {
        "X-RapidAPI-Key": "8f700fb766msh567b7b5c944d5fep1a4fe2jsnf974fae038ac",
        "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const fav = response.data;

      const findId = await Favorite.findAll({
        where: {
          UserId: req.user.id,
        },
      });

      // console.log(findId, "masuk1<<<<");
      const filterMovie = findId.filter((el) => {
        return el.MovieId === id; // membandingkan MovieId properti dari favorite, dan movieId adalah balikan dari data imdb
      });
      if (filterMovie.length !== 0) {
        throw { name: "Data Already Exists" };
      }

      let addMovie = await Favorite.create({
        UserId: req.user.id,
        MovieId: id,
        title: fav.title,
        image: fav.image,
        description: fav.description,
      });
      // return addMovie;
      res.status(200).json(addMovie);
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async payment(req, res, next) {
    try {
      let user = await User.findByPk(req.user.id);
      console.log(req.user.id, "upgrade account");

      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: MIDTRANS_API_SERVER,
      });

      let parameter = {
        transaction_details: {
          order_id:
            "YOUR-ORDER-ID-HANSMOVE" +
            Math.floor(100000000 + Math.random() * 9000000),
          gross_amount: 50000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: user.email,
        },
      };
      const midtransToken = await snap.createTransaction(parameter);
      res.status(201).json(midtransToken);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  static async deleteFav(req, res, next) {
    const { id } = req.params; // ini adalah id balikan dari imdb (id: top2)
    try {
      console.log(id, "masuk mihh");

      // console.log(fav, "<<<<<");
      await Favorite.destroy({ where: { id } });
      res.status(200).json({ message: "success delete favorites" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async toPremium(req, res, next) {
    try {
      const { id } = req.params;

      let findUserId = await User.findByPk(id);
      if (!findUserId) {
        throw { name: "NotFound" };
      }
      await findUserId.update({ status: "premium" });

      let findUserUpdated = await User.findByPk(id);

      res.status(200).json({
        status: findUserUpdated.status,
        message: `status has been upgarde to premium!`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async premiumCheck(req, res, next) {
    try {
      const { id } = req.params;
      console.log(req.params, "masuk");
      let foundUser = await User.findByPk(id);
      if (!foundUser) {
        throw { name: "NotFound", message: "User not found" };
      }
      res.status(200).json({
        status: foundUser.status,
        message: "Premium status retrieved successfully",
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}

module.exports = Controller;
