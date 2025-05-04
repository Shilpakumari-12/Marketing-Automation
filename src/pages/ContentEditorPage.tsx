// Change this line:
import React, { useState } from 'react';

import { 
  Save, 
  Eye, 
  Send, 
  Copy, 
  Trash, 
  Plus, 
  Edit, 
  Image,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link2,
  LayoutTemplate
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'push';
  category: string;
  lastEdited: string;
  previewImage: string;
}

const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Welcome Email',
    type: 'email',
    category: 'Onboarding',
    lastEdited: '2 days ago',
    previewImage: 'https://images.pexels.com/photos/5926389/pexels-photo-5926389.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '2',
    name: 'Order Confirmation',
    type: 'email',
    category: 'Transactional',
    lastEdited: '1 week ago',
    previewImage: 'https://images.pexels.com/photos/5849559/pexels-photo-5849559.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '3',
    name: 'Abandoned Cart Reminder',
    type: 'email',
    category: 'Remarketing',
    lastEdited: '3 days ago',
    previewImage: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '4',
    name: 'Special Offer',
    type: 'sms',
    category: 'Promotional',
    lastEdited: '5 days ago',
    previewImage: 'https://images.pexels.com/photos/5849585/pexels-photo-5849585.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const mockPersonalizationTokens = [
  { name: 'First Name', token: '{{first_name}}' },
  { name: 'Last Name', token: '{{last_name}}' },
  { name: 'Email', token: '{{email}}' },
  { name: 'Company', token: '{{company}}' },
  { name: 'Purchase Date', token: '{{purchase_date}}' },
  { name: 'Product Name', token: '{{product_name}}' },
  { name: 'Total Amount', token: '{{total_amount}}' },
  { name: 'Discount Code', token: '{{discount_code}}' },
];

const ContentEditorPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'editor' | 'templates'>('editor');
  const [emailSubject, setEmailSubject] = useState('Welcome to Our Platform, {{first_name}}!');
  const [emailContent, setEmailContent] = useState(`<p>Dear {{first_name}},</p>
<p>Welcome to our platform! We're excited to have you join our community.</p>
<p>Get started by exploring these features:</p>
<ul>
  <li>Create your first campaign</li>
  <li>Connect your data sources</li>
  <li>Set up automations</li>
</ul>
<p>If you have any questions, our support team is here to help!</p>
<p>Best regards,<br>The Team</p>`);
  
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Editor</h1>
          <p className="mt-1 text-sm text-gray-500">
            Create and personalize content for your campaigns
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium border rounded-l-md ${
                activeTab === 'editor'
                  ? 'border-primary-600 bg-primary-600 text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('editor')}
            >
              Editor
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium border rounded-r-md ${
                activeTab === 'templates'
                  ? 'border-primary-600 bg-primary-600 text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('templates')}
            >
              Templates
            </button>
          </div>
        </div>
      </div>
      
      {activeTab === 'editor' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="border-b border-gray-200 px-5 py-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Email Editor</h2>
                  <div className="mt-3 sm:mt-0 flex space-x-3">
                    <button className="btn btn-outline text-xs px-3 py-1">
                      <Eye className="h-3 w-3 mr-1" />
                      Preview
                    </button>
                    <button className="btn btn-outline text-xs px-3 py-1">
                      <Send className="h-3 w-3 mr-1" />
                      Test Send
                    </button>
                    <button className="btn btn-primary text-xs px-3 py-1">
                      <Save className="h-3 w-3 mr-1" />
                      Save
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-5">
                <div className="mb-4">
                  <label htmlFor="email-subject" className="label">
                    Email Subject
                  </label>
                  <input
                    type="text"
                    id="email-subject"
                    className="input w-full"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Enter email subject..."
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email-content" className="label">
                    Email Content
                  </label>
                  <div className="border border-gray-300 rounded-md">
                    <div className="bg-gray-50 px-3 py-2 border-b border-gray-300">
                      <div className="flex flex-wrap space-x-2">
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <Bold className="h-4 w-4 text-gray-700" />
                        </button>
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <Italic className="h-4 w-4 text-gray-700" />
                        </button>
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <Underline className="h-4 w-4 text-gray-700" />
                        </button>
                        <div className="border-r border-gray-300 mx-1 h-6"></div>
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <AlignLeft className="h-4 w-4 text-gray-700" />
                        </button>
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <AlignCenter className="h-4 w-4 text-gray-700" />
                        </button>
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <AlignRight className="h-4 w-4 text-gray-700" />
                        </button>
                        <div className="border-r border-gray-300 mx-1 h-6"></div>
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <List className="h-4 w-4 text-gray-700" />
                        </button>
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <ListOrdered className="h-4 w-4 text-gray-700" />
                        </button>
                        <div className="border-r border-gray-300 mx-1 h-6"></div>
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <Link2 className="h-4 w-4 text-gray-700" />
                        </button>
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <Image className="h-4 w-4 text-gray-700" />
                        </button>
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <LayoutTemplate className="h-4 w-4 text-gray-700" />
                        </button>
                      </div>
                    </div>
                    <textarea
                      id="email-content"
                      rows={15}
                      className="w-full px-3 py-2 text-sm text-gray-700 focus:outline-none"
                      value={emailContent}
                      onChange={(e) => setEmailContent(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm h-full">
              <div className="border-b border-gray-200 px-5 py-4">
                <h2 className="text-lg font-medium text-gray-900">Personalization</h2>
              </div>
              
              <div className="p-5">
                <p className="text-sm text-gray-500 mb-4">
                  Insert these personalization tokens to create dynamic content for each recipient.
                </p>
                
                <div className="space-y-3">
                  {mockPersonalizationTokens.map((token, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md hover:bg-gray-100">
                      <span className="text-sm text-gray-700">{token.name}</span>
                      <div className="flex items-center">
                        <code className="text-xs bg-gray-200 px-2 py-1 rounded mr-2 text-primary-700">
                          {token.token}
                        </code>
                        <button 
                          className="p-1 hover:bg-gray-200 rounded"
                          onClick={() => {
                            setEmailContent(prev => prev + ' ' + token.token);
                          }}
                        >
                          <Copy className="h-3 w-3 text-gray-700" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <h3 className="text-md font-medium text-gray-900 mb-2">Preview For</h3>
                  <select className="input w-full mb-4">
                    <option>John Doe (john.doe@example.com)</option>
                    <option>Jane Smith (jane.smith@example.com)</option>
                    <option>Custom User...</option>
                  </select>
                  
                  <button className="btn btn-primary w-full">
                    Generate Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="border-b border-gray-200 px-5 py-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-medium text-gray-900">Content Templates</h2>
                <div className="mt-3 sm:mt-0 flex space-x-3">
                  <button className="btn btn-outline text-xs px-3 py-1">
                    <Edit className="h-3 w-3 mr-1" />
                    Manage Categories
                  </button>
                  <button className="btn btn-primary text-xs px-3 py-1">
                    <Plus className="h-3 w-3 mr-1" />
                    New Template
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {mockTemplates.map((template) => (
                  <div 
                    key={template.id} 
                    className={`border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer ${
                      selectedTemplate?.id === template.id ? 'ring-2 ring-primary-500' : ''
                    }`}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <div className="relative h-40 bg-gray-200">
                      <img 
                        src={template.previewImage} 
                        alt={template.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                          template.type === 'email'
                            ? 'bg-primary-100 text-primary-800'
                            : template.type === 'sms'
                            ? 'bg-secondary-100 text-secondary-800'
                            : 'bg-accent-100 text-accent-800'
                        }`}>
                          {template.type.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-900">{template.name}</h3>
                      <p className="mt-1 text-xs text-gray-500">{template.category}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs text-gray-500">Edited {template.lastEdited}</span>
                        <div className="flex space-x-2">
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Copy className="h-3 w-3 text-gray-500" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded text-error-500">
                            <Trash className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Create new template card */}
                <div className="border border-dashed rounded-lg overflow-hidden hover:bg-gray-50 transition-colors cursor-pointer h-full flex items-center justify-center">
                  <div className="text-center p-5">
                    <div className="bg-gray-100 rounded-full p-3 mx-auto mb-3 w-12 h-12 flex items-center justify-center">
                      <Plus className="h-6 w-6 text-gray-500" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-900">Create New Template</h3>
                    <p className="mt-1 text-xs text-gray-500">Add a custom template</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {selectedTemplate && (
            <div className="bg-white rounded-lg shadow-sm">
              <div className="border-b border-gray-200 px-5 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">
                    Template Preview: {selectedTemplate.name}
                  </h2>
                  <button 
                    className="btn btn-primary text-xs px-3 py-1"
                    onClick={() => {
                      setActiveTab('editor');
                      // In a real app, we would load the template content
                    }}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit in Editor
                  </button>
                </div>
              </div>
              
              <div className="p-5">
                <div className="bg-gray-50 border rounded-md p-5">
                  <div className="max-w-2xl mx-auto">
                    <div className="border-b border-gray-300 pb-3 mb-4">
                      <h3 className="text-lg font-medium">Welcome to Our Platform, {'{{first_name}}'}!</h3>
                    </div>
                    
                    <div className="prose text-gray-700">
                      <p>Dear {'{{first_name}}'},</p>
                      <p>Welcome to our platform! We're excited to have you join our community.</p>
                      <p>Get started by exploring these features:</p>
                      <ul>
                        <li>Create your first campaign</li>
                        <li>Connect your data sources</li>
                        <li>Set up automations</li>
                      </ul>
                      <p>If you have any questions, our support team is here to help!</p>
                      <p>Best regards,<br/>The Team</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContentEditorPage;