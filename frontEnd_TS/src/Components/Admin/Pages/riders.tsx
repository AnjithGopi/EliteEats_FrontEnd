// import SideNav from "../SideNav";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { API_BASE_URL } from "../../../Constants/api";

// import { getRiders } from "../../../services/adminServices/login";
// import { viewUserDetails } from "../../../services/adminServices/login";
// import { verifyUser } from "../../../services/adminServices/login";
// import { useNavigate } from "react-router-dom";
// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   mobile: string;
//   isActive?: boolean;
//   isVerified?: boolean;

//   createdAt?: Date;
// }

// type UserAction = "block" | "unblock";

// function Riders() {
//   const [users, setUsers] = useState<User[]>([]);

//   const [searchitem, setSearchItem] = useState("");
//   const [suggestion, setSuggestion] = useState<User[]>([]);
//   const [rider, setRider] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await getRiders();
//         console.log(response);
//         setUsers(response);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     console.log(searchitem);
//     makeSuggestion(searchitem);
//     console.log(suggestion);
//   }, [searchitem]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchItem(e.target.value);
//     // console.log(searchitem);
//   };

//   const makeSuggestion = (term: string) => {
//     const filtered = users.filter(
//       (item) => item.email.toLowerCase() === term.toLowerCase()
//     );

//     setSuggestion(filtered);
//     console.log("suggestions:", filtered);
//   };

//   let userId = "";

//   if (suggestion.length > 0) {
//     userId = suggestion[0]._id;
//     console.log("userId:", userId);
//   }
//   const handleSearch = () => {
//     try {
//       axios
//         .get(`${API_BASE_URL}/admin/users/${userId}`)
//         .then((response) => {
//           console.log(response.data);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleAction = async (action: UserAction, user: string) => {
//     try {
//       if (action === "block") {
//         alert("Cant block rider ");
//       } else if (action === "unblock") {
//         alert("unblock error");
//       } else if (action === "view") {
//         const response = await viewUserDetails(user);
//         console.log(response);
//         setRider(response);
//         setIsModalOpen(true);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleVerifyRider = async (id: string) => {
//     const response = await verifyUser(id);
//     console.log(response);
//     if (response) {
//       alert(response.message);
//       navigate("/admin/deliveryPartners");
//     } else {
//       alert("Something went wrong");
//     }
//   };


//   const handleRejection=async(id:string)=>{

//     console.log("rejection worked")
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <SideNav />

//       {isModalOpen && rider && (
//         <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-bold text-gray-800">Rider Details</h3>
//               <button
//                 onClick={closeModal}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </div>
//             <div className="space-y-4">
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Name</p>
//                 <p className="mt-1 text-sm text-gray-900">{rider.name}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Email</p>
//                 <p className="mt-1 text-sm text-gray-900">{rider.email}</p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Phone</p>
//                 <p className="mt-1 text-sm text-gray-900">
//                   {rider.mobile || "N/A"}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Status</p>
//                 <p className="mt-1 text-sm text-gray-900">
//                   {rider.isActive ? (
//                     <span className="px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full bg-green-100 text-green-800">
//                       Active
//                     </span>
//                   ) : (
//                     <span className="px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full bg-red-100 text-red-800">
//                       Pending
//                     </span>
//                   )}
//                 </p>
//               </div>
//               {rider.createdAt && (
//                 <div>
//                   <p className="text-sm font-medium text-gray-500">
//                     Joined Date
//                   </p>
//                   <p className="mt-1 text-sm text-gray-900">
//                     {new Date(rider.createdAt).toLocaleDateString()}
//                   </p>
//                 </div>
//               )}
//               {/* License Image Section */}
//               {rider.license && (
//                 <div>
//                   <p className="text-sm font-medium text-gray-500">License</p>
//                   <div className="mt-2">
//                     <img
//                       src={rider.license}
//                       alt="Rider License"
//                       className="w-full h-auto rounded border border-gray-200"
//                       onError={(e) => {
//                         e.currentTarget.src =
//                           "https://via.placeholder.com/300x150?text=License+Not+Available";
//                       }}
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>
//             <div className="mt-6 flex justify-end space-x-3">
//               <button
//                 onClick={closeModal}
//                 className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-200"
//               >
//                 Close
//               </button>
//               <button
//                 onClick={() => handleVerifyRider(rider._id)}
//                 className="px-4 py-2 bg-[#00b074] text-white rounded-md hover:bg-[#009161] transition duration-200 cursor-pointer"
//               >
//                 Verify Rider
//               </button>

//               <button
//                 onClick={() => handleRejection(rider._id)}
//                 className="px-4 py-2 bg-[#00b074] text-white rounded-md hover:bg-[#009161] transition duration-200 cursor-pointer"
//               >
//                 Reject Application
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="flex-1 p-8">
//         <header className="mb-8">
//           <h1 className="text-3xl font-bold text-[#00b074]">
//             Delivery Partners
//           </h1>
//           <p className="text-gray-600">
//             Manage all registered delivery partners{" "}
//           </p>
//         </header>

//         {/* Search and Filter Bar */}
//         <div className="mb-6 flex justify-between items-center">
//           {/* Search Bar with Button */}
//           <div className="relative w-full max-w-2xl flex">
//             <div className="relative flex-grow">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <svg
//                   className="h-5 w-5 text-gray-400"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//               <input
//                 type="text"
//                 onChange={handleChange}
//                 placeholder="Search with email..."
//                 className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-l-lg bg-white shadow-sm focus:outline-none  focus:border-transparent transition duration-200"
//               />
//             </div>
//             <button
//               onClick={handleSearch}
//               className="bg-[#00b074] text-white px-5 py-2.5 rounded-r-lg shadow-sm hover:bg-[#009161] transition duration-200 flex items-center justify-center"
//             >
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 />
//               </svg>
//               <span className="sr-only">Search</span>
//             </button>
//           </div>

//           {/* Filter Dropdown */}
//           <div className="flex space-x-3 ml-4">
//             <select className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00b074] focus:border-transparent bg-white shadow-sm hover:border-gray-400 transition duration-200">
//               <option>All Status</option>
//               <option>Active</option>
//               <option>Inactive</option>
//             </select>
//           </div>
//         </div>

//         {/* Customer Table */}
//         <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr className="bg-[#00b074]">
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
//                     Name
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
//                     Email
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
//                     Phone
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {users.map((customer) => (
//                   <tr
//                     key={customer._id}
//                     className="hover:bg-gray-50 transition duration-150"
//                   >
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
//                           <span className="text-gray-600 font-medium">
//                             {customer.name.charAt(0).toUpperCase()}
//                           </span>
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-gray-900">
//                             {customer.name}
//                           </div>
//                           <div className="text-xs text-gray-500">
//                             {" "}
//                             Joined{" "}
//                             {customer.createdAt
//                               ? new Date(
//                                   customer.createdAt
//                                 ).toLocaleDateString()
//                               : "N/A"}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {customer.email}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {customer.mobile || "N/A"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {customer.isVerified === true ? (
//                         <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                           Verified
//                         </span>
//                       ) : (
//                         <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
//                           Pending
//                         </span>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       <select
//                         value=""
//                         onChange={(e) =>
//                           handleAction(
//                             e.target.value as UserAction,
//                             customer._id
//                           )
//                         }
//                         className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b074] focus:border-transparent shadow-sm"
//                       >
//                         <option value="">Actions</option>
//                         {/* <option value="block">Block User</option>
//                         <option value="unblock">Unblock User</option> */}
//                         <option value="view">View Details</option>
//                       </select>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Premium Pagination */}
//           <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
//             <div className="flex-1 flex justify-between sm:hidden">
//               <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
//                 Previous
//               </button>
//               <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
//                 Next
//               </button>
//             </div>
//             <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//               <div>
//                 <p className="text-sm text-gray-700">
//                   Showing <span className="font-medium">1</span> to{" "}
//                   <span className="font-medium">10</span> of{" "}
//                   <span className="font-medium">20</span> customers
//                 </p>
//               </div>
//               <div>
//                 <nav
//                   className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
//                   aria-label="Pagination"
//                 >
//                   <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
//                     <span className="sr-only">Previous</span>
//                     <svg
//                       className="h-5 w-5"
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                       aria-hidden="true"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </button>
//                   <button
//                     aria-current="page"
//                     className="z-10 bg-[#00b074] border-[#00b074] text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium"
//                   >
//                     1
//                   </button>
//                   <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
//                     2
//                   </button>
//                   <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
//                     3
//                   </button>
//                   <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
//                     ...
//                   </span>
//                   <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
//                     8
//                   </button>
//                   <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
//                     <span className="sr-only">Next</span>
//                     <svg
//                       className="h-5 w-5"
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                       aria-hidden="true"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </button>
//                 </nav>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Riders;


import SideNav from "../SideNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../Constants/api";

import { getRiders } from "../../../services/adminServices/login";
import { viewUserDetails } from "../../../services/adminServices/login";
import { verifyUser } from "../../../services/adminServices/login";
import { rejectrider } from "../../../services/adminServices/login";
import { useNavigate } from "react-router-dom";

interface User {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  isActive?: boolean;
  isVerified?: boolean;
  createdAt?: Date;
  license?: string;
}



type UserAction = "block" | "unblock" | "view";

function Riders() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchitem, setSearchItem] = useState("");
  const [suggestion, setSuggestion] = useState<User[]>([]);
  const [rider, setRider] = useState<RiderDetails | null|unknown>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedRiderId, setSelectedRiderId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All Status");

  const navigate = useNavigate();
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await getRiders();
        console.log(response);
        setUsers(response);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    console.log(searchitem);
    makeSuggestion(searchitem);
    console.log(suggestion);
  }, [searchitem]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
  };

  const makeSuggestion = (term: string) => {
    const filtered = users.filter(
      (item) => item.email.toLowerCase() === term.toLowerCase()
    );
    setSuggestion(filtered);
    console.log("suggestions:", filtered);
  };

  let userId = "";

  if (suggestion.length > 0) {
    userId = suggestion[0]._id;
    console.log("userId:", userId);
  }

  const handleSearch = async () => {
    if (!userId) {
      alert("Please enter a valid email to search");
      return;
    }
    
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_BASE_URL}/admin/users/${userId}`);
      console.log("Search response:", response.data);
      
      // You can handle the search result here - maybe show in a modal or filter the table
      if (response.data) {
        // For now, just show an alert with the found user
        alert(`User found: ${response.data.name || 'User'}`);
      }
    } catch (error) {
      console.error("Search error:", error);
      alert("User not found or search failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = async (action: UserAction, user: string) => {
    try {
      if (action === "block") {
        alert("Block functionality not implemented yet");
      } else if (action === "unblock") {
        alert("Unblock functionality not implemented yet");
      } else if (action === "view") {
        setIsLoading(true);
        const response = await viewUserDetails(user);
        console.log("User details response:", response);
        setRider(response);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error in handleAction:", error);
      alert("An error occurred while performing the action. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleVerifyRider = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await verifyUser(id);
      console.log("Verify response:", response);
      
      if (response) {
        alert(response.message || "Rider verified successfully");
        
        // Close modal and refresh data
        setIsModalOpen(false);
        const updatedRiders = await getRiders();
        setUsers(updatedRiders);
        
        // Optional: Navigate to refresh the page
        // navigate("/admin/deliveryPartners");
      } else {
        alert("Failed to verify rider. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying rider:", error);
      alert("An error occurred while verifying the rider. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRejection = async (id: string) => {
    console.log("rejection worked for user with id :",id)

    const response=await rejectrider(id,rejectionReason)
    if(response){
      console.log(response)
      alert(response.message)
      navigate("/admin/deliveryPartners")
      closeModal()
    }
   
    setIsRejectModalOpen(false);
    setRejectionReason("");
    setSelectedRiderId("");
  };

  const openRejectModal = (riderId: string) => {
    setSelectedRiderId(riderId);
    setIsRejectModalOpen(true);
  };

  const closeRejectModal = () => {
    setIsRejectModalOpen(false);
    setRejectionReason("");
    setSelectedRiderId("");
  };

  const handleRejectSubmit = () => {
    if (rejectionReason.trim()) {
      handleRejection(selectedRiderId);
    }
  };

  // Filter users based on status
  const filteredUsers = users.filter(user => {
    if (statusFilter === "All Status") return true;
    if (statusFilter === "Verified") return user.isVerified === true;
    if (statusFilter === "Pending") return user.isVerified !== true;
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const getStatusBadge = (isVerified: boolean | undefined) => {
    if (isVerified === true) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2"></div>
          Verified
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
        <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2"></div>
        Pending
      </span>
    );
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <SideNav />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center space-x-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00b074]"></div>
              <span className="text-gray-700 font-medium">Processing...</span>
            </div>
          </div>
        </div>
      )}

      {/* Rider Details Modal */}
      {isModalOpen && rider && (
        <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-md p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white rounded-t-3xl border-b border-gray-100 px-8 py-6 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Rider Details</h3>
                <p className="text-gray-500 text-sm mt-1">Review and manage rider information</p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="px-8 py-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Full Name</label>
                  <p className="text-lg font-medium text-gray-900 bg-gray-50 px-4 py-3 rounded-xl">{rider.name}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Email Address</label>
                  <p className="text-lg font-medium text-gray-900 bg-gray-50 px-4 py-3 rounded-xl">{rider.email}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Phone Number</label>
                  <p className="text-lg font-medium text-gray-900 bg-gray-50 px-4 py-3 rounded-xl">{rider.mobile || "N/A"}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Account Status</label>
                  <div className="bg-gray-50 px-4 py-3 rounded-xl">
                    {getStatusBadge(rider.isVerified)}
                  </div>
                </div>
              </div>

              {rider.createdAt && (
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Registration Date</label>
                  <p className="text-lg font-medium text-gray-900 bg-gray-50 px-4 py-3 rounded-xl">
                    {new Date(rider.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              )}

              {rider.license && (
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">License Document</label>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <img
                      src={rider.license}
                      alt="Rider License"
                      className="w-full h-auto rounded-lg border-2 border-gray-200 shadow-sm"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/400x250?text=License+Document+Unavailable";
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-gray-50 rounded-b-3xl px-8 py-6 flex justify-end space-x-4 border-t border-gray-100">
              <button
                onClick={closeModal}
                className="px-6 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-100 transition-all duration-200 font-medium border border-gray-200 shadow-sm"
              >
                Close
              </button>
              <button
                onClick={() => openRejectModal(rider._id)}
                className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200 font-medium shadow-lg hover:shadow-red-500/25"
              >
                Reject Application
              </button>
              <button
                onClick={() => handleVerifyRider(rider._id)}
                className="px-6 py-3 bg-[#00b074] text-white rounded-xl hover:bg-[#009161] transition-all duration-200 font-medium shadow-lg hover:shadow-green-500/25"
              >
                Verify Rider
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-md p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md">
            <div className="px-8 py-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Reject Application</h3>
              <p className="text-gray-500 text-sm mt-1">Please provide a reason for rejection</p>
            </div>
            
            <div className="px-8 py-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-3">Rejection Reason</label>
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Enter the reason for rejecting this application..."
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none h-32 text-gray-700"
                    maxLength={500}
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-400">Be specific and professional</span>
                    <span className="text-xs text-gray-400">{rejectionReason.length}/500</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-b-3xl px-8 py-6 flex justify-end space-x-4">
              <button
                onClick={closeRejectModal}
                className="px-6 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-100 transition-all duration-200 font-medium border border-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectSubmit}
                disabled={!rejectionReason.trim()}
                className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200 font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 p-8">
        {/* Premium Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00b074] to-[#009161] bg-clip-text text-transparent">
                Delivery Partners
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Manage and verify delivery partner applications</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
                <div className="text-2xl font-bold text-[#00b074]">{users.length}</div>
                <div className="text-sm text-gray-600">Total Partners</div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
                <div className="text-2xl font-bold text-emerald-600">
                  {users.filter(u => u.isVerified === true).length}
                </div>
                <div className="text-sm text-gray-600">Verified</div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Search and Filter Bar */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Search Bar */}
              <div className="flex-1 max-w-2xl">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    onChange={handleChange}
                    placeholder="Search by email address..."
                    className="block w-full pl-12 pr-20 py-4 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#00b074] focus:border-transparent transition-all duration-200 text-gray-700"
                  />
                  <button
                    onClick={handleSearch}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <div className="bg-[#00b074] text-white px-4 py-2 rounded-lg hover:bg-[#009161] transition-colors duration-200 text-sm font-medium">
                      Search
                    </div>
                  </button>
                </div>
              </div>

              {/* Filter */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-600">Filter by:</span>
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00b074] focus:border-transparent bg-white shadow-sm hover:border-gray-300 transition-all duration-200"
                  >
                    <option>All Status</option>
                    <option>Verified</option>
                    <option>Pending</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-[#00b074] to-[#009161]">
                  <th className="px-8 py-6 text-left text-xs font-bold text-white uppercase tracking-wider">Partner</th>
                  <th className="px-8 py-6 text-left text-xs font-bold text-white uppercase tracking-wider">Contact</th>
                  <th className="px-8 py-6 text-left text-xs font-bold text-white uppercase tracking-wider">Status</th>
                  <th className="px-8 py-6 text-left text-xs font-bold text-white uppercase tracking-wider">Joined</th>
                  <th className="px-8 py-6 text-left text-xs font-bold text-white uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {currentUsers.map((customer, index) => (
                  <tr key={customer._id} className="hover:bg-gray-50 transition-all duration-200 group">
                    <td className="px-8 py-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12 bg-gradient-to-br from-[#00b074] to-[#009161] rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-lg">
                            {customer.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-lg font-semibold text-gray-900 group-hover:text-[#00b074] transition-colors">
                            {customer.name}
                          </div>
                          <div className="text-sm text-gray-500">ID: {customer._id.slice(-8)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-900">{customer.email}</div>
                        <div className="text-sm text-gray-500">{customer.mobile || "No phone provided"}</div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      {getStatusBadge(customer.isVerified)}
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-sm text-gray-900">
                        {customer.createdAt ? new Date(customer.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        }) : "N/A"}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <select
                        value=""
                        onChange={(e) => handleAction(e.target.value as UserAction, customer._id)}
                        className="block w-full pl-4 pr-10 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00b074] focus:border-transparent shadow-sm hover:border-gray-300 transition-all duration-200 bg-white"
                      >
                        <option value="">Select Action</option>
                        <option value="view">View Details</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Premium Pagination */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-700">
                <span className="font-medium">
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} partners
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          currentPage === pageNum
                            ? 'bg-[#00b074] text-white shadow-lg'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Riders;