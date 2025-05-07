import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/layouts/DashboardLayout';
import CampaignDashboard from './pages/CampaignDashboard';
import SegmentationPage from './pages/SegmentationPage';
import AnalyticsPage from './pages/AnalyticsPage';
import CustomerProfilePage from './pages/CustomerProfilePage';
import ContentEditorPage from './pages/ContentEditorPage';
import NotificationPage from './pages/NotificationPage';
import ChatbotPage from './pages/ChatbotPage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import EmailSupportPage from './pages/EmailSupportPage';
import LiveChatPage from './pages/LiveChatPage';
import ScheduleCallPage from './pages/ScheduleCallPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/campaigns" replace />} />
          <Route path="campaigns" element={<CampaignDashboard />} />
          <Route path="segmentation" element={<SegmentationPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="customers/:id" element={<CustomerProfilePage />} />
          <Route path="editor" element={<ContentEditorPage />} />
          <Route path="notifications" element={<NotificationPage />} />
          <Route path="/support" element={<ChatbotPage />} />
          <Route path="/support/email" element={<EmailSupportPage />} />
          <Route path="/support/chat" element={<LiveChatPage />} />
          <Route path="/support/call" element={<ScheduleCallPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;