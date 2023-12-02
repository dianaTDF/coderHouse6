import { FileManagment } from "./../extas/FileManagment.js"
import { Product } from "./../models/Product.js"

export class ProductManager extends FileManagment{
    
    constructor(path,obj){
        super(path,obj)        

    }
    
    async add({title,description,code,price,status,thumbnails,stock,category}){
        const data ={title,description,code,price,status,thumbnails,stock,category}
        console.log(data)
        const created= await super.add(data)
        return created
    }

/* 
    async update(id,{title,description,code,price,status,thumbnails,stock,category}){
        const updated= await super.update(id,{title,description,code,price,status,thumbnails,stock,category})
*/
    async update(id,{title,description,code,price,status,thumbnails,stock,category}){
        const data ={title,description,code,price,status,thumbnails,stock,category}
        //return(data)
        const updated= await super.update(id,data)
        
        return updated
    }


}

export const pm= new ProductManager('./db/product.json',Product)