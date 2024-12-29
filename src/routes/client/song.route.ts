import { Router } from 'express';
import * as controller from '../../controllers/client/song.controller';

const router = Router();

router.get('/:slugTopic', controller.index);
router.get('/detail/:slugSong', controller.detail);
router.patch('/like', controller.like);
router.patch('/favorite', controller.favorite)
const songRoutes = router;
export default songRoutes;
