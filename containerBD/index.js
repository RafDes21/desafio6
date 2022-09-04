class Contenedor {
  constructor(config, table) {
    (this.config = config), (this.table = table);
  }

  async save(data) {
    try {
      await this.config(this.table)
        .insert(data)
        .then(() => {
          this.table === "products"
            ? console.log("saved product")
            : console.log("saved message");
        })
        .catch((err) => console.log(err))
        .finally(() => {
          this.config.destroy;
        });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = Contenedor;
