import { Router } from "express"

export const webRouter = Router()

webRouter.get('/realtimeproducts',(req,res)=>{
    res.render('realTimeProducts.handlebars',{title:'Productos'})
})