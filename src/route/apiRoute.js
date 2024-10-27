import express from 'express'
import ApiUserController from '../controllers/ApiUserController'

const router = express.Router()
const initAPIRoute = (app) => {
  router.get('/get-all-users', ApiUserController.getAllUsers)
  router.get('/detail-user/:user', ApiUserController.detailUser)
  router.post('/createUser', ApiUserController.createUser);
  router.put('/updateUser', ApiUserController.updateUser);
  router.delete('/deleteUser', ApiUserController.delUser);
  router.post('/login', ApiUserController.login); 

  return app.use("/api/v1", router)
}

export default initAPIRoute
