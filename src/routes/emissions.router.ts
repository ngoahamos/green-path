import  { Router } from 'express';
import emissionController from '../controllers/emission.controller';
import { auth } from '../middlewares/auth.middleware';

const router = Router();

router.post('/log-bike', [auth], emissionController.log_bike_emission);

router.post('/log-walk', [auth], emissionController.log_walking_emission);

router.post('/log-car', [auth], emissionController.log_car_emission);


export default router;