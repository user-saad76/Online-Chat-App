import express from 'express'
import { CreateUser, DeleteUser, GetUser, GetUserById, UpdateUser } from '../Controllers/user.controller.js';
import upload from '../utlis/multer.js';

const server = express();
const router =  express.Router()


router.route('/create/user').post(upload.single('image'),CreateUser)
router.route('/users').get(GetUser)
router.route('/user/:id').get(GetUserById)
router.route('/user/update/:id').put(UpdateUser)
router.route('/user/delete/:id').delete(DeleteUser)

export default router