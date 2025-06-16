import Table from "../table";
import SideNav from "../SideNav";
import { useEffect, useState } from "react";

import { admin_apirequest } from "../../../utils/Api_helper/adminApihelper";

interface Restaurent {
  _id?: string;
  restaurentId?: string;
  name?: string;
  email?: string;
  mobile?: string;
  description?: string;
  cusineType?: string;
  isActive?: boolean;
  adminVerified?: boolean;
  createdAt?: Date;
}

function Restaurants() {
  const [restaurents, setRestaurents] = useState<Restaurent[]>([]);

  const getRestaurents = async () => {
    const response = await admin_apirequest("/restaurents", "GET");
    console.log(response);

    setRestaurents(response);
  };

  useEffect(() => {
    getRestaurents();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Side Navigation - fixed width */}
      <div className="w-64 fixed h-full bg-white shadow-md">
        <SideNav />
      </div>

      {/* Main Content - offset by the width of the SideNav */}
      <div className="flex-1 ml-64 p-8 overflow-x-hidden">
        <h1 className="text-2xl font-bold mb-6">Restaurants Management</h1>
        <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
          <Table restaurents={restaurents} />
        </div>
      </div>
    </div>
  );
}

export default Restaurants;
