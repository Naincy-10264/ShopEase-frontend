import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiPackage, FiDollarSign, FiShoppingCart, FiClock } from 'react-icons/fi';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    processingOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/admin/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch stats', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Products</p>
              <p className="text-3xl font-bold">{stats.totalProducts}</p>
            </div>
            <FiPackage className="w-12 h-12 text-primary-600" />
          </div>
          <Link
            to="/admin/products"
            className="text-primary-600 text-sm hover:underline mt-4 inline-block"
          >
            Manage Products →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Orders</p>
              <p className="text-3xl font-bold">{stats.totalOrders}</p>
            </div>
            <FiShoppingCart className="w-12 h-12 text-green-600" />
          </div>
          <Link
            to="/admin/orders"
            className="text-green-600 text-sm hover:underline mt-4 inline-block"
          >
            View Orders →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Revenue</p>
              <p className="text-3xl font-bold">₹{stats.totalRevenue.toFixed(2)}</p>
            </div>
            <FiDollarSign className="w-12 h-12 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Pending Orders</p>
              <p className="text-3xl font-bold">{stats.pendingOrders}</p>
            </div>
            <FiClock className="w-12 h-12 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/products"
            className="bg-primary-600 text-white px-6 py-3 rounded-md text-center hover:bg-primary-700 transition"
          >
            Manage Products
          </Link>
          <Link
            to="/admin/orders"
            className="bg-green-600 text-white px-6 py-3 rounded-md text-center hover:bg-green-700 transition"
          >
            Manage Orders
          </Link>
          <Link
            to="/products"
            className="bg-gray-600 text-white px-6 py-3 rounded-md text-center hover:bg-gray-700 transition"
          >
            View Store
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

