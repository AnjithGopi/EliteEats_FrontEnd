
// import { Link } from "react-router-dom"

// function NavBar() {
//   return (
//     <>

//      <nav className="bg-white shadow-md">
//       <div className="max-w-6xl mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
       
//           <Link to="/user/home" className="text-xl font-bold text-[#cb202d]">
//             EliteEats
//           </Link>

          
//           <div className="hidden md:flex space-x-8">
//             <Link 
//               to="/user/home" 
//               className="text-gray-700 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
//             >
//               Home
//             </Link>
//             <Link 
//               to="/menu" 
//               className="text-gray-700 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
//             >
//               Browse Menu
//             </Link>
//             <Link 
//               to="/restaurants" 
//               className="text-gray-700 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
//             >
//               Restaurants
//             </Link>
//             <Link 
//               to="/track-order" 
//               className="text-gray-700 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
//             >
//               Track Order
//             </Link>
//           </div>

        
//           <Link 
//             to="/user/login" 
//             className="bg-[#cb202d] hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300"
//           >
//             Login
//           </Link>

       
//           <button className="md:hidden flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-500 focus:outline-none">
//             <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
//         </div>
//       </div>

     
//       <div className="md:hidden hidden">
//         <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//           <Link 
//             to="/user/home" 
//             className="text-gray-700 hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium"
//           >
//             Home
//           </Link>
//           <Link 
//             to="/menu" 
//             className="text-gray-700 hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium"
//           >
//             Browse Menu
//           </Link>
//           <Link 
//             to="/restaurants" 
//             className="text-gray-700 hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium"
//           >
//             Restaurants
//           </Link>
//           <Link 
//             to="/track-order" 
//             className="text-gray-700 hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium"
//           >
//             Track Order
//           </Link>
//           <Link 
//             to="/login" 
//             className="bg-red-500 hover:bg-red-600 text-white block px-3 py-2 rounded-md text-base font-medium text-center"
//           >
//             Login
//           </Link>
//         </div>
//       </div>
//     </nav>


//     </>
//   )
// }

// export default NavBar

"use client"

import { Link } from "react-router-dom"
import { useState } from "react"

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to="/user/home"
              className="text-xl font-bold bg-gradient-to-r from-[#cb202d] to-[#e63946] bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
            >
              EliteEats
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1">
              <Link
                to="/user/home"
                className="text-gray-700 hover:text-[#cb202d] hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group"
              >
                Home
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#cb202d] group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
              </Link>
              <Link
                to="/menu"
                className="text-gray-700 hover:text-[#cb202d] hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group"
              >
                Browse Menu
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#cb202d] group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
              </Link>
              <Link
                to="/restaurants"
                className="text-gray-700 hover:text-[#cb202d] hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group"
              >
                Restaurants
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#cb202d] group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
              </Link>
              <Link
                to="/track-order"
                className="text-gray-700 hover:text-[#cb202d] hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group"
              >
                Track Order
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#cb202d] group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
              </Link>
            </div>

            {/* Login Button */}
            <Link
              to="/user/login"
              className="bg-gradient-to-r from-[#cb202d] to-[#e63946] hover:from-[#a01a26] hover:to-[#cb202d] text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Login
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-[#cb202d] hover:bg-red-50 focus:outline-none transition-all duration-200"
            >
              <svg
                className={`h-6 w-6 transform transition-transform duration-200 ${isMenuOpen ? "rotate-90" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
        >
          <div className="px-4 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md border-t border-gray-100">
            <Link
              to="/user/home"
              className="text-gray-700 hover:text-[#cb202d] hover:bg-red-50 block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className="text-gray-700 hover:text-[#cb202d] hover:bg-red-50 block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Menu
            </Link>
            <Link
              to="/restaurants"
              className="text-gray-700 hover:text-[#cb202d] hover:bg-red-50 block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Restaurants
            </Link>
            <Link
              to="/track-order"
              className="text-gray-700 hover:text-[#cb202d] hover:bg-red-50 block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Track Order
            </Link>
            <Link
              to="/login"
              className="bg-gradient-to-r from-[#cb202d] to-[#e63946] hover:from-[#a01a26] hover:to-[#cb202d] text-white block px-4 py-3 rounded-lg text-base font-medium text-center transition-all duration-200 shadow-md mt-2"
              onClick={() => setIsMenuOpen(false)}
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

