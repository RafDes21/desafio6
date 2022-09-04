const { sqlite } = require("./options/sqlite3");
const knex = require("knex")(sqlite);

const sqliteApp = async () => {
  if (await knex.schema.hasTable("messages")) {
    console.log("MESSAGE TABLE OK!");
    //await knex.schema.dropTable("messages")
  } else {
    knex.schema
      .createTable("messages", (table) => {
        table.increments("id").primary();
        table.string("author").notNullable();
        table.string("time").notNullable();
        table.string("text").notNullable();
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
module.exports = { sqliteApp };
