import  { Router } from 'express';
import analyticController from '../controllers/analytic.controller';
import { auth } from '../middlewares/auth.middleware';

const router = Router();

router.post('/daily-average', [auth], analyticController.daily_average);
router.post('/date-range', [auth], analyticController.weekly_analytics);
router.post('/total-emissions', [auth], analyticController.total_emissions);


export default router;