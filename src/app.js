import  express from "express"
import { apiRouter } from "./routers/api.router.js"
import { webRouter } from "./routers/web.router.js"
import {Server} from 'socket.io'
import handlebars from 'express-handlebars'
import { pm } from "./services/ProductManager.js"

const app = express()
app.engine('handlebars',handlebars.engine())

app.use(express.json())
app.use('/statics',express.static('./statics'))
app.use('/api', apiRouter)
app.use('/',webRouter)

const server = app.listen(8080, ()=> {console.log('Conected to Port N8080')})
const socketServer=  new Server(server)

socketServer.on('connection', async (socket)=>{
    console.log(`${socket.id} conected`)

    socketServer.emit('prodList',await pm.getAll())

    /* --------------------------- agregado por socket -------------------------- */
    socket.on('prodAdd',async (product)=>{
        const newProd = JSON.parse(product)
        
        newProd.thumbnails=''
        if(newProd.status == '1'){
            newProd.status=true
          }else{
            newProd.status=false
          }

        console.log(newProd)
        try {
            await pm.add(newProd)
            console.log(`newProdo ${newProd.title} agregado`)            
            socketServer.emit('prodList',await pm.getAll())
            
        } catch (error) {
            console.log(`Error al ingresar producto, avisando a usuario`)                        
            socket.emit('errorMessage',{message:`Error al ingresar producto, revice los datos`})
        }
    })

    /* ------------------------- eliminacion por socket ------------------------- */
    socket.on('prodDel',async (prodId)=>{
        console.log(`usuario quiere eliminar producto ${prodId}`)

        try {
            await pm.delete(prodId)
            console.log(`producto eliminado correctamente`)
            socket.emit('successMessage',{message:`producto eliminado correctamente`})            
            socketServer.emit('prodList',await pm.getAll())
        } catch (error) {
            console.log(`error al eliminar producto`)
            socket.emit('errorMessage',{message:`Error al eliminar el producto`})            

        }
    })
})




/* 
node src/dataCharger.js 
para cargar algunos datos de prueba
 */


/*
un json de prueb para probar el product PUT

{
    "title": "test1",
    "description": "test1 description",
    "code": "001",
    "price": 20,
    "status": true,
    "thumbnail":  "imgTest.jpg",
    "stock": 14,
    "category": "nuevo"
        }
 */