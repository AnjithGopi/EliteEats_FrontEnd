



function  Sidebar(){
  return (
   
    <div className="h-full hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 bg-blue-800 text-white">
        <div className="flex items-center justify-center h-16 px-4 bg-blue-900">
          <span className="text-xl font-semibold">Hotel Admin</span>
        </div>
        <div className="flex flex-col flex-grow px-4 py-4 overflow-y-auto">
          <nav className="flex-1 space-y-2">
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm font-medium rounded-md bg-blue-700 text-white"
            >
              <i className="fas fa-tachometer-alt mr-3"></i>
              Dashboard
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-blue-700 text-white"
            >
              <i className="fas fa-calendar-check mr-3"></i>
              Orders
            </a>
            <a
              href="/restaurent/menu"
              className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-blue-700 text-white"
            >
              <i className="fas fa-bed mr-3"></i>
              Menu
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-blue-700 text-white"
            >
              <i className="fas fa-users mr-3"></i>
              Add items
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-blue-700 text-white"
            >
              <i className="fas fa-concierge-bell mr-3"></i>
              Reviews
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-blue-700 text-white"
            >
              <i className="fas fa-chart-bar mr-3"></i>
              Reports
            </a>
           
          </nav>
        </div>
        <div className="p-4 border-t border-blue-700">
          <div className="flex items-center">
            <img
              className="w-10 h-10 rounded-full"
              src="https://randomuser.me/api/portraits/women/11.jpg"
              alt="User"
            />
            <div className="ml-3">
              <p className="text-sm font-medium">Sarah Johnson</p>
              <p className="text-xs text-blue-200">Admin</p>
               <a
              href="#"
              className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-blue-700 text-white"
            >
              <i className="fas fa-concierge-bell mr-3"></i>
              Logout
            </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
