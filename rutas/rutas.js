const express=require("express")
const router =express.Router();
const contenedor=require("../controlador/productos")
const fs = require("fs")


router.get("/", async(req, res)=>{

    const productos = await contenedor.getAll()
    res.render( 'inicio',{productos})
    
})

router.post("/productos",(req, res)=>{
    
    contenedor.save(req.body); 
    res.redirect("/");
    res.sendStatus(201)
   
})



module.exports=router