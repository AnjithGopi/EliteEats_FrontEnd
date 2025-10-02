// import { useState } from 'react';
// import { HiArrowLeft, HiCloudUpload } from 'react-icons/hi';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { verifyRiderProfile } from '../../../services/riderServices/riderServices';
// import { useSelector } from 'react-redux';
// import type { RootState } from '../../../redux/store';

// const VerifyProfile = () => {
//   const [formData, setFormData] = useState({
//     fullAddress: '',
//     city: '',
//     state: '',
//     postalCode: '',
//     vehicleType: 'bike',
//   });
//   const [drivingLicense, setDrivingLicense] = useState<File | null>(null);
//   const [licenseImageUrl, setLicenseImageUrl] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);
//   const navigate = useNavigate();

//   const riderId=useSelector((state:RootState)=>state.riderSlice.id)

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setDrivingLicense(file);
      
//       // Create preview URL for the image
//       const previewUrl = URL.createObjectURL(file);
//       setLicenseImageUrl(previewUrl);
//     }
//   };

//   const uploadToCloudinary = async (file: File): Promise<string> => {
//     setIsUploading(true);
//     try {
//       const imageFormData = new FormData();
//       imageFormData.append("file", file);
//       imageFormData.append("upload_preset", "deliveryPartners_verifications"); 
      
//       const response = await axios.post(
//         "https://api.cloudinary.com/v1_1/dsheqlajm/image/upload", 
//         imageFormData
//       );

//       if (response.data.secure_url) {
//         return response.data.secure_url;
//       } else {
//         throw new Error('Failed to upload image');
//       }
//     } catch (error) {
//       console.error("Upload error:", error);
//       throw error;
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!drivingLicense) {
//       alert('Please upload your driving license');
//       return;
//     }

//     setIsSubmitting(true);
    
//     try {
     
//       const licenseUrl = await uploadToCloudinary(drivingLicense);
      
    
//       const submissionData = {
//         ...formData,
//         riderId:riderId,
//         drivingLicenseUrl: licenseUrl
//       };

//       console.log("Submitting:", submissionData);

//       const response=await verifyRiderProfile(submissionData)
//       console.log(response) 
//       alert('Verification submitted successfully! Our team will review your documents.');
//       navigate('/delivery-partner/dashboard');
//     } catch (error) {
//       console.error('Submission error:', error);
//       alert('Failed to submit verification. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <button 
//         onClick={() => navigate(-1)}
//         className="flex items-center text-[#cb202d] mb-6"
//       >
//         <HiArrowLeft className="mr-2" /> Back to Dashboard
//       </button>

//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-2xl font-bold text-[#cb202d] mb-2">Profile Verification</h2>
//         <p className="text-gray-600 mb-6">Please provide your details and upload your driving license</p>

//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//             <div>
//               <label className="block text-gray-700 mb-2" htmlFor="fullAddress">
//                 Full Address*
//               </label>
//               <textarea
//                 id="fullAddress"
//                 name="fullAddress"
//                 value={formData.fullAddress}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cb202d]"
//                 rows={3}
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 mb-2" htmlFor="city">
//                 City*
//               </label>
//               <input
//                 type="text"
//                 id="city"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cb202d]"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 mb-2" htmlFor="state">
//                 State*
//               </label>
//               <input
//                 type="text"
//                 id="state"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cb202d]"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 mb-2" htmlFor="postalCode">
//                 Postal Code*
//               </label>
//               <input
//                 type="text"
//                 id="postalCode"
//                 name="postalCode"
//                 value={formData.postalCode}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cb202d]"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 mb-2" htmlFor="vehicleType">
//                 Vehicle Type*
//               </label>
//               <select
//                 id="vehicleType"
//                 name="vehicleType"
//                 value={formData.vehicleType}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cb202d]"
//                 required
//               >
//                 <option value="bike">Bike</option>
//                 <option value="scooter">Scooter</option>
//                 <option value="bicycle">Bicycle</option>
//               </select>
//             </div>
//           </div>

//           <div className="mb-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload Driving License</h3>
            
//             <div className="grid grid-cols-1">
//               <div>
//                 <label className="block text-gray-700 mb-2" htmlFor="drivingLicense">
//                   Driving License* (Front Side)
//                 </label>
//                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
//                   <input
//                     type="file"
//                     id="drivingLicense"
//                     accept="image/*,.pdf"
//                     onChange={handleFileChange}
//                     className="hidden"
//                     required
//                   />
//                   <label htmlFor="drivingLicense" className="cursor-pointer">
//                     {licenseImageUrl ? (
//                       <div className="mt-2">
//                         <img 
//                           src={licenseImageUrl} 
//                           alt="License preview" 
//                           className="max-h-40 mx-auto mb-2 rounded"
//                         />
//                         <p className="text-gray-600">{drivingLicense?.name}</p>
//                       </div>
//                     ) : (
//                       <>
//                         <HiCloudUpload className="mx-auto text-3xl text-[#cb202d] mb-2" />
//                         <p className="text-gray-600 mb-1">Click to upload</p>
//                       </>
//                     )}
//                     <p className="text-sm text-gray-500">JPG, PNG or PDF (Max 5MB)</p>
//                   </label>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-end">
//             <button
//               type="submit"
//               disabled={isSubmitting || isUploading}
//               className="bg-[#cb202d] text-white py-3 px-6 rounded-lg hover:bg-[#a71a24] transition-colors focus:outline-none focus:ring-2 focus:ring-[#cb202d] focus:ring-offset-2 disabled:opacity-50"
//             >
//               {isUploading ? 'Uploading...' : isSubmitting ? 'Submitting...' : 'Submit Verification'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default VerifyProfile;

import { useState } from 'react';
import { HiArrowLeft, HiCloudUpload, HiCheckCircle, HiExclamationCircle, HiShieldCheck, HiDocumentText, HiLocationMarker, HiTruck } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { verifyRiderProfile } from '../../../services/riderServices/riderServices';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../redux/store';

const VerifyProfile = () => {
  const [formData, setFormData] = useState({
    fullAddress: '',
    city: '',
    state: '',
    postalCode: '',
    vehicleType: 'bike',
  });
  const [drivingLicense, setDrivingLicense] = useState<File | null>(null);
  const [licenseImageUrl, setLicenseImageUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const riderId = useSelector((state: RootState) => state.riderSlice.id);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      setDrivingLicense(file);
      
      // Create preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setLicenseImageUrl(previewUrl);
      setCurrentStep(2);
    }
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      const imageFormData = new FormData();
      imageFormData.append("file", file);
      imageFormData.append("upload_preset", "deliveryPartners_verifications"); 
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 10;
        });
      }, 200);
      
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dsheqlajm/image/upload", 
        imageFormData
      );

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (response.data.secure_url) {
        return response.data.secure_url;
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!drivingLicense) {
      alert('Please upload your driving license');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const licenseUrl = await uploadToCloudinary(drivingLicense);
      
      const submissionData = {
        ...formData,
        riderId: riderId,
        drivingLicenseUrl: licenseUrl
      };

      console.log("Submitting:", submissionData);

      const response = await verifyRiderProfile(submissionData);
      console.log(response);
      
      alert('Verification submitted successfully! Our team will review your documents.');
      navigate('/rider/profile');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit verification. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.fullAddress && formData.city && formData.state && formData.postalCode && drivingLicense;

  const steps = [
    { id: 1, title: 'Personal Details', icon: HiLocationMarker, completed: formData.fullAddress && formData.city && formData.state && formData.postalCode },
    { id: 2, title: 'Documents', icon: HiDocumentText, completed: !!drivingLicense },
    { id: 3, title: 'Review & Submit', icon: HiShieldCheck, completed: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-slate-600 hover:text-[#cb202d] transition-colors duration-200 mb-6 group"
          >
            <HiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" /> 
            <span className="font-medium">Back to Dashboard</span>
          </button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#cb202d] to-[#a01825] rounded-2xl mb-4 shadow-lg">
              <HiShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
              Profile Verification
            </h1>
            <p className="text-slate-600 text-lg">Secure your account with document verification</p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = step.completed;
                
                return (
                  <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className={`
                        w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg
                        ${isCompleted 
                          ? 'bg-green-500 text-white' 
                          : isActive 
                            ? 'bg-gradient-to-br from-[#cb202d] to-[#a01825] text-white' 
                            : 'bg-white border-2 border-slate-200 text-slate-400'
                        }
                      `}>
                        {isCompleted ? (
                          <HiCheckCircle className="w-6 h-6" />
                        ) : (
                          <Icon className="w-5 h-5" />
                        )}
                      </div>
                      <span className={`
                        mt-2 text-sm font-medium transition-colors duration-300
                        ${isActive ? 'text-[#cb202d]' : isCompleted ? 'text-green-600' : 'text-slate-400'}
                      `}>
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`
                        w-16 h-0.5 mx-4 transition-colors duration-300
                        ${steps[index + 1].completed || currentStep > step.id ? 'bg-green-500' : 'bg-slate-200'}
                      `} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/50 overflow-hidden">
          <form onSubmit={handleSubmit}>
            {/* Personal Details Section */}
            <div className="p-8 border-b border-slate-100">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                  <HiLocationMarker className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">Personal Information</h3>
                  <p className="text-slate-600">Provide your current address details</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-2">
                  <label className="block text-slate-700 font-medium mb-3" htmlFor="fullAddress">
                    Full Address*
                  </label>
                  <textarea
                    id="fullAddress"
                    name="fullAddress"
                    value={formData.fullAddress}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cb202d]/20 focus:border-[#cb202d] transition-all duration-200 resize-none bg-slate-50/50"
                    rows={3}
                    placeholder="Enter your complete address..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-3" htmlFor="city">
                    City*
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cb202d]/20 focus:border-[#cb202d] transition-all duration-200 bg-slate-50/50"
                    placeholder="Enter city"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-3" htmlFor="state">
                    State*
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cb202d]/20 focus:border-[#cb202d] transition-all duration-200 bg-slate-50/50"
                    placeholder="Enter state"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-3" htmlFor="postalCode">
                    Postal Code*
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cb202d]/20 focus:border-[#cb202d] transition-all duration-200 bg-slate-50/50"
                    placeholder="Enter postal code"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-3" htmlFor="vehicleType">
                    Vehicle Type*
                  </label>
                  <div className="relative">
                    <select
                      id="vehicleType"
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleChange}
                      className="w-full px-4 py-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cb202d]/20 focus:border-[#cb202d] transition-all duration-200 bg-slate-50/50 appearance-none"
                      required
                    >
                      <option value="bike">🏍️ Motorcycle</option>
                      <option value="scooter">🛵 Scooter</option>
                      <option value="bicycle">🚲 Bicycle</option>
                    </select>
                    <HiTruck className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Document Upload Section */}
            <div className="p-8 border-b border-slate-100">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                  <HiDocumentText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">Document Verification</h3>
                  <p className="text-slate-600">Upload your driving license for verification</p>
                </div>
              </div>

              <div className="max-w-2xl">
                <label className="block text-slate-700 font-medium mb-3" htmlFor="drivingLicense">
                  Driving License* (Front Side)
                </label>
                
                <div className={`
                  relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300
                  ${drivingLicense 
                    ? 'border-green-300 bg-green-50/50' 
                    : 'border-slate-300 hover:border-[#cb202d] hover:bg-[#cb202d]/5'
                  }
                `}>
                  <input
                    type="file"
                    id="drivingLicense"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />
                  
                  <label htmlFor="drivingLicense" className="cursor-pointer block">
                    {licenseImageUrl ? (
                      <div className="space-y-4">
                        <div className="relative inline-block">
                          <img 
                            src={licenseImageUrl} 
                            alt="License preview" 
                            className="max-h-48 mx-auto rounded-xl shadow-lg border border-slate-200"
                          />
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <HiCheckCircle className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-slate-700">{drivingLicense?.name}</p>
                          <p className="text-sm text-slate-500 mt-1">Click to change</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#cb202d] to-[#a01825] rounded-2xl flex items-center justify-center mx-auto">
                          <HiCloudUpload className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <p className="text-lg font-medium text-slate-700 mb-2">Upload your driving license</p>
                          <p className="text-slate-500">Drag and drop or click to browse</p>
                        </div>
                      </div>
                    )}
                    <p className="text-sm text-slate-400 mt-4">JPG, PNG or PDF • Maximum 5MB</p>
                  </label>

                  {/* Upload Progress */}
                  {isUploading && (
                    <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-12 h-12 border-4 border-[#cb202d]/20 border-t-[#cb202d] rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="font-medium text-slate-700">Uploading...</p>
                        <div className="w-48 h-2 bg-slate-200 rounded-full mt-2 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#cb202d] to-[#a01825] transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-slate-500 mt-2">{Math.round(uploadProgress)}%</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Section */}
            <div className="p-8 bg-slate-50/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {isFormValid ? (
                    <div className="flex items-center text-green-600">
                      <HiCheckCircle className="w-5 h-5 mr-2" />
                      <span className="font-medium">Ready to submit</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-amber-600">
                      <HiExclamationCircle className="w-5 h-5 mr-2" />
                      <span className="font-medium">Please complete all fields</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting || isUploading}
                  className={`
                    relative overflow-hidden px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 transform
                    ${isFormValid && !isSubmitting && !isUploading
                      ? 'bg-gradient-to-r from-[#cb202d] to-[#a01825] hover:from-[#a01825] hover:to-[#8b1520] hover:scale-105 hover:shadow-lg shadow-md' 
                      : 'bg-slate-300 cursor-not-allowed'
                    }
                  `}
                >
                  {isSubmitting && (
                    <div className="absolute inset-0 bg-white/20 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    </div>
                  )}
                  <span className={isSubmitting ? 'opacity-0' : 'opacity-100'}>
                    {isUploading ? 'Uploading...' : isSubmitting ? 'Submitting...' : 'Submit Verification'}
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Security Notice */}
        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-2xl">
          <div className="flex items-start">
            <HiShieldCheck className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Your information is secure</h4>
              <p className="text-blue-700 text-sm leading-relaxed">
                All documents are encrypted and stored securely. We only use this information for verification purposes 
                and comply with data protection regulations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyProfile;