import React, { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BarChart4, Lock, Mail } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

interface LocationState {
  from?: {
    pathname: string;
  };
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = (location.state as LocationState)?.from?.pathname || '/';
  
  // If already authenticated, redirect to the intended page
  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsSubmitting(true);
    
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setLoginError('Invalid email or password');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      setIsSubmitting(true);
      // Implement your Google login logic here
      console.log(credentialResponse);
      // await login with Google
      navigate(from, { replace: true });
    } catch (error) {
      setLoginError('Failed to sign in with Google');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleFacebookLogin = async () => {
    try {
      setIsSubmitting(true);
      // Implement your Facebook login logic here
      // await login with Facebook
      navigate(from, { replace: true });
    } catch (error) {
      setLoginError('Failed to sign in with Facebook');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary-100 p-3 rounded-full">
              <BarChart4 className="h-8 w-8 text-primary-600" />
            </div>
 i          </div>
          <h2 className="text-3xl font-bold text-gray-900">Market Automation</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account to access your marketing dashboard
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {loginError && (
            <div className="bg-error-50 text-error-700 p-3 rounded-md text-sm" role="alert">
              {loginError}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="label">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-10 w-full"
                  placeholder="admin@example.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="label">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pl-10 w-full"
                  placeholder="password"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            
            <div className="text-sm">
              <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                Forgot your password?
              </a>
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full py-3 transition-all duration-200 ease-in-out"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                  Signing in...
                </span>
              ) : (
                'Sign in with Email'
              )}
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => setLoginError('Failed to sign in with Google')}
              useOneTap
              theme="outline"
              size="large"
              text="signin_with"
              shape="rectangular"
            />
            
            <button
              type="button"
              onClick={handleFacebookLogin}
              className="btn btn-outline flex items-center justify-center space-x-2 py-2"
              disabled={isSubmitting}
            >
              <img src="/facebook-icon.svg" alt="Facebook" className="w-5 h-5" />
              <span>Facebook</span>
            </button>
          </div>
        </form>
        
        <div className="text-center text-xs text-gray-500 mt-8">
          <p>Demo credentials:</p>
          <p>Email: admin@example.com / Password: password</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;