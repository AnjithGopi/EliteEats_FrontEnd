import { useState } from 'react';
import { HiArrowLeft, HiCloudUpload } from 'react-icons/hi';
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
  const navigate = useNavigate();

  const riderId=useSelector((state:RootState)=>state.riderSlice.id)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setDrivingLicense(file);
      
      // Create preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setLicenseImageUrl(previewUrl);
    }
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    setIsUploading(true);
    try {
      const imageFormData = new FormData();
      imageFormData.append("file", file);
      imageFormData.append("upload_preset", "deliveryPartners_verifications"); 
      
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dsheqlajm/image/upload", 
        imageFormData
      );

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
        riderId:riderId,
        drivingLicenseUrl: licenseUrl
      };

      console.log("Submitting:", submissionData);

      const response=await verifyRiderProfile(submissionData)
      console.log(response) 
      alert('Verification submitted successfully! Our team will review your documents.');
      navigate('/delivery-partner/dashboard');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit verification. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-[#cb202d] mb-6"
      >
        <HiArrowLeft className="mr-2" /> Back to Dashboard
      </button>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-[#cb202d] mb-2">Profile Verification</h2>
        <p className="text-gray-600 mb-6">Please provide your details and upload your driving license</p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="fullAddress">
                Full Address*
              </label>
              <textarea
                id="fullAddress"
                name="fullAddress"
                value={formData.fullAddress}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cb202d]"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="city">
                City*
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cb202d]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="state">
                State*
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cb202d]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="postalCode">
                Postal Code*
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cb202d]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="vehicleType">
                Vehicle Type*
              </label>
              <select
                id="vehicleType"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cb202d]"
                required
              >
                <option value="bike">Bike</option>
                <option value="scooter">Scooter</option>
                <option value="bicycle">Bicycle</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload Driving License</h3>
            
            <div className="grid grid-cols-1">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="drivingLicense">
                  Driving License* (Front Side)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    id="drivingLicense"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />
                  <label htmlFor="drivingLicense" className="cursor-pointer">
                    {licenseImageUrl ? (
                      <div className="mt-2">
                        <img 
                          src={licenseImageUrl} 
                          alt="License preview" 
                          className="max-h-40 mx-auto mb-2 rounded"
                        />
                        <p className="text-gray-600">{drivingLicense?.name}</p>
                      </div>
                    ) : (
                      <>
                        <HiCloudUpload className="mx-auto text-3xl text-[#cb202d] mb-2" />
                        <p className="text-gray-600 mb-1">Click to upload</p>
                      </>
                    )}
                    <p className="text-sm text-gray-500">JPG, PNG or PDF (Max 5MB)</p>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="bg-[#cb202d] text-white py-3 px-6 rounded-lg hover:bg-[#a71a24] transition-colors focus:outline-none focus:ring-2 focus:ring-[#cb202d] focus:ring-offset-2 disabled:opacity-50"
            >
              {isUploading ? 'Uploading...' : isSubmitting ? 'Submitting...' : 'Submit Verification'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyProfile;