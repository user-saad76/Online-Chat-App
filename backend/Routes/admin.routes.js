import express from 'express'
import upload from '../utlis/multer.js';
import { SignInAdmin, SignupAdmin } from '../Controllers/admin.controller.js';


const server = express();
const router =  express.Router()


router.route('/create/admin/sign-up').post(upload.single('image'),SignupAdmin)
 router.route('/admin/sign-in').post(SignInAdmin)
// router.route('/user/me').get(isAuthenticated,getMe)
// router.route('/user/:id').get(GetUserById)
// router.route('/user/update/:id').put(UpdateUser)
// router.route('/user/delete/:id').delete(DeleteUser)
// router.route('/user/logout').post(logout)


export default router