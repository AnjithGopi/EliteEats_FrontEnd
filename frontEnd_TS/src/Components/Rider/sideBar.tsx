import { useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  HiHome, 
  HiBriefcase, 
  HiChartBar, 
  HiCog, 
  HiQuestionMarkCircle, 
  HiLogout 
} from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import type { RootState } from '../../redux/store';

const DeliveryPartnerNavbar = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();
  const deliveryPartnerName = useSelector((state: RootState) => state.riderSlice.name);

  const handleLogout = () => {
    // Handle logout logic
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-screen bg-white shadow-lg w-64">
      {/* Logo */}
      <div className="flex items-center p-4 border-b">
        <div className="w-8 h-8 rounded-full bg-[#cb202d] flex items-center justify-center text-white font-bold">DP</div>
        <span className="ml-2 font-semibold text-gray-800">{deliveryPartnerName}</span>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          <li>
            <Link
              to="/delivery-partner/dashboard"
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-[#cb202d] text-white' : 'text-gray-700 hover:bg-[#feecec] hover:text-[#cb202d]'}`}
            >
              <HiHome className={`w-5 h-5 ${activeTab === 'dashboard' ? 'text-white' : 'text-[#cb202d]'}`} />
              <span className="ml-3">Dashboard</span>
            </Link>
          </li>
          
          <li>
            <Link
              to="/rider/verify_Profile"
              onClick={() => setActiveTab('verify Profile')}
              className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'verify Profile' ? 'bg-[#cb202d] text-white' : 'text-gray-700 hover:bg-[#feecec] hover:text-[#cb202d]'}`}
            >
              <HiCog className={`w-5 h-5 ${activeTab === 'verify Profile' ? 'text-white' : 'text-[#cb202d]'}`} />
              <span className="ml-3">Verify My Profile</span>
            </Link>
          </li>
          
          <li>
            <Link
              to="/delivery-partner/deliveries"
              onClick={() => setActiveTab('deliveries')}
              className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'deliveries' ? 'bg-[#cb202d] text-white' : 'text-gray-700 hover:bg-[#feecec] hover:text-[#cb202d]'}`}
            >
              <HiBriefcase className={`w-5 h-5 ${activeTab === 'deliveries' ? 'text-white' : 'text-[#cb202d]'}`} />
              <span className="ml-3">My Deliveries</span>
            </Link>
          </li>
          
          <li>
            <Link
              to="/delivery-partner/performance"
              onClick={() => setActiveTab('performance')}
              className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'performance' ? 'bg-[#cb202d] text-white' : 'text-gray-700 hover:bg-[#feecec] hover:text-[#cb202d]'}`}
            >
              <HiChartBar className={`w-5 h-5 ${activeTab === 'performance' ? 'text-white' : 'text-[#cb202d]'}`} />
              <span className="ml-3">Performance</span>
            </Link>
          </li>
          
          <li>
            <Link
              to="/delivery-partner/settings"
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-[#cb202d] text-white' : 'text-gray-700 hover:bg-[#feecec] hover:text-[#cb202d]'}`}
            >
              <HiCog className={`w-5 h-5 ${activeTab === 'settings' ? 'text-white' : 'text-[#cb202d]'}`} />
              <span className="ml-3">Settings</span>
            </Link>
          </li>
          
          <li>
            <Link
              to="/delivery-partner/help"
              onClick={() => setActiveTab('help')}
              className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeTab === 'help' ? 'bg-[#cb202d] text-white' : 'text-gray-700 hover:bg-[#feecec] hover:text-[#cb202d]'}`}
            >
              <HiQuestionMarkCircle className={`w-5 h-5 ${activeTab === 'help' ? 'text-white' : 'text-[#cb202d]'}`} />
              <span className="ml-3">Help Center</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center p-3 rounded-lg text-gray-700 hover:bg-[#feecec] hover:text-[#cb202d] transition-colors"
        >
          <HiLogout className="w-5 h-5 text-[#cb202d]" />
          <span className="ml-3">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default DeliveryPartnerNavbar;