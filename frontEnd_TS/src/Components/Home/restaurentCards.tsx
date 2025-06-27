interface Hotel {
  _id?: string;
  displayPicture?: string;
  name?: string;
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
              <div className="relative pt-[70%] bg-gray-100">
                <img
                  src={hotel.displayPicture}
                  alt={hotel.name}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>

              <div className="p-5 flex-grow flex flex-col">
                <div className="flex justify-center items-start mb-2">
                  <h3 className="text-xl font-bold text-red-500 line-clamp-2 min-h-[3rem]">
                    {hotel.name}
                  </h3>
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
