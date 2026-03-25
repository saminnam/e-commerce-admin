import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import PageTitle from "../components/PageTitle";
import BreadCrumbs from "../components/BreadCrumbs";
import Loader from "../components/Loader";

const API_BASE_URL = "http://localhost:5000/api"; 

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/users`);
      setUsers(res.data.data || res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id, email) => {
    if (email === "admin@example.com")
      return alert("Cannot delete default admin!");
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/users/${id}`);
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  // const filteredUsers = useMemo(
  //   () =>
  //     users.filter((user) =>
  //       Object.values(user).some((value) =>
  //         String(value).toLowerCase().includes(searchTerm.toLowerCase())
  //       )
  //     ),
  //   [users, searchTerm]
  // );

  // const sortedUsers = useMemo(() => {
  //   let sortableUsers = [...filteredUsers];
  //   if (sortConfig.key) {
  //     sortableUsers.sort((a, b) => {
  //       if (a[sortConfig.key] < b[sortConfig.key])
  //         return sortConfig.direction === "ascending" ? -1 : 1;
  //       if (a[sortConfig.key] > b[sortConfig.key])
  //         return sortConfig.direction === "ascending" ? 1 : -1;
  //       return 0;
  //     });
  //   }
  //   return sortableUsers;
  // }, [filteredUsers, sortConfig]);

  // const requestSort = (key) => {
  //   let direction = "ascending";
  //   if (sortConfig.key === key && sortConfig.direction === "ascending")
  //     direction = "descending";
  //   setSortConfig({ key, direction });
  // };

  // const getSortIndicator = (key) =>
  //   sortConfig.key !== key ? null : sortConfig.direction === "ascending" ? (
  //     <FaArrowUp className="ml-1" />
  //   ) : (
  //     <FaArrowDown className="ml-1" />
  //   );

  return (
    <section className="flex flex-col">
      <div className="pb-2 flex items-center justify-between border-b-2 mb-4 border-gray-300">
        <PageTitle pageTitle={"Manage Users"} />
        <BreadCrumbs pageName={"add-user"} />
      </div>

      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search users..."
          className="p-2 border border-gray-300 rounded-md w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IoSearchOutline className="absolute right-4 text-2xl top-3 text-gray-500" />
      </div>

      <div className="pb-4">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden border rounded border-gray-300">
            {loading ? (
              <div className="text-center p-4">
                <Loader />
              </div>
            ) : (
              <div className="relative">
                <div className="overflow-y-auto max-h-[60vh]">
                  <table className="table-auto min-w-full rounded">
                    <thead className="sticky top-0 bg-gray-50 z-10">
                      <tr>
                        <th
                          className="p-5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                      
                        >
                          Name
                        </th>
                        <th
                          className="p-5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                         
                        >
                          Email 
                        </th>
                        <th
                          className="p-5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                        
                        >
                          Phone No 
                        </th>
                        <th className="p-5 text-left text-sm font-semibold text-gray-900">
                          Status
                        </th>
                        <th className="p-5 text-left text-sm font-semibold text-gray-900">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300">
                      {users.length === 0 ? (
                        <tr>
                          <td
                            colSpan="5"
                            className="text-center p-4 text-gray-600"
                          >
                            No users found.
                          </td>
                        </tr>
                      ) : (
                        users.map((user) => (
                          <tr
                            key={user._id}
                            className="bg-white hover:bg-blue-100 transition-all duration-500"
                          >
                            <td className="p-5 text-sm font-medium text-gray-900">
                              {user.name}
                            </td>
                            <td className="p-5 text-sm font-medium text-gray-900">
                              {user.email}
                            </td>
                            <td className="p-5 text-sm font-medium text-gray-900">
                              {user.phone}
                            </td>
                            <td className="p-5 text-sm font-medium text-gray-900">
                              <div
                                className={`py-1.5 px-2.5 rounded-full flex justify-center w-20 items-center gap-1 ${
                                  user.status === "active"
                                    ? "bg-emerald-50"
                                    : "bg-red-50"
                                }`}
                              >
                                <span
                                  className={`font-medium text-xs ${
                                    user.status === "active"
                                      ? "text-emerald-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {user.status.charAt(0).toUpperCase() +
                                    user.status.slice(1)}
                                </span>
                              </div>
                            </td>
                            <td className="flex p-5 items-center gap-2">
                              <button
                                className="py-1 px-3 rounded-full cursor-pointer text-white bg-red-600"
                                onClick={() =>
                                  handleDelete(user._id, user.email)
                                }
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageUsers;
