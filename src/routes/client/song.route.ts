import { Router } from 'express';
import * as controller from '../../controllers/client/song.controller';

const router = Router();

router.get('/:slugTopic', controller.index);

const songRoutes = router;
export default songRoutes;
