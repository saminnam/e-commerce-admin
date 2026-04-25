import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  ShoppingCart, Package, Users, DollarSign, TrendingUp, 
  MessageSquare, Store, Calendar, ArrowUpRight, ArrowDownRight,
  RefreshCw, Loader2, Activity, CreditCard
} from "lucide-react";

const API_BASE_URL = "http://localhost:5000/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    totalSellers: 0,
    totalRevenue: 0,
    pendingEnquiries: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch products
      const productsRes = await axios.get(`${API_BASE_URL}/products`);
      const products = productsRes.data || [];
      
      // Fetch orders
      const ordersRes = await axios.get(`${API_BASE_URL}/orders`);
      const orders = ordersRes.data || [];
      
      // Fetch sellers
      const sellersRes = await axios.get(`${API_BASE_URL}/seller`);
      const sellers = sellersRes.data || [];
      
      // Fetch enquiries
      const enquiriesRes = await axios.get(`${API_BASE_URL}/contact/enquiries`);
      const enquiries = enquiriesRes.data || [];
      
      setStats({
        totalOrders: orders.length,
        totalProducts: products.length,
        totalCustomers: orders.length, // Using orders as proxy for customers
        totalSellers: sellers.length,
        totalRevenue: orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0),
        pendingEnquiries: enquiries.filter(e => !e.verified).length
      });
      
      setRecentOrders(orders.slice(0, 5));
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const StatCard = ({ title, value, icon, color, trend, trendValue }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color}`}>
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-bold ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {trendValue}
          </div>
        )}
      </div>
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">{title}</h3>
      <p className="text-3xl font-black text-slate-800">{value}</p>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="animate-spin text-[#E5B236]" size={48} />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-800 mb-2">Dashboard Overview</h1>
        <p className="text-slate-500">Welcome back! Here's what's happening with your store today.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        <StatCard 
          title="Total Orders" 
          value={stats.totalOrders} 
          icon={<ShoppingCart size={24} className="text-white" />}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
          trend="up"
          trendValue="12%"
        />
        <StatCard 
          title="Products" 
          value={stats.totalProducts} 
          icon={<Package size={24} className="text-white" />}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
          trend="up"
          trendValue="8%"
        />
        <StatCard 
          title="Customers" 
          value={stats.totalCustomers} 
          icon={<Users size={24} className="text-white" />}
          color="bg-gradient-to-br from-green-500 to-green-600"
          trend="up"
          trendValue="5%"
        />
        <StatCard 
          title="Sellers" 
          value={stats.totalSellers} 
          icon={<Store size={24} className="text-white" />}
          color="bg-gradient-to-br from-orange-500 to-orange-600"
          trend="up"
          trendValue="3%"
        />
        <StatCard 
          title="Revenue" 
          value={`$${stats.totalRevenue.toLocaleString()}`} 
          icon={<DollarSign size={24} className="text-white" />}
          color="bg-gradient-to-br from-[#E5B236] to-[#d4a32e]"
          trend="up"
          trendValue="15%"
        />
        <StatCard 
          title="Pending Enquiries" 
          value={stats.pendingEnquiries} 
          icon={<MessageSquare size={24} className="text-white" />}
          color="bg-gradient-to-br from-red-500 to-red-600"
          trend="down"
          trendValue="2%"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800">Recent Orders</h2>
            <button 
              onClick={fetchDashboardData}
              className="p-2 hover:bg-slate-100 rounded-lg transition"
            >
              <RefreshCw size={18} className="text-slate-400" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentOrders.length > 0 ? recentOrders.map((order, index) => (
                  <tr key={order._id || index} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 text-sm font-bold text-slate-800">#{order._id?.slice(-6) || `ORD${index + 1}`}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{order.customerName || 'Customer'}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-800">${order.totalAmount || 0}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-green-100 text-green-600">
                        {order.status || 'Completed'}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-slate-400">
                      No recent orders
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-[#E5B236] to-[#d4a32e] text-white rounded-xl font-bold hover:shadow-lg transition-all">
              <ShoppingCart size={20} />
              Add New Product
            </button>
            <button className="w-full flex items-center gap-3 p-4 bg-slate-50 text-slate-700 rounded-xl font-bold hover:bg-slate-100 transition-all">
              <Users size={20} />
              Manage Users
            </button>
            <button className="w-full flex items-center gap-3 p-4 bg-slate-50 text-slate-700 rounded-xl font-bold hover:bg-slate-100 transition-all">
              <Store size={20} />
              View Sellers
            </button>
            <button className="w-full flex items-center gap-3 p-4 bg-slate-50 text-slate-700 rounded-xl font-bold hover:bg-slate-100 transition-all">
              <MessageSquare size={20} />
              Check Enquiries
            </button>
          </div>
        </div>
      </div>

      {/* Activity Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Activity size={32} />
            <span className="text-sm font-bold bg-white/20 px-3 py-1 rounded-full">Today</span>
          </div>
          <h3 className="text-3xl font-black mb-1">{stats.totalOrders}</h3>
          <p className="text-white/80 text-sm">New Orders Today</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <DollarSign size={32} />
            <span className="text-sm font-bold bg-white/20 px-3 py-1 rounded-full">Today</span>
          </div>
          <h3 className="text-3xl font-black mb-1">${stats.totalRevenue.toLocaleString()}</h3>
          <p className="text-white/80 text-sm">Revenue Today</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Users size={32} />
            <span className="text-sm font-bold bg-white/20 px-3 py-1 rounded-full">This Week</span>
          </div>
          <h3 className="text-3xl font-black mb-1">{stats.totalSellers}</h3>
          <p className="text-white/80 text-sm">Active Sellers</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
