import { Router } from 'express';
import { getConversations } from './controllers/chatController.js';
import { createConversation } from './controllers/chatController.js';
const chatRouter = Router();


chatRouter.get('/conversations', getConversations);
chatRouter.post('/conversations', createConversation);

export default chatRouter;

