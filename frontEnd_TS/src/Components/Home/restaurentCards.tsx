

interface Hotel {
  _id:string;
  image: string;
  name: string;
  rating?: number;
  location?: string;
  price?: string;
  cuisineType?: string;
}

function SwipeCards({ hotels }: { hotels: Hotel[] }) {
  return (
    <div className="mb-12 px-4">
      <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
        {hotels.map((hotel) => (
          <div 
            key={hotel._id} 
            className="flex-none w-72 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
              {/* Image with aspect ratio container */}
              <div className="relative pt-[70%] bg-gray-100">
                <img
                  // src={hotel.image || 'https://via.placeholder.com/400x300?text=Hotel+Image'}
                  alt={hotel.name}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  // onError={(e) => {
                  //   (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Hotel+Image';
                  // }}
                />
              </div>
              
              {/* Card Content */}
              <div className="p-5 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-2 min-h-[3rem]">
                    {hotel.name}
                  </h3>
                  {hotel.rating && (
                    <div className="flex items-center bg-[#cb202d] text-white px-2 py-1 rounded-md flex-shrink-0 ml-2">
                      <span className="text-sm font-semibold">{hotel.rating}</span>
                      <svg className="w-3 h-3 ml-1 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    </div>
                  )}
                </div>

                {hotel.cuisineType && (
                  <span className="inline-block bg-[#ffd700] bg-opacity-20 text-[#cb202d] text-xs font-semibold px-2 py-1 rounded-full mb-2 self-start">
                    {hotel.cuisineType}
                  </span>
                )}

                {/* {hotel.location && (
                  <p className="text-gray-600 text-sm mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <span className="line-clamp-1">{hotel.location}</span>
                  </p>
                )} */}

                <div className="mt-auto pt-3 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    {hotel.price && (
                      <span className="text-lg font-bold text-[#cb202d]">
                        {hotel.price}
                      </span>
                    )}
                    <button 
                      className="text-white bg-[#cb202d] hover:bg-[#e53e3e] transition-colors duration-200 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center"
                      aria-label={`View details for ${hotel.name}`}
                    >
                      View
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SwipeCards;