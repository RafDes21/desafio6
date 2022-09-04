const { mysql } = require("./options/mysql");
const knex = require("knex")(mysql);

const knexApp = async () => {
  if (await knex.schema.hasTable("products")) {
    console.log(`PRODUCT TABLE OK!`);
  } else {
    await knex.schema
      .createTable("products", (table) => {
        table.increments("id");
        table.string("title");
        table.integer("price");
        table.string("thumbnail");
      })
      .then(() => console.log("create table"))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        knex.destroy();
      });
  }
};

module.exports = { knexApp };
