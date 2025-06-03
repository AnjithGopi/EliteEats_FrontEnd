import SideNav from "../SideNav";
import { useEffect,useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../Constants/api";



interface User {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  isActive: boolean;
}

type UserAction = "block" | "unblock";

function Customers() {

    const [users, setUsers] = useState<User[]>([]);

    
  useEffect(() => {
    axios.get(`${API_BASE_URL}/admin/users`).then((response) => {
      console.log(response.data);
      setUsers(response.data);
    });
  }, [users]);

  const handleAction = (action:UserAction, user:string) => {
    try {
      if (action === "block") {
        const confirmed = window.confirm(
          "Are you sure that you want to block this user?"
        );

        if (confirmed) {
          axios
            .patch(`${API_BASE_URL}/admin/users/block/${user}`)
            .then((response) => {
              console.log(response);
              alert("User Blocked Successfully");
            })
            .catch((error) => {
              console.log(error);
              alert("Something went wrong");
            });
        }
      } else if (action === "unblock") {
        const confirmed = window.confirm(
          "Are you sure that you want to unblock this user"
        );

        if (confirmed) {
          axios
            .patch(`${API_BASE_URL}/admin/users/unblock/${user}`)
            .then((response) => {
              console.log(response);
              alert("User unBlocked Successfully");
           
            })
            .catch((error) => {
              console.log(error);
              alert("Something went wrong");
            });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex min-h-screen bg-white">
        <SideNav />

        <div className="flex-1 p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-[#00b074]">Customers</h1>
            <p className="text-gray-600">Manage all registered customers</p>
          </header>

          <div className="bg-white rounded-lg shadow-sm border border-[#00b074] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr className="bg-[#00b074]">
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((customer) => (
                    <tr key={customer._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {customer.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {customer.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {customer.mobile}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {customer.isActive === true ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Blocked
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <select
                          value={""}
                          onChange={(e) =>
                            handleAction(e.target.value as UserAction, customer._id)
                          }
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                          <option value="">Select Action</option>
                          <option value="block">Block User</option>
                          <option value="unblock">Unblock User</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination would go here */}
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">10</span> of{" "}
              <span className="font-medium">20</span> results
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Customers;
