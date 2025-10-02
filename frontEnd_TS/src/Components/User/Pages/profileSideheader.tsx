import { User } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";

function ProfileSideheader() {
  const user = useSelector((state: RootState) => state.user.name);
  const userEmail = useSelector((state: RootState) => state.user.email);

  const navigate = useNavigate();

  const ChangePassword = () => {
    navigate("/user/change_password");
  };
  return (
    <>
      <div className="bg-gradient-to-br from-[#cb202d] to-[#a01825] p-6 sm:p-8 text-white">
        <div className="text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-4 flex items-center justify-center border border-white/30">
            <User size={32} className="text-white sm:w-10 sm:h-10" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold mb-1">
            {user || "User"}
          </h3>
          <p className="text-red-100 text-sm">
            {userEmail || "user@example.com"}
          </p>

          <div className="flex flex-col gap-2 mt-3">
            <button className="text-sm text-white/90 hover:text-white border border-white/30 hover:border-white/50 px-4 py-1.5 rounded-full transition-all duration-200">
              Edit Profile
            </button>
            <button
              onClick={ChangePassword}
              className="text-sm text-white/90 hover:text-white border border-white/30 hover:border-white/50 px-4 py-1.5 rounded-full transition-all duration-200"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileSideheader;
