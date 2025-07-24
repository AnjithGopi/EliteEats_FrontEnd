import {
  Truck,
  Shield,
  ChefHat,
  Star,
  Clock,
  MapPin,
  Award,
  Users,
} from "lucide-react";

const RestaurantHero = ({ restaurentState }) => {
  return (
    <div className="relative h-[600px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={restaurentState.displayPicture}
          alt={`${restaurentState.name} restaurant interior`}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full blur-2xl animate-pulse delay-500"></div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8 h-full flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Restaurant Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <Award className="w-4 h-4 text-yellow-400" />
              <span className="text-white font-medium text-sm">
                Premium Restaurant
              </span>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-6xl lg:text-7xl font-bold text-white leading-tight">
                {restaurentState.name}
              </h1>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-amber-400" />
                <span className="text-2xl text-amber-400 font-light">
                  Mumbai
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xl text-gray-200 leading-relaxed max-w-lg">
              {restaurentState.description}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-md px-4 py-3 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                <Truck className="w-5 h-5 text-emerald-400" />
                <span className="text-white font-medium">
                  Free Delivery 15-20 min
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-md px-4 py-3 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                <Shield className="w-5 h-5 text-blue-400" />
                <span className="text-white font-medium">
                  100% Satisfaction
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-md px-4 py-3 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                <ChefHat className="w-5 h-5 text-amber-400" />
                <span className="text-white font-medium">
                  Master Chef Creations
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button className="bg-gradient-to-r from-[#cb202d] to-[#d33b47] hover:from-[#cb202d] hover:to-[#e04a56] text-white font-bold py-4 px-8 rounded-xl shadow-2xl hover:shadow-[#cb202d]/25 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                Order Now
              </button>
            </div>
          </div>

          {/* Right Content - Stats Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 max-w-xs w-full transform hover:scale-[1.03] transition-transform duration-300">
  <div className="text-center space-y-4">
    {/* Rating */}
    <div>
      <div className="text-4xl font-bold text-gray-800 mb-1">
        4.8
      </div>
      <div className="flex items-center justify-center mb-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-5 h-5 text-amber-400 fill-current"
          />
        ))}
      </div>
      <p className="text-gray-600 text-sm font-medium">3,124 reviews</p>
    </div>

    {/* Divider */}
    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

    {/* Info Grid */}
    <div className="grid grid-cols-2 gap-3">
      <div className="text-center p-2 bg-gray-50 rounded-lg">
        <Clock className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
        <span className="text-gray-800 text-sm font-semibold block">
          15-20 min
        </span>
        <span className="text-gray-500 text-xs">Delivery</span>
      </div>
      <div className="text-center p-2 bg-gray-50 rounded-lg">
        <MapPin className="w-5 h-5 text-blue-500 mx-auto mb-1" />
        <span className="text-gray-800 text-sm font-semibold block">
          3.2 km
        </span>
        <span className="text-gray-500 text-xs">Distance</span>
      </div>
    </div>

    {/* Additional Stats */}
    <div className="pt-2 border-t border-gray-200">
      <div className="flex items-center justify-center space-x-3 text-xs">
        <div className="flex items-center space-x-1">
          <Users className="w-3 h-3 text-purple-500" />
          <span className="text-gray-600 font-medium">
            1.2k+ Orders
          </span>
        </div>
        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
        <div className="flex items-center space-x-1">
          <Award className="w-3 h-3 text-yellow-500" />
          <span className="text-gray-600 font-medium">Premium</span>
        </div>
      </div>
    </div>
  </div>
</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHero;
