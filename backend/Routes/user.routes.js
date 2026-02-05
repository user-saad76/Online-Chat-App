import express from 'express'
import { DeleteUser, GetUserById, SignInUser, SignupUser, UpdateUser } from '../Controllers/user.controller.js';
import upload from '../utlis/multer.js';

const server = express();
const router =  express.Router()


router.route('/create/sign-up').post(upload.single('image'),SignupUser)
router.route('/sign-in').post(SignInUser)
router.route('/user/:id').get(GetUserById)
router.route('/user/update/:id').put(UpdateUser)
router.route('/user/delete/:id').delete(DeleteUser)

export default router