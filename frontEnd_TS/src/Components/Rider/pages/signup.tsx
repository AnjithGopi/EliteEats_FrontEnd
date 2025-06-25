
import { useState } from 'react';

const PremiumRegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    profilePicture: null
  });
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, profilePicture: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="w-100% min-h-screen bg-gradient-to-br from-[#ffde59] via-[#ffd700] to-[#ffc800] flex items-center justify-center p-4">
      <div className="absolute top-0 left-0 bg-[#ffc700] h-64 w-64 rounded-br-full opacity-80"></div>
      <div className="bg-white  p-8  rounded-2xl shadow-2xl w-full max-w-md z-10 backdrop-blur-sm bg-opacity-90">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#cb202d] mb-2">
            {step === 1 ? 'Create Your Account' : 'Complete Your Profile'}
          </h2>
          <div className="flex justify-center mb-4">
            <div className="w-full bg-gray-200 rounded-full h-1.5 max-w-xs">
              <div 
                className="bg-[#cb202d] h-1.5 rounded-full transition-all duration-300" 
                style={{ width: step === 1 ? '50%' : '100%' }}
              ></div>
            </div>
          </div>
          <p className="text-gray-600">
            {step === 1 ? 'Step 1: Basic Information' : 'Step 2: Profile Picture'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Account Information */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent placeholder-gray-400 transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent placeholder-gray-400 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent placeholder-gray-400 transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  placeholder="+1 (123) 456-7890"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent placeholder-gray-400 transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent placeholder-gray-400 transition-all"
                  required
                  minLength={8}
                />
                <div className="grid grid-cols-4 gap-1 mt-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i}
                      className={`h-1 rounded-full ${
                        formData.password.length >= i * 2 ? 'bg-[#cb202d]' : 'bg-gray-200'
                      }`}
                    ></div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">Minimum 8 characters with uppercase, number & symbol</p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent placeholder-gray-400 transition-all"
                  required
                  minLength={8}
                />
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full bg-gradient-to-r from-[#cb202d] to-[#e53e3e] text-white py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-[#cb202d] focus:ring-offset-2 shadow-md mt-4"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Profile Picture */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <label htmlFor="profilePicture" className="cursor-pointer">
                    <div className="w-32 h-32 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden shadow-inner">
                      {previewImage ? (
                        <img 
                          src={previewImage} 
                          alt="Profile preview" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      )}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
                      <div className="bg-black bg-opacity-50 text-white text-sm font-medium rounded-full px-4 py-2">
                        {previewImage ? 'Change Photo' : 'Upload Photo'}
                      </div>
                    </div>
                  </label>
                  <input 
                    id="profilePicture" 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleImageChange}
                  />
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600 mb-1">
                    {previewImage ? 'Looking good!' : 'Upload a clear profile photo'}
                  </p>
                  <p className="text-xs text-gray-500">JPG or PNG, max 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full bg-white text-gray-700 py-3 rounded-xl font-semibold border border-gray-300 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 shadow-sm"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#cb202d] to-[#e53e3e] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-[#cb202d] focus:ring-offset-2 shadow-md"
                >
                  Complete Registration
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
      <div className="absolute bottom-0 right-0 bg-[#ffc700] h-64 w-64 rounded-tl-full opacity-80"></div>
    </div>
  );
};

export default PremiumRegistrationForm;