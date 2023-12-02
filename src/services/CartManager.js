import { FileManagment } from "./../extas/FileManagment.js"
import { Cart } from "./../models/Cart.js";


export class CartManager extends FileManagment{    
    #myObject
    constructor(path,obj){
        super(path,obj)           
        this.#myObject=obj
    }
    
    
    async add(){
        await this.load()
        this.idIncrement()
        const newObject= new this.#myObject(this.id)
        this.objectListPush(newObject.print())
        
        await this.burn()
        return newObject.print()
    }

    async addProduct(id,productId){
        const cartJson = await this.search(id)
        const cart = new this.#myObject(cartJson.id,cartJson.products)
        console.log( cart.print())
        //se crea el modelo Cart para que adminstre el ingreso de item
        cart.addProduct(productId)
        console.log( cart.print())

        //se guarda en el archivo, con el id de cartJson y la informacion renovada de la instancia cart
        const result = await this.update(cartJson.id, cart.print())
        return result
    }

}

export const cm= new CartManager('./db/cart.json',Cart)