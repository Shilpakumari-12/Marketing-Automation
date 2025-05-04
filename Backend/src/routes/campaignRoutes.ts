import express from 'express';
import { campaignController } from '../controllers/campaignController';

const router = express.Router();

router.get('/campaigns', campaignController.getAllCampaigns);
router.post('/campaigns', campaignController.createCampaign);
router.put('/campaigns/:id', campaignController.updateCampaign);
router.delete('/campaigns/:id', campaignController.deleteCampaign);

export default router;