
import { Link } from "react-router-dom"

function NavBar() {
  return (
    <>

     <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
       
          <Link to="/user/home" className="text-xl font-bold text-[#cb202d]">
            EliteEats
          </Link>

          
          <div className="hidden md:flex space-x-8">
            <Link 
              to="/user/home" 
              className="text-gray-700 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Home
            </Link>
            <Link 
              to="/menu" 
              className="text-gray-700 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Browse Menu
            </Link>
            <Link 
              to="/restaurants" 
              className="text-gray-700 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Restaurants
            </Link>
            <Link 
              to="/track-order" 
              className="text-gray-700 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Track Order
            </Link>
          </div>

        
          <Link 
            to="/user/login" 
            className="bg-[#cb202d] hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300"
          >
            Login
          </Link>

       
          <button className="md:hidden flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-500 focus:outline-none">
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

     
      <div className="md:hidden hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            to="/user/home" 
            className="text-gray-700 hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link 
            to="/menu" 
            className="text-gray-700 hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium"
          >
            Browse Menu
          </Link>
          <Link 
            to="/restaurants" 
            className="text-gray-700 hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium"
          >
            Restaurants
          </Link>
          <Link 
            to="/track-order" 
            className="text-gray-700 hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium"
          >
            Track Order
          </Link>
          <Link 
            to="/login" 
            className="bg-red-500 hover:bg-red-600 text-white block px-3 py-2 rounded-md text-base font-medium text-center"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>


    </>
  )
}

export default NavBar
