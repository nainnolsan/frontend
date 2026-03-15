import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_MUTATION } from '../graphql/auth';
import { useNavigation } from '../context/NavigationContext';

interface SignInProps {
  onSwitchToLogin?: () => void;
  redirectTo?: string | null;
}

interface RegisterData {
  register: {
    success: boolean;
    message: string;
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
}

interface RegisterVars {
  name: string;
  email: string;
  password: string;
}

const SignIn = ({ onSwitchToLogin, redirectTo }: SignInProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [error, setError] = useState('');
  const { setPage } = useNavigation();

  const redirectAfterAuth = (accessToken: string, refreshToken: string) => {
    if (!redirectTo) {
      return false;
    }

    try {
      const url = new URL(redirectTo);
      const allowed = (import.meta.env.VITE_ALLOWED_AUTH_REDIRECT_ORIGINS ?? '')
        .split(',')
        .map((origin: string) => origin.trim())
        .filter(Boolean);
      const safeOrigins = new Set([window.location.origin, ...allowed]);

      if (!safeOrigins.has(url.origin)) {
        return false;
      }

      url.searchParams.set('accessToken', accessToken);
      url.searchParams.set('refreshToken', refreshToken);
      window.location.assign(url.toString());
      return true;
    } catch {
      return false;
    }
  };

  const [register, { loading }] = useMutation<RegisterData, RegisterVars>(REGISTER_MUTATION, {
    onCompleted: (data) => {
      if (data.register.success) {
        // Guardar tokens
        localStorage.setItem('accessToken', data.register.accessToken);
        localStorage.setItem('refreshToken', data.register.refreshToken);

        if (redirectAfterAuth(data.register.accessToken, data.register.refreshToken)) {
          return;
        }

        // Redirigir al home
        setPage('home');
      } else {
        setError(data.register.message);
      }
    },
    onError: (err) => {
      setError(err.message || 'Error al crear la cuenta');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Check password match
    if (name === 'confirmPassword' || name === 'password') {
      setPasswordMatch(
        name === 'password' 
          ? value === formData.confirmPassword
          : formData.password === value
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatch(false);
      setError('Passwords do not match');
      return;
    }
    
    await register({
      variables: {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black px-4 py-12 transition-colors">
      {/* Back button */}
      <button
        onClick={() => setPage('home')}
        className="fixed top-4 left-4 p-2 text-black dark:text-white hover:opacity-70 transition-opacity"
        aria-label="Back to home"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>

      <div className="w-full max-w-md">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-2">Create your account</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Start your journey with us</p>
        </div>

        {/* Form Card */}
        <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-8 bg-white dark:bg-black shadow-sm transition-colors">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-black dark:text-white mb-2">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Nain Nolasco"
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all text-sm bg-white dark:bg-gray-800 text-black dark:text-white"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black dark:text-white mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all text-sm bg-white dark:bg-gray-800 text-black dark:text-white"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black dark:text-white mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all text-sm bg-white dark:bg-gray-800 text-black dark:text-white"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Must be at least 8 characters</p>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-black dark:text-white mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 transition-all text-sm bg-white dark:bg-gray-800 text-black dark:text-white ${
                  !passwordMatch && formData.confirmPassword
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 dark:border-gray-700 focus:ring-black dark:focus:ring-white focus:border-transparent'
                }`}
              />
              {!passwordMatch && formData.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                required
                className="mt-1 h-4 w-4 rounded border-gray-300 dark:border-gray-700 text-black focus:ring-black dark:text-white dark:focus:ring-white"
              />
              <label htmlFor="terms" className="ml-2 text-xs text-gray-600 dark:text-gray-400">
                I agree to the{' '}
                <a href="#" className="text-black dark:text-white hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-black dark:text-white hover:underline">Privacy Policy</a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !passwordMatch}
              className="w-full bg-black dark:bg-white text-white dark:text-black py-2.5 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Create account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">OR</span>
            </div>
          </div>

          {/* Social Signup */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium text-black dark:text-white"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        {/* Login link */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-black dark:text-white font-medium hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
