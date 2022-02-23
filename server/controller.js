require("dotenv").config();

const { CONNECTION_STRING } = process.env;

const Sequelize = require("sequelize");

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  getLocations: (req, res) => {
    sequelize
      .query(`SELECT * FROM locations`)
      .then((dbres) => res.status(200).send(dbres[0]))
      .catch((err) => console.log(err));
  },

  getOneLocation: (req, res) => {
    const {state} = req.params
    sequelize
      .query(`SELECT address FROM locations WHERE state = '${state}'`)
      .then((dbres) => res.status(200).send(dbres[0]))
      .catch((err) => console.log(err));
  },

  // getMenuItems: (req, res) => {
  //   sequelize.query(`SELECT * FROM menu_items`)
  //     .then((dbres) => res.status(200).send(dbres[0]))
  //     .catch((err) => console.log(err));
  // },
};
