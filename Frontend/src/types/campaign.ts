export interface Campaign {
  id: string;
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