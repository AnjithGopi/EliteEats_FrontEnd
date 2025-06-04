import SideNav from "../SideNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../Constants/api";
import Swal from "sweetalert2";

interface User {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  isActive: boolean;

  createdAt?: Date;
}

type UserAction = "block" | "unblock";

function Customers() {
  const [users, setUsers] = useState<User[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [searchitem, setSearchItem] = useState("");
  const [suggestion, setSuggestion] = useState<User[]>([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/admin/users`).then((response) => {
      console.log(response.data);
      setUsers(response.data);
    });
  }, [refresh]);

  useEffect(() => {
    console.log(searchitem);
    makeSuggestion(searchitem);
    console.log(suggestion);
  }, [searchitem]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
    // console.log(searchitem);
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
  const handleSearch = () => {
    try {
      axios
        .get(`${API_BASE_URL}/admin/users/${userId}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAction = async (action: UserAction, user: string) => {
    try {
      if (action === "block") {
        const result = await Swal.fire({
          title: "Block User?",
          text: "Are you sure you want to block this user?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#00b074",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, block!",
          cancelButtonText: "Cancel",
          reverseButtons: true,
        });

        if (result.isConfirmed) {
          axios
            .patch(`${API_BASE_URL}/admin/users/block/${user}`)
            .then((response) => {
              console.log(response);
              setRefresh(!refresh);
              //alert("User Blocked Successfully");
              Swal.fire("Blocked!", "The user has been blocked.", "success");
            })
            .catch((error) => {
              console.log(error);
              alert("Something went wrong");
            });
        }
      } else if (action === "unblock") {
        const result = await Swal.fire({
          title: "Unblock User?",
          text: "Are you sure you want to unblock this user?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#00b074",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, unblock!",
          cancelButtonText: "Cancel",
          reverseButtons: true,
        });

        if (result.isConfirmed) {
          axios
            .patch(`${API_BASE_URL}/admin/users/unblock/${user}`)
            .then((response) => {
              console.log(response);
              setRefresh(!refresh);
              Swal.fire(
                "Unblocked!",
                "The user has been unblocked.",
                "success"
              );
            })
            .catch((error) => {
              console.log(error);
              alert("Something went wrong");
            });
        }
      } else if (action === "view") {
        alert("Cant view users now");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideNav />

      <div className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-[#00b074]">Customers</h1>
          <p className="text-gray-600">Manage all registered customers</p>
        </header>

        {/* Search and Filter Bar */}
        <div className="mb-6 flex justify-between items-center">
          {/* Search Bar with Button */}
          <div className="relative w-full max-w-2xl flex">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                onChange={handleChange}
                placeholder="Search with email..."
                className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-l-lg bg-white shadow-sm focus:outline-none  focus:border-transparent transition duration-200"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-[#00b074] text-white px-5 py-2.5 rounded-r-lg shadow-sm hover:bg-[#009161] transition duration-200 flex items-center justify-center"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>

          {/* Filter Dropdown */}
          <div className="flex space-x-3 ml-4">
            <select className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00b074] focus:border-transparent bg-white shadow-sm hover:border-gray-400 transition duration-200">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        {/* Customer Table */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr className="bg-[#00b074]">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((customer) => (
                  <tr
                    key={customer._id}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 font-medium">
                            {customer.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {customer.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {" "}
                            Joined{" "}
                            {customer.createdAt
                              ? new Date(
                                  customer.createdAt
                                ).toLocaleDateString()
                              : "N/A"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.mobile || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {customer.isActive === true ? (
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      ) : (
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Blocked
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <select
                        value=""
                        onChange={(e) =>
                          handleAction(
                            e.target.value as UserAction,
                            customer._id
                          )
                        }
                        className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b074] focus:border-transparent shadow-sm"
                      >
                        <option value="">Actions</option>
                        <option value="block">Block User</option>
                        <option value="unblock">Unblock User</option>
                        <option value="view">View Details</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Premium Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">10</span> of{" "}
                  <span className="font-medium">20</span> customers
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Previous</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    aria-current="page"
                    className="z-10 bg-[#00b074] border-[#00b074] text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    1
                  </button>
                  <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    2
                  </button>
                  <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    3
                  </button>
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    ...
                  </span>
                  <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    8
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Next</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customers;
