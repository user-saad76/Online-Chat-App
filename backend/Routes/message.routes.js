import express from 'express'
import { CreateMessage, DeleteMessage, GetMessage, GetMessageById, UpdateMessage } from '../Controllers/message.controller.js';
const server = express();
const router =  express.Router()


router.route('/create/message').post(CreateMessage)
router.route('/messages').get(GetMessage)
router.route('/message/:id').get(GetMessageById)
router.route('/message/update/:id').put(UpdateMessage)
router.route('/message/delete/:id').delete(DeleteMessage)

export default router