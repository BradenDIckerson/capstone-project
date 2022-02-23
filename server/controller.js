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
    const { state } = req.params;
    console.log(req)
    sequelize
      .query(`SELECT address FROM locations WHERE state = '${state}'`)
      .then((dbres) => res.status(200).send(dbres[0]))
      .catch((err) => console.log(err));
  },

  getMenuItems: (req, res) => {
    sequelize
      .query(`SELECT * FROM menu_items`)
      .then((dbres) => res.status(200).send(dbres[0]))
      .catch((err) => console.log(err));
  },

  getItemsByTag: (req, res) => {
    const {itemTagId} = req.params;
    sequelize
      .query(
        `SELECT mi.item_name, mi.in_stock, mi.price, mi.is_vegan, mi.is_gluten_free FROM menu_tag_junction mt 
  JOIN item_tags it ON it.item_tags_id = mt.item_tags_id
  JOIN menu_items mi ON mi.menu_item_id = mt.menu_item_id
  WHERE mt.item_tags_id = '${itemTagId}'`
      )
      .then((dbres) => res.status(200).send(dbres[0]))
      .catch((err) => console.log(err));
  },
};
