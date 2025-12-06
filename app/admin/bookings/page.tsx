'use client'

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/AdminLayout'

export default function BookingsManagement() {
  const [allBookings, setAllBookings] = useState<any[]>([])
  const [filteredBookings, setFilteredBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [stats, setStats] = useState({ total: 0, pending: 0, confirmed: 0, completed: 0, cancelled: 0, revenue: 0 })

  useEffect(() => { fetchAllData() }, [])

  useEffect(() => {
    if (!allBookings) return;
    let result = allBookings
    if (statusFilter !== 'all') {
        result = result.filter(b => (b.status || 'pending').toLowerCase() === statusFilter.toLowerCase())
    }
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(b => 
        (b.customerName || '').toLowerCase().includes(q) || 
        (b.customerPhone || '').includes(q) || 
        (b.serviceName || '').toLowerCase().includes(q) ||
        (b._id || '').toLowerCase().includes(q)
      )
    }
    setFilteredBookings(result)
  }, [allBookings, statusFilter, search])

  const fetchAllData = async () => {
    setLoading(true)
    try {
      const [pkgRes, bikeRes] = await Promise.all([
        fetch('/api/admin/bookings').then(r => r.json()).catch(() => []),
        fetch('/api/admin/ride-bookings').then(r => r.json()).catch(() => [])
      ])
      
      const packages = Array.isArray(pkgRes) ? pkgRes.map((b: any) => ({ 
        ...b, type: 'package', 
        customerName: b.userId?.name || 'Unknown', customerEmail: b.userId?.email || '', customerPhone: 'N/A', 
        serviceName: b.service, displayDate: b.date, totalAmount: b.amount || 0, paidAmount: b.amount || 0, 
        status: (b.status || 'pending').toLowerCase() 
      })) : []

      const bikes = Array.isArray(bikeRes) ? bikeRes.map((b: any) => {
        const isFullPaid = (b.paidAmount || 0) >= (b.totalAmount || 0) && (b.totalAmount > 0);
        
        // --- AUTO CORRECT LOGIC ---
        let displayStatus = (b.status || 'pending').toLowerCase();
        
        // Agar Full Payment hai aur Status Pending hai, to usse 'confirmed' maano
        if(isFullPaid && displayStatus === 'pending') {
            displayStatus = 'confirmed';
        }

        return {
          ...b, type: 'bike', 
          customerName: b.userName || 'Guest', customerEmail: b.userEmail || '', customerPhone: b.phone || 'N/A',
          serviceName: `🏍️ ` + (b.vehicles?.map((v: any) => v.name).join(', ') || 'Bike'),
          displayDate: b.startDate, totalAmount: b.totalAmount || 0, paidAmount: b.paidAmount || 0, 
          status: displayStatus
        }
      }) : []

      const merged = [...packages, ...bikes].sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
      setAllBookings(merged)
      
      const rev = merged.reduce((sum, b) => sum + (b.paidAmount || 0), 0)
      setStats({
        total: merged.length,
        pending: merged.filter(b => b.status === 'pending').length,
        confirmed: merged.filter(b => b.status === 'confirmed').length,
        completed: merged.filter(b => b.status === 'completed').length,
        cancelled: merged.filter(b => b.status === 'cancelled').length,
        revenue: rev
      })
    } catch (error) { console.error(error) } finally { setLoading(false) }
  }

  const handleStatus = async (booking: any, newStatus: string) => {
    const endpoint = booking.type === 'package' ? `/api/admin/bookings/${booking._id}` : `/api/admin/ride-bookings/${booking._id}`
    
    let updatedPaidAmount = booking.paidAmount;
    if (newStatus === 'completed') {
        updatedPaidAmount = booking.totalAmount;
    }

    setAllBookings(prev => prev.map(b => b._id === booking._id ? { ...b, status: newStatus, paidAmount: updatedPaidAmount } : b));

    // API call me title case bhejo (Completed) taki DB me sundar dikhe, par frontend logic lowercase handle karega
    const statusToSend = newStatus.charAt(0).toUpperCase() + newStatus.slice(1);

    await fetch(endpoint, { 
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ status: statusToSend, paidAmount: updatedPaidAmount, sendEmail: true }) 
    });
    // No fetchAllData() immediately to prevent UI flicker, state is already updated optimistically
  }

  const handleDelete = async (id: string, type: string) => {
    if (!confirm('Delete booking?')) return
    const endpoint = type === 'package' ? `/api/admin/bookings/${id}` : `/api/admin/ride-bookings/${id}`
    await fetch(endpoint, { method: 'DELETE' })
    fetchAllData()
  }

  return (
    <AdminLayout>
      <div className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Bookings Management</h1>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow border-l-4 border-blue-500"><p className="text-xs text-gray-500 font-bold">TOTAL</p><p className="text-2xl font-bold">{stats.total}</p></div>
          <div className="bg-white p-4 rounded-xl shadow border-l-4 border-yellow-500"><p className="text-xs text-gray-500 font-bold">PENDING</p><p className="text-2xl font-bold text-yellow-600">{stats.pending}</p></div>
          <div className="bg-white p-4 rounded-xl shadow border-l-4 border-green-500"><p className="text-xs text-gray-500 font-bold">CONFIRMED</p><p className="text-2xl font-bold text-green-600">{stats.confirmed}</p></div>
          <div className="bg-white p-4 rounded-xl shadow border-l-4 border-blue-600"><p className="text-xs text-gray-500 font-bold">COMPLETED</p><p className="text-2xl font-bold text-blue-700">{stats.completed}</p></div>
          <div className="bg-white p-4 rounded-xl shadow border-l-4 border-red-500"><p className="text-xs text-gray-500 font-bold">CANCELLED</p><p className="text-2xl font-bold text-red-600">{stats.cancelled}</p></div>
          <div className="bg-white p-4 rounded-xl shadow border-l-4 border-green-600"><p className="text-xs text-gray-500 font-bold">REVENUE</p><p className="text-lg font-bold text-green-700">₹{stats.revenue.toLocaleString()}</p></div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow mb-6 flex gap-4">
          <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 px-4 py-2 border rounded-lg outline-none" />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 border rounded-lg outline-none bg-white">
            <option value="all">All Status</option><option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          {loading ? <div className="p-12 text-center text-gray-500">Loading...</div> : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Sr. No.</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Booking ID</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Payment Info</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Del</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredBookings.map((b, index) => {
                    const isPartial = b.paidAmount < b.totalAmount;
                    const due = b.totalAmount - b.paidAmount;
                    
                    // Dynamic Style based on lowercase status
                    let statusStyle = 'bg-gray-100';
                    if (b.status === 'confirmed') statusStyle = 'bg-green-100 text-green-700';
                    else if (b.status === 'pending') statusStyle = 'bg-yellow-100 text-yellow-700';
                    else if (b.status === 'completed') statusStyle = 'bg-blue-100 text-blue-700';
                    else if (b.status === 'cancelled') statusStyle = 'bg-red-100 text-red-700';

                    return (
                    <tr key={b._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-xs font-bold text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4 text-xs font-mono text-gray-500 font-bold">#{b._id ? b._id.slice(-6) : '---'}</td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-gray-900">{b.customerName}</p>
                        <p className="text-xs text-gray-500">{b.customerEmail}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-blue-600 font-medium">{b.customerPhone}</td>
                      <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">{b.serviceName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{b.displayDate}</td>
                      
                      <td className="px-6 py-4">
                        <div className="text-sm">
                            {isPartial ? (
                                <>
                                    <p className="font-bold text-yellow-600">Paid: ₹{b.paidAmount}</p>
                                    <p className="text-xs text-red-500 font-semibold">Due: ₹{due}</p>
                                </>
                            ) : (
                                <p className="font-bold text-green-600 bg-green-50 px-2 py-1 rounded inline-block border border-green-200">
                                    Full: ₹{b.totalAmount}
                                </p>
                            )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <select 
                          value={b.status} 
                          onChange={(e) => handleStatus(b, e.target.value)}
                          className={`text-xs px-3 py-1.5 rounded-full font-bold border-0 cursor-pointer outline-none appearance-none shadow-sm transition-all ${statusStyle}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4"><button onClick={() => handleDelete(b._id, b.type)} className="text-gray-400 hover:text-red-600">DEL</button></td>
                    </tr>
                  )})}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
