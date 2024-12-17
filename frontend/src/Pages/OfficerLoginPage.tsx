import { useState, FormEvent, useEffect } from 'react';
import { Shield, Users, ChevronRight, Mail, IdCard, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.webp';

type LoginType = 'officer' | 'supervisor';

const OfficerLoginPage = (): JSX.Element => {
  const [loginType, setLoginType] = useState<LoginType>('officer');
  const [idNumber, setIdNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if(loginType === "officer"){
      navigate('/officer/name');
    } else {
      navigate('/under-construction');
    }
  };

  // Add viewport height fix for iOS
  useEffect(() => {
    // Function to update CSS variable for viewport height
    const updateVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Initial call
    updateVH();

    // Update on resize and orientation change
    window.addEventListener('resize', updateVH);
    window.addEventListener('orientationchange', updateVH);

    return () => {
      window.removeEventListener('resize', updateVH);
      window.removeEventListener('orientationchange', updateVH);
    };
  }, []);

  const handleBack = (): void => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 flex items-center space-x-2 text-white md:text-gray-600 hover:text-green-700 transition-colors duration-200 z-10"
        type="button"
        aria-label="Go back to previous page"
      >
        <ArrowLeft className="h-6 w-6 text-white opacity-50" />
        <span className="text-sm font-medium text-white opacity-50">Back</span>
      </button>

      {/* Left Side - Hero Section */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-green-800 to-green-900 p-8 flex flex-col justify-center items-center text-white">
        <img
          src={logo}
          alt="OGUN SO-SAFE CORPS"
          className="h-24 w-auto mb-8"
        />
        <h1 className="text-4xl font-bold text-center mb-4">
          OGUN SO-SAFE CORPS
        </h1>
        <p className="text-lg text-center text-green-100 max-w-md">
          Securing our communities through dedication, vigilance, and unwavering service.
        </p>
      </div>

      {/* Right Side - Login Forms */}
      <div className="w-full md:w-1/2 bg-white p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          {/* Login Type Selector */}
          <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setLoginType('officer')}
              className={`flex-1 flex items-center justify-center py-3 px-4 rounded-md space-x-2 ${
                loginType === 'officer' 
                  ? 'bg-white shadow text-green-800' 
                  : 'text-gray-600 hover:text-green-700'
              }`}
            >
              <Users size={20} />
              <span>Officer</span>
            </button>
            <button
              type="button"
              onClick={() => setLoginType('supervisor')}
              className={`flex-1 flex items-center justify-center py-3 px-4 rounded-md space-x-2 ${
                loginType === 'supervisor' 
                  ? 'bg-white shadow text-green-800' 
                  : 'text-gray-600 hover:text-green-700'
              }`}
            >
              <Shield size={20} />
              <span>Supervisor / Admin</span>
            </button>
          </div>

          {/* Login Forms */}
          <form onSubmit={handleLogin} className="space-y-6">
            {loginType === 'officer' ? (
              // Officer Login Form
              <div className="space-y-6">
                <div>
                  <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Officer Form Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IdCard className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="idNumber"
                      type="text"
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value)}
                      className="pl-10 w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter your Form number"
                      required
                    />
                  </div>
                </div>
              </div>
            ) : (
              // Supervisor Login Form
              <div className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-green-800 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              <span className="mr-2">Login to Dashboard</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OfficerLoginPage;