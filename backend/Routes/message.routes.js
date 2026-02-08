import express from 'express'
import { CreateMessage, DeleteMessage, GetMessage, GetMessageById, UpdateMessage } from '../Controllers/message.controller.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';
const server = express();
const router =  express.Router()


router.route('/create/message').post(isAuthenticated,CreateMessage)
router.route('/messages').get(isAuthenticated,GetMessage)
router.route('/message/:id').get(isAuthenticated,GetMessageById)
router.route('/message/update/:id').put(isAuthenticated,UpdateMessage)
router.route('/message/delete/:id').delete(isAuthenticated,DeleteMessage)

export default router