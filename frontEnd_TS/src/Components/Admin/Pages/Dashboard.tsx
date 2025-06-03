import SideNav from "../SideNav";

function Dashboard() {
  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
        <SideNav />

        <div className="flex-1 p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-[#00b074]">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Welcome to your administration panel
            </p>
          </header>

          {/* Dashboard Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
              <p className="text-2xl font-bold mt-2">1,248</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-gray-500 text-sm font-medium">
                Active Restaurants
              </h3>
              <p className="text-2xl font-bold mt-2">84</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-gray-500 text-sm font-medium">
                Delivery Partners
              </h3>
              <p className="text-2xl font-bold mt-2">156</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-gray-500 text-sm font-medium">
                Pending Orders
              </h3>
              <p className="text-2xl font-bold mt-2">23</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
