import express from 'express'
import { CreateMessage, DeleteMessage, GetMessageById, UpdateMessage } from '../Controllers/message.controller.js';
const server = express();
const router =  express.Router()


router.route('/create/message').post(CreateMessage)
router.route('/message').get(GetMessageById)
router.route('/message/update').put(UpdateMessage)
router.route('/message/delete').delete(DeleteMessage)

export default router