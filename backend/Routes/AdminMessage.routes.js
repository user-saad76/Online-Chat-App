import express from 'express'
import { CreateAdminMessage, DeleteAdminMessage, GetAdminMessage, GetAdminMessageById, UpdateAdminMessage } from '../Controllers/AdminMessage.controller.js';
import { isAdminAuthenticated } from '../middleware/adminAuth.middleware.js';
const server = express();
const router =  express.Router()


router.route('/create/admin/message').post(isAdminAuthenticated,CreateAdminMessage)
router.route('/admin/messages').get(isAdminAuthenticated,GetAdminMessage)
router.route('/admin/message/:id').get(isAdminAuthenticated,GetAdminMessageById)
router.route('/admin/message/update/:id').put(isAdminAuthenticated,UpdateAdminMessage)
router.route('/admin/message/delete/:id').delete(isAdminAuthenticated,DeleteAdminMessage)

export default router