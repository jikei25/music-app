import { Request, Response, Router } from 'express';
import * as controller from '../../controllers/client/topic.controller';

const router = Router();

router.get('/', controller.topics);

export const topicRoutes: Router = router;
