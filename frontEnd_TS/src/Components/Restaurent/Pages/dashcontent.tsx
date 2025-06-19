



function  DashContent () {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Top Navigation */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center">
          <button className="md:hidden text-gray-500 focus:outline-none">
            <i className="fas fa-bars"></i>
          </button>
          <h1 className="text-xl font-semibold text-gray-800 ml-4">Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 focus:outline-none">
            <i className="fas fa-bell"></i>
          </button>
          <button className="text-gray-500 focus:outline-none">
            <i className="fas fa-envelope"></i>
          </button>
          <div className="relative">
            <button className="flex items-center focus:outline-none">
              <img
                className="w-8 h-8 rounded-full"
                src="https://randomuser.me/api/portraits/women/11.jpg"
                alt="User"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Repeat for each card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <i className="fas fa-bed text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                <p className="text-2xl font-semibold text-gray-800">120</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <i className="fas fa-calendar-check text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Delivered</p>
                <p className="text-2xl font-semibold text-gray-800">84</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <i className="fas fa-calendar-day text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Cancelled</p>
                <p className="text-2xl font-semibold text-gray-800">12</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <i className="fas fa-calendar-times text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-800">8000</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Bookings and Room Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Recent Bookings */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Recent Bookings</h2>
            </div>
            <div className="overflow-x-auto">
              {/* Table */}
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  {/* <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-out</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr> */}
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Add rows as needed — only sample rows included here */}
                  {/* Each row includes image, name, room info, dates, status */}
                  {/* You can map from data array here if desired */}
                </tbody>
              </table>
            </div>
          </div>

          {/* Room Status */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Room Status</h2>
            </div>
            <div className="p-6">
           
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Occupied</span>
                  <span className="text-sm font-medium text-gray-700">70%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "70%" }}></div>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Available</span>
                  <span className="text-sm font-medium text-gray-700">30%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "30%" }}></div>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Maintenance</span>
                  <span className="text-sm font-medium text-gray-700">5%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-red-600 h-2.5 rounded-full" style={{ width: "5%" }}></div>
                </div>
              </div>

          
              <div className="mt-6">
                <h3 className="text-md font-medium text-gray-800 mb-3">Room Types</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Standard</span>
                    <span className="text-sm font-medium">40 rooms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Deluxe</span>
                    <span className="text-sm font-medium">35 rooms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Executive</span>
                    <span className="text-sm font-medium">25 rooms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Suite</span>
                    <span className="text-sm font-medium">20 rooms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Customer Reviews</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           
            <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mb-2">
                <i className="fas fa-plus text-lg"></i>
              </div>
              <span className="text-sm font-medium text-gray-700">New Booking</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-200 transition">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mb-2">
                <i className="fas fa-user-check text-lg"></i>
              </div>
              <span className="text-sm font-medium text-gray-700">Check In</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-yellow-50 hover:border-yellow-200 transition">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mb-2">
                <i className="fas fa-user-times text-lg"></i>
              </div>
              <span className="text-sm font-medium text-gray-700">Check Out</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-200 transition">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 mb-2">
                <i className="fas fa-bell text-lg"></i>
              </div>
              <span className="text-sm font-medium text-gray-700">Requests</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashContent;
