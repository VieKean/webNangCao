//apiRoute.js
import express from 'express'
import ApiUserController from '../controllers/ApiUserController'
import APIcategoryController from '../controllers/APIcategoryController'
import { showAllProducts, showProductDetail, showProductsByCategory } from '../controllers/APIproductController'
import { showAllCategories } from '../controllers/APIcategoryController'

const router = express.Router()

const initAPIRoute = (app) => {
  // User routes
  router.get('/get-all-users', ApiUserController.getAllUsers)
  router.get('/detail-user/:user', ApiUserController.detailUser)
  router.post('/createUser', ApiUserController.createUser)
  router.put('/updateUser', ApiUserController.updateUser)
  router.delete('/deleteUser', ApiUserController.delUser)
  router.post('/login', ApiUserController.login) 

  // Product routes
  router.get('/listProducts', showAllProducts)
  router.get('/listProducts/:id', showProductDetail)
  router.get('/listProductsByCategory/:categoryId', showProductsByCategory);


  // Category routes
  router.get('/listCategories', showAllCategories)

  return app.use("/api/v1", router)
}

export default initAPIRoute
