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
  seed: (req, res) => {
    sequelize
      .query(
        `
       drop table if exists menu_items; 
       drop table if exists locations;
       drop table if exists item_tags;
       drop table if exists menu_tag_junctions;
       
        CREATE TABLE menu_items(
            menu_item_id serial primary key,
            item_name varchar(50),
            in_stock boolean,
            price integer,
            is_vegan boolean,
            is_gluten_free boolean
        );
        
        CREATE TABLE locations(
            location_id serial primary key,
            address varchar (70),
            city varchar(25),
            state varchar(20)
        );

        CREATE TABLE item_tags(
            item_tags_id serial primary key,
            tag_name varchar(40)
        );

        CREATE TABLE menu_tag_junction(
            menu_tag_junction_id serial primary key,
            item_tags_id INT REFERENCES item_tags(item_tags_id),
            menu_item_id INT REFERENCES menu_items(menu_item_id)
        );

        insert into menu_items (item_name, in_stock, price, is_vegan, is_gluten_free)
        values('Hamburger', True, 4.99, False, False),
            ('Hotdog', False, 2.99, False, True),
            ('Salad', True, 3.99, True, True),
            ('Ice Cream Cone', True, 1.99, True, True),
            ('Iced Tea', True, 1.99, True, True);

            insert into locations(address, city, state)
            values('4246 Allens St', 'Stokesville', 'Arizona'),
                ('8949 Runway Rd', 'Happes', 'Colorado'),
                ('2342 Canter St', 'Springville', 'Delaware');

            insert into item_tags(tag_name)
            values('sandwitch'),
                ('salad'),
                ('drink'),
                ('dessert'),
                ('appatiser'),
                ('combo');
            
            insert into menu_tag_junction(item_tags_id, menu_item_id)
              values(6, 1),
              (1, 1),
              (6, 2),
              (2, 3),
              (6, 3),
              (5, 3),
              (4, 4),
              (6, 4),
              (3, 5),
              (6, 5);
            

        
        `
      )
      .then(() => {
        console.log("DB seeded!");
        res.sendStatus(200);
      })
      .catch((err) => console.log("error seeding DB", err));
  },
};
