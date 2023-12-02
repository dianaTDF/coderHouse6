import { Router } from "express";
import { getController,postController,putController,deleteController } from "../controllers/product.controller.js";

export const productRouter = Router()

productRouter.get('/', getController)
productRouter.get('/:pid', getController)
productRouter.post('/', postController)
productRouter.put('/:pid', putController)
productRouter.delete('/:pid', deleteController)