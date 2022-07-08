const fs = require("fs")

class Contenedor {
     constructor(productos) {
          this.productos = productos
     }
     read = async () => {
          try {
               const data = await fs.promises.readFile(this.productos, "utf-8");
               return JSON.parse(data);
          } catch (error) {
               console.log(error);;
          }
     };
     write = async (params) => {
          const nuevoProducto = JSON.stringify(params, null, 2)
          await fs.promises.writeFile(this.productos, nuevoProducto, 'utf8');
     }
     save = async (obj) => {

          try {
               const allProducts = await this.read();
               if (allProducts.length === 0) {
                    const newProduct = {
                         id: 1,
                         ...obj,
                    };
                    await fs.promises.writeFile(
                         this.productos,
                         JSON.stringify([...allProducts, newProduct])
                    );
               } else {
                    const lastProductId = allProducts[allProducts.length - 1].id;
                    const newProduct = {
                         id: lastProductId + 1,
                         ...obj,
                    };

                    await fs.promises.writeFile(
                         this.productos,
                         JSON.stringify([...allProducts, newProduct])
                    );

                    return newProduct.id;
               }

          } catch (error) {
               console.log(error);
          }
     }

     getById = async (Id) => {
          try {
               const data = JSON.parse(await fs.promises.readFile(this.productos, 'utf8'))
               this.productosArray = data;
               const producto = this.productosArray.find((producto) => producto.id === Id)
               if (producto) console.log(producto)
               else console.log('No se encontro el producto')
          } catch (err) {
               console.log(err)
          }

     }
     getAll = async () => {
          const data = await fs.promises.readFile(this.productos)
          const productos = JSON.parse(data)
          if (productos.length) {
               const todosLosProductos = productos.map((producto) => producto)
               // console.log(todosLosProductos)
               return todosLosProductos
          } else {
               // console.log('No hay productos')
          }
     }
     deleteById = async (idDelete) => {
          try {

               const data = await fs.promises.readFile(this.productos)
               this.productosArray = JSON.parse(data)

               const newData = this.productosArray.findIndex((producto) => producto.id === idDelete ? true : false)
               if (newData !== -1) {
                    this.productosArray.splice(newData, 1)
                    this.write(this.productosArray)
                    console.log('Producto borrado')
               } else {
                    console.log('No se encontro el producto')
               }
          } catch (error) {
               console.log(error);
          }

     }
     deleteAll = async () => {
          try {
               const data = JSON.parse(await fs.promises.readFile(this.productos, 'utf8'))
               console.log(data);
               if (data.length) {
                    this.write([])
                    console.log('Todos los archivos fueron borrados ')
               } else {
                    console.log('No hay productos para borrar')
               }

          } catch (err) {
               console.log(err)
          }
     }
}
const contenedor = new Contenedor("./productos.json")

const item1 = {
     title: "tv LG",
     price: 6500,
     thumbnail: "https://www.lg.com/ec/images/tvs/md07504165/gallery/50UN7310_1100.jpg"
}
const item2 = {
     title: "Heladera GAFA",
     price: 8500,
     thumbnail: "https://http2.mlstatic.com/D_NQ_NP_655772-MLA48848757249_012022-O.jpg"
}
const item3 = {
     title: "Cocina ELECTROLUX",
     price: 7200,
     thumbnail: "https://jumboargentina.vtexassets.com/arquivos/ids/683656-800-600?v=637772323325870000&width=800&height=600&aspect=true"
}
const item4 = {
     title: "Horno eléctrico GRILL",
     price: 2500,
     thumbnail: "https://www.megatone.net/Images/Articulos/zoom2x/243/HOR0045CNQ.jpg"
}
const item5 = {
     title: "pava eléctrica",
     price: 2000,
     thumbnail: "https://www.megatone.net/Images/Articulos/zoom2x/243/HOR0045CNQ.jpg"
}
// contenedor.save(item5)
// contenedor.getById(4)
// contenedor.getAll()
// contenedor.deleteById(4)
// contenedor.deleteAll()
module.exports=contenedor