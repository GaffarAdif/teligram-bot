import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Total Orders */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-2xl font-bold text-gray-800">150</p>
        </div>

        {/* Card 2: Total Products */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold">Total Products</h2>
          <p className="text-2xl font-bold text-gray-800">80</p>
        </div>

        {/* Card 3: Total Users */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-2xl font-bold text-gray-800">200</p>
        </div>

        {/* Card 4: Revenue */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold">Total Revenue</h2>
          <p className="text-2xl font-bold text-gray-800">$12,000</p>
        </div>
      </div>

      {/* Additional Content */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-700">Recent Activity</h2>
        <div className="bg-white shadow-md rounded-lg p-4 mt-4">
          <ul>
            <li className="border-b border-gray-200 py-2">Order #1001 placed</li>
            <li className="border-b border-gray-200 py-2">Order #1002 shipped</li>
            <li className="border-b border-gray-200 py-2">Product #45 added</li>
            <li className="border-b border-gray-200 py-2">User #200 registered</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
