import  { Router } from 'express';
import healthController from '../controllers/health.controller';

const router = Router();

router.get('', healthController.welcome);


router.get('/health', healthController.serverHealth);

export default router;