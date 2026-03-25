import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import BarChart from "../components/BarChart";

const API_BASE_URL = "http://localhost:5000/api";
const Dashboard = () => {
  const [selectedMonthYear, setSelectedMonthYear] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleChange = (e) => {
    setSelectedMonthYear(e.target.value);
  };
  return (
    <main className="flex-1 p-5">
      <div className="border-b-2 mb-4 pb-2 border-gray-00 font-semibold text-gray-500">
        <h3>Revenue Since Inception</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 mt-16">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <i className="fas fa-bed text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Sales Amount</p>
              <p className="text-2xl font-semibold text-gray-800">120</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <i className="fas fa-calendar-check text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Total Invoices
              </p>
              <p className="text-2xl font-semibold text-gray-800">84</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <i className="fas fa-calendar-day text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending Bills</p>
              <p className="text-2xl font-semibold text-gray-800">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 text-red-600">
              <i className="fas fa-calendar-times text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Due Amount</p>
              <p className="text-2xl font-semibold text-gray-800">8</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <i className="fas fa-bed text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Total Products
              </p>
              <p className="text-2xl font-semibold text-gray-800">120</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <i className="fas fa-calendar-check text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Total Customers
              </p>
              <p className="text-2xl font-semibold text-gray-800">84</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <i className="fas fa-calendar-day text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Paid Bills</p>
              <p className="text-2xl font-semibold text-gray-800">12</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b-2 flex justify-between mb-4 pb-1 border-gray-300 font-semibold text-gray-500">
        <h3>Monthly Sales Report</h3>
        <input
          type="month"
          value={selectedMonthYear}
          onChange={handleChange}
          className="border border-gray-300 rounded p-1"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <i className="fas fa-bed text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Sales Amount</p>
              <p className="text-2xl font-semibold text-gray-800">120</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <i className="fas fa-calendar-check text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Paid Invoices</p>
              <p className="text-2xl font-semibold text-gray-800">84</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <i className="fas fa-calendar-day text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Unpaid Invoice
              </p>
              <p className="text-2xl font-semibold text-gray-800">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 text-red-600">
              <i className="fas fa-calendar-times text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Due Amount</p>
              <p className="text-2xl font-semibold text-gray-800">8</p>
            </div>
          </div>
        </div>
      </div>
      <BarChart />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              System Users
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Access
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check-in
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check-out
                  </th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th> */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user, index) => (
                  <tr key={user.id || index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-12 w-12 rounded-full object-cover"
                            src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_items_boosted&w=740"
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Not Mentioned</div>
                      {/* <div className="text-sm text-gray-500">#205</div> */}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      15 May 2023
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      20 May 2023
                    </td>
                    {/* <td className="px-6 py-4">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Checked In
                    </span>
                  </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Client Status
            </h2>
          </div>
          <div className="p-6">
            {[
              { label: "Occupied", percent: "70%", color: "green" },
              { label: "Available", percent: "30%", color: "blue" },
              { label: "Maintenance", percent: "5%", color: "red" },
            ].map(({ label, percent, color }) => (
              <div className="mb-4" key={label}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {label}
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    {percent}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`bg-${color}-600 h-2.5 rounded-full`}
                    style={{ width: percent }}
                  ></div>
                </div>
              </div>
            ))}
            <div className="mt-6">
              <h3 className="text-md font-medium text-gray-800 mb-3">
                Room Types
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Standard</span>
                  <span className="text-sm font-medium">40 rooms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Deluxe</span>
                  <span className="text-sm font-medium">35 rooms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Executive</span>
                  <span className="text-sm font-medium">25 rooms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Suite</span>
                  <span className="text-sm font-medium">20 rooms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "plus", label: "New Booking", bg: "blue" },
            { icon: "user-check", label: "Check In", bg: "green" },
            { icon: "user-times", label: "Check Out", bg: "yellow" },
            { icon: "bell", label: "Requests", bg: "purple" },
          ].map(({ icon, label, bg }) => (
            <button
              key={label}
              className={`flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-${bg}-50 hover:border-${bg}-200 transition`}
            >
              <div
                className={`p-3 rounded-full bg-${bg}-100 text-${bg}-600 mb-2`}
              >
                <i className={`fas fa-${icon} text-lg`}></i>
              </div>
              <span className="text-sm font-medium text-gray-700">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
