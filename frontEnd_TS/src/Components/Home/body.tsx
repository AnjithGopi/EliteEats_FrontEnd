function Body() {
  return (
    <div className="w-full min-h-170  bg-gradient-to-r from-[#cb202d] via-[#cb202d] to-[#FFD700] flex items-center">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-8 lg:pl-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight">
                Feast Your Senses,
              </h1>
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#FFD700] font-bold leading-tight">
                Fast & Fresh
              </h1>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <input
                className="w-full h-14 bg-white rounded-full pl-6 pr-32 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                type="text"
                placeholder="Search for restaurants"
              />
              <button className="absolute right-1 top-1 w-32 h-12 bg-yellow-500 hover:bg-yellow-600 rounded-full text-white text-lg font-bold transition-colors">
                Search
              </button>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative lg:h-[600px] flex items-center justify-center">
            {/* Woman Image */}
            {/* <div className="-mr mt-20 relative z-10">
              <img
                src="/GirlPizza.png"
                alt="Woman with food"
                width={500}
                height={600}
                className="object-contain"
              />
            </div> */}
            <div className="mt-3 -ml-80 relative z-10 flex">
              <img
                src="/GirlPizza.png"
                alt="Woman with food"
                width={1000}
                height={1100}
                className="object-contain"
              />
            </div>

            {/* Notification Cards */}
            <div className="mt-26 absolute right-4 lg:right-8 top-8 space-y-4 z-20">
              <div className="bg-white rounded-2xl p-4 shadow-lg min-w-[200px] animate-pulse">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-800">
                    We've Received your order!
                  </span>
                  <span className="text-xs text-gray-500">now</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-lg min-w-[200px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-800">
                      Order Accepted!
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">now</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-lg min-w-[200px]">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-800">
                    Your rider is nearby :)
                  </span>
                  <span className="text-xs text-gray-500">now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
