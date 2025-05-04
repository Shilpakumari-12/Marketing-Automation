import express, { Router, Request, Response } from 'express';
import { authController } from '../controllers/authController';

const router: Router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
  await authController.login(req, res);
});

router.post('/google-login', async (req: Request, res: Response) => {
  await authController.googleLogin(req, res);
});

export default router;