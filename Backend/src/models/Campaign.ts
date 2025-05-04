import mongoose, { Schema, Document } from 'mongoose';

export interface ICampaign extends Document {
  name: string;
  description: string;
  status: 'active' | 'scheduled' | 'draft' | 'completed' | 'paused';
  type: 'email' | 'sms' | 'push' | 'social';
  audience: string;
  dateCreated: string;
  lastModified: string;
  progress: number;
  isPriority: boolean;
  stats: {
    total: number;
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    bounced: number;
    openRate: number;
    clickRate: number;
  };
}

const CampaignSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  status: { 
    type: String, 
    enum: ['active', 'scheduled', 'draft', 'completed', 'paused'],
    default: 'draft' 
  },
  type: { 
    type: String, 
    enum: ['email', 'sms', 'push', 'social'],
    required: true 
  },
  audience: { type: String, required: true },
  dateCreated: { type: String, default: new Date().toISOString() },
  lastModified: { type: String, default: new Date().toISOString() },
  progress: { type: Number, default: 0 },
  isPriority: { type: Boolean, default: false },
  stats: {
    total: { type: Number, default: 0 },
    sent: { type: Number, default: 0 },
    delivered: { type: Number, default: 0 },
    opened: { type: Number, default: 0 },
    clicked: { type: Number, default: 0 },
    bounced: { type: Number, default: 0 },
    openRate: { type: Number, default: 0 },
    clickRate: { type: Number, default: 0 }
  }
});

const Campaign = mongoose.model<ICampaign>('Campaign', CampaignSchema);
export default Campaign;