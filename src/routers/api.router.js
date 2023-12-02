import { Router } from "express"
import { productRouter } from "./product.router.js"
import { cartRouter } from "./cart.router.js"

export const apiRouter= Router()

apiRouter.use('/products',productRouter)
apiRouter.use('/carts',cartRouter)