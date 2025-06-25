
import { useState } from "react";
import { registration } from "../../../services/restaurentServices/registration";


type SignupProps = {
  sendRestaurentInfo: (info: {
    email: string;
    token: string;
    image: unknown;
  }) => void;
};

function RestaurantRegistration({ sendRestaurentInfo }: SignupProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    cuisineType: "",
    description: "",
    password: "",
    confirmPass: "",
  });


  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);

      // Validate file type
      if (!file.type.match("image.*")) {
        alert("Please select an image file (JPEG, PNG)");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image must be less than 5MB");
        return;
      }

      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleContinue = async () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("Restaurant Registration Data:", formData);

      console.log("formDetails:", formData);
      console.log("image_details:", image);

      const response = await registration(formData);
      console.log("response from backend:", response.data);
      if (response.data.verificationToken) {
        sendRestaurentInfo({
          email: formData.email,
          token: response.data.verificationToken,
          image: image,
        });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepIndicator = () => {
    const steps = [" Info", "Details", "Security", "Profile", "Complete"];
    return (
      <div className="flex justify-center mb-6 sm:mb-8">
        <div className="flex items-center ">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center flex-shrink-0">
              <div
                className={`w-6 h-6 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold ${
                  index + 1 <= currentStep
                    ? "bg-[#cb202d] text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`ml-1 sm:ml-2 text-[10px] sm:text-sm font-medium ${
                  index + 1 <= currentStep ? "text-[#cb202d]" : "text-gray-500"
                }`}
              >
                {step}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`w-4 sm:w-8 h-0.5 ml-1 sm:ml-4 ${
                    index + 1 < currentStep ? "bg-[#cb202d]" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Partner with Us";
      case 2:
        return "Restaurant Details";
      case 3:
        return "Account Security";
      case 4:
        return "Add Profile Image";
      case 5:
        return "Complete Registration";
      default:
        return "Registration";
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-[#ffde59] via-[#ffd700] to-[#ffc800] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-[#ffc700] rounded-full opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-[#cb202d] rounded-full opacity-20 transform translate-x-1/2 translate-y-1/2"></div>

      <div className="bg-white  bg-opacity-95 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-md sm:max-w-2xl p-6 sm:p-10 relative z-10 transform hover:scale-[1.02] sm:hover:scale-105 transition-transform duration-300">
        {renderStepIndicator()}

        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#cb202d] tracking-tight">
            {getStepTitle()}
          </h2>
          <p className="text-gray-600 mt-2 text-base sm:text-lg font-light">
            {currentStep === 1
              ? "Elevate your restaurant's reach with our premium platform"
              : currentStep === 5
              ? "You're one step away from joining our platform"
              : `Step ${currentStep} of 5`}
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {currentStep === 1 && (
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-800 mb-2"
                >
                  Restaurant Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your restaurant's name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 sm:px-5 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#ffd700]/50 focus:border-[#cb202d] placeholder-gray-400 text-gray-800 transition-all duration-300"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-800 mb-2"
                  >
                    Business Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="restaurant@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 sm:px-5 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#ffd700]/50 focus:border-[#cb202d] placeholder-gray-400 text-gray-800 transition-all duration-300"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-800 mb-2"
                  >
                    Contact Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="+1 (123) 456-7890"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 sm:px-5 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#ffd700]/50 focus:border-[#cb202d] placeholder-gray-400 text-gray-800 transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label
                  htmlFor="cuisineType"
                  className="block text-sm font-semibold text-gray-800 mb-2"
                >
                  Cuisine Type
                </label>
                <select
                  id="cuisineType"
                  name="cuisineType"
                  value={formData.cuisineType}
                  onChange={handleChange}
                  className="w-full px-4 sm:px-5 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#ffd700]/50 focus:border-[#cb202d] text-gray-800 transition-all duration-300"
                >
                  <option value="" disabled>
                    Select Cuisine Type
                  </option>
                  <option value="Italian">Italian</option>
                  <option value="Mexican">Mexican</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Indian">Indian</option>
                  <option value="American">American</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-gray-800 mb-2"
                >
                  Restaurant Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Describe your restaurant (e.g., ambiance, specialties)"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 sm:px-5 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#ffd700]/50 focus:border-[#cb202d] placeholder-gray-400 text-gray-800 transition-all duration-300 resize-y min-h-[80px] sm:min-h-[100px]"
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-800 mb-2"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 sm:px-5 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#ffd700]/50 focus:border-[#cb202d] placeholder-gray-400 text-gray-800 transition-all duration-300"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Minimum 8 characters
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="confirmPass"
                    className="block text-sm font-semibold text-gray-800 mb-2"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirmPass"
                    type="password"
                    name="confirmPass"
                    placeholder="••••••••"
                    value={formData.confirmPass}
                    onChange={handleChange}
                    className="w-full px-4 sm:px-5 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#ffd700]/50 focus:border-[#cb202d] placeholder-gray-400 text-gray-800 transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <label htmlFor="profileImage">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-xl bg-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden shadow-inner cursor-pointer hover:border-[#cb202d] transition-all duration-300">
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Restaurant preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center p-4">
                          <svg
                            className="w-12 h-12 mx-auto text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="mt-2 text-sm text-gray-500 font-medium">
                            Click to upload
                          </p>
                        </div>
                      )}
                    </div>
                  </label>

                  {previewImage && (
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("profileImage").click()
                      }
                      className="absolute bottom-4 right-4 bg-white text-[#cb202d] px-3 py-1 rounded-full text-xs font-semibold shadow-md hover:bg-gray-50 transition-all duration-200 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                      </svg>
                      Change
                    </button>
                  )}

                  <input
                    id="profileImage"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>

                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    {previewImage
                      ? "Great! Your restaurant image is ready."
                      : "Upload a high-quality image of your restaurant"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    JPEG or PNG, max 5MB
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="text-center space-y-4 sm:space-y-6">
              <div className="w-16 sm:w-20 h-16 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 sm:w-10 h-8 sm:h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                Ready to Go Live!
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Review your information and complete the registration process.
              </p>
              <div className="bg-gray-50 rounded-xl p-4 sm:p-6 text-left space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-16 w-16 sm:h-20 sm:w-20 rounded-lg overflow-hidden bg-gray-200">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Restaurant"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-gray-400">
                        <svg
                          className="h-8 w-8"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-800">
                      {formData.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {formData.cuisineType}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.email}
                    </p>
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Description:</span>{" "}
                    {formData.description || "Not provided"}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-4 sm:pt-6">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 bg-gray-100 text-gray-700 py-2 sm:py-3 rounded-xl font-semibold text-base sm:text-lg hover:bg-gray-200 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300/50"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={handleContinue}
              className={`flex-1 bg-gradient-to-r from-[#cb202d] to-[#e53e3e] text-white py-2 sm:py-3 rounded-xl font-semibold text-base sm:text-lg hover:bg-gradient-to-r hover:from-[#e53e3e] hover:to-[#cb202d] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#ffd700]/50 shadow-lg ${
                currentStep === 4 && !previewImage
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={currentStep === 4 && !previewImage}
            >
              {currentStep === 5 ? "Complete Registration" : "Continue"}
            </button>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-xs sm:text-sm text-gray-600 font-light">
            Already a partner?{" "}
            <a
              href="/restaurent/login"
              className="font-semibold text-[#cb202d] hover:text-[#e53e3e] transition-colors duration-200"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RestaurantRegistration;
