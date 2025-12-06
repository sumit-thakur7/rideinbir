'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout' // ✅ Aapka Purana Layout

export default function AdminDashboard() {
  const [stats, setStats] = useState({ bookings: 0, revenue: 0, packages: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/stats')
        const data = await res.json()
        if (data) setStats(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Card 1: Total Bookings */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
            <h3 className="text-gray-500 text-sm font-bold uppercase">Total Bookings</h3>
            <p className="text-3xl font-black text-gray-900 mt-2">
              {loading ? '...' : stats.bookings}
            </p>
          </div>

          {/* Card 2: Total Revenue */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
            <h3 className="text-gray-500 text-sm font-bold uppercase">Total Revenue</h3>
            <p className="text-3xl font-black text-green-600 mt-2">
              {loading ? '...' : `₹${stats.revenue.toLocaleString()}`}
            </p>
          </div>

          {/* Card 3: Active Packages */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
            <h3 className="text-gray-500 text-sm font-bold uppercase">Active Packages</h3>
            <p className="text-3xl font-black text-gray-900 mt-2">
              {loading ? '...' : stats.packages}
            </p>
          </div>

        </div>

        {/* Recent Activity Section (Placeholder for now) */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-lg font-bold text-gray-700 mb-4">Quick Actions</h3>
          <p className="text-gray-500 text-sm">
            Use the sidebar to manage bookings, add new packages, or check users.
          </p>
        </div>

      </div>
    </AdminLayout>
  )
}
