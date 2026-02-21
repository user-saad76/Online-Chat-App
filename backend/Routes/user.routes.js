import express from 'express'
import { DeleteUser, getMe, GetUserById, SignInUser, SignupUser, UpdateUser,logout } from '../Controllers/user.controller.js';
import upload from '../utlis/multer.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';

const server = express();
const router =  express.Router()


router.route('/create/sign-up').post(upload.single('image'),SignupUser)
router.route('/sign-in').post(SignInUser)
router.route('/user/me').get(isAuthenticated,getMe)
router.route('/user/:id').get(GetUserById)
router.route('/user/update/:id').put(UpdateUser)
router.route('/user/delete/:id').delete(DeleteUser)
router.route('/user/logout').get(logout)


export default router