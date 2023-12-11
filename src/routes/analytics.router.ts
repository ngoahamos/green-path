import  { Router } from 'express';
import analyticController from '../controllers/analytic.controller';
import { auth } from '../middlewares/auth.middleware';

const router = Router();

router.get('/daily-average', [auth], analyticController.daily_average);



export default router;