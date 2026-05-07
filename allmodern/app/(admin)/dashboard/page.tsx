"use client";

import React, { useState } from "react";
import { Package, Clock, Truck, CheckCircle, ChevronUp } from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import Link from "next/link";

const summaryData = [
  { title: "Total order", value: "187", icon: <Package size={24} className="text-emerald-500" />, bgColor: "bg-emerald-50", iconBg: "bg-emerald-100" },
  { title: "Pending Orders", value: "117", icon: <Clock size={24} className="text-orange-500" />, bgColor: "bg-orange-50", iconBg: "bg-orange-100" },
  { title: "Processing Orders", value: "21", icon: <Truck size={24} className="text-purple-500" />, bgColor: "bg-purple-50", iconBg: "bg-purple-100" },
  { title: "Delivered Orders", value: "37", icon: <CheckCircle size={24} className="text-blue-500" />, bgColor: "bg-blue-50", iconBg: "bg-blue-100" },
];

const analyticsData = [
  { name: 'Sep', sales: 14000 },
  { name: 'Oct', sales: 4000 },
  { name: 'Nov', sales: 0 },
  { name: 'Dec', sales: 13800 },
  { name: 'Jan', sales: 4800 },
  { name: 'Feb', sales: 2000 },
  { name: 'Mar', sales: 2200 },
  { name: 'Apr', sales: 2400 },
];

const bestSellingData = [
  { name: 'Games & Videos', value: 300, color: '#3b82f6' },
  { name: 'Health & Sports', value: 200, color: '#60a5fa' },
  { name: 'Televisions', value: 150, color: '#93c5fd' },
  { name: 'Mobile & Tablets', value: 400, color: '#4f46e5' },
  { name: 'Laptop & PC', value: 250, color: '#818cf8' },
  { name: 'Home Appliances', value: 100, color: '#c7d2fe' },
];

const recentOrders = [
  { id: "#fmhn7g1p", date: "Fri May 01 2026", status: "Pending", total: "$812", statusColor: "text-orange-500 bg-orange-50" },
  { id: "#v4c1buca", date: "Fri May 01 2026", status: "Pending", total: "$777", statusColor: "text-orange-500 bg-orange-50" },
  { id: "#h57i7q83", date: "Thu Apr 30 2026", status: "Processing", total: "$1,634", statusColor: "text-purple-500 bg-purple-50" },
  { id: "#hzeyomq5", date: "Mon Apr 27 2026", status: "Pending", total: "$888", statusColor: "text-orange-500 bg-orange-50" },
  { id: "#e84b0953", date: "Thu Apr 23 2026", status: "Delivered", total: "$500", statusColor: "text-emerald-500 bg-emerald-50" },
];

export default function Dashboard() {
  const [chartType, setChartType] = useState('Sales');

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryData.map((card, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${card.iconBg}`}>
              {card.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">{card.title}</p>
              <h3 className="text-2xl font-bold text-gray-800">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Monthly Analytics</h2>
            <div className="flex bg-gray-50 rounded-lg p-1">
              {['Sales', 'Orders', 'Revenue'].map((type) => (
                <button
                  key={type}
                  onClick={() => setChartType(type)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    chartType === type 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dx={-10} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#3b82f6' }}
                  activeDot={{ r: 6, strokeWidth: 0, fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Best Selling Products</h2>
          <div className="flex-1 min-h-[200px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bestSellingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {bestSellingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-y-3 gap-x-2 mt-4">
            {bestSellingData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs text-gray-500 truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
          <Link href="/admin/orders" className="text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-50">
                <th className="py-4 px-6 text-sm font-semibold text-gray-500">Order</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-500">Date</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-500">Status</th>
                <th className="py-4 px-6 text-sm font-semibold text-gray-500">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 text-sm font-medium text-gray-800">{order.id}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{order.date}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-800">{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
