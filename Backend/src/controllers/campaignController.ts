import { Request, Response } from 'express';
import Campaign, { ICampaign } from '../models/Campaign';

export const campaignController = {
  getAllCampaigns: async (req: Request, res: Response) => {
    try {
      const campaigns = await Campaign.find();
      res.json(campaigns);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching campaigns' });
    }
  },

  createCampaign: async (req: Request, res: Response) => {
    try {
      const campaign = new Campaign(req.body);
      const savedCampaign = await campaign.save();
      res.status(201).json(savedCampaign);
    } catch (error) {
      res.status(400).json({ message: 'Error creating campaign' });
    }
  },

  updateCampaign: async (req: Request, res: Response) => {
    try {
      const updatedCampaign = await Campaign.findByIdAndUpdate(
        req.params.id,
        { ...req.body, lastModified: new Date().toISOString() },
        { new: true }
      );
      res.json(updatedCampaign);
    } catch (error) {
      res.status(400).json({ message: 'Error updating campaign' });
    }
  },

  deleteCampaign: async (req: Request, res: Response) => {
    try {
      await Campaign.findByIdAndDelete(req.params.id);
      res.json({ message: 'Campaign deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Error deleting campaign' });
    }
  }
};